#!/usr/bin/env node
/**
 * Publish notes from the Obsidian vault into content/.
 *
 * Selects every vault note with `publish: true` in its frontmatter, applies
 * the path rewrites from publish.config.json, copies referenced image
 * attachments, and injects legacy URL aliases. content/ is fully regenerated
 * on each run (deleted notes disappear).
 *
 * Usage:
 *   node publish.mjs            sync content/
 *   node publish.mjs --dry-run  report what would change without writing
 *
 * All path mappings and the home-note selection live in publish.config.json —
 * edit that file (not this script) to change where things publish to.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const CONTENT = path.join(ROOT, "content")
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "publish.config.json"), "utf8"))
const DRY = process.argv.includes("--dry-run")

// longest prefix wins, independent of JSON key order
const rewrites = Object.entries(cfg.pathRewrites).sort((a, b) => b[0].length - a[0].length)
const rewritePath = (rel) => {
  for (const [from, to] of rewrites) {
    if (rel === from || rel.startsWith(from + "/")) return to + rel.slice(from.length)
  }
  return rel
}

const SKIP_DIRS = new Set(["node_modules", ".trash"])
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || SKIP_DIRS.has(e.name)) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else yield full
  }
}

// --- pass 1: collect published notes and attachment index ---------------
const notes = [] // { rel, text }
const attachmentIndex = new Map() // basename -> absolute path (first hit wins)
const FRONTMATTER = /^---\n([\s\S]*?)\n---/

for (const file of walk(cfg.vaultPath)) {
  const rel = path.relative(cfg.vaultPath, file)
  if (file.endsWith(".md")) {
    const text = fs.readFileSync(file, "utf8")
    const fm = text.match(FRONTMATTER)
    if (fm && /^publish: true\s*$/m.test(fm[1])) notes.push({ rel, text })
  } else if (!attachmentIndex.has(path.basename(file))) {
    attachmentIndex.set(path.basename(file), file)
  }
}

// --- pass 2: transform + write notes, collect referenced attachments ----
// matches ![[Some file.png]] / ![[img.png|300]] and ![alt](local-file.png)
const EMBED_RE = /!\[\[([^\]#|]+)(?:\|[^\]]*)?\]\]|!\[[^\]]*\]\(([^)]+)\)/g
const wanted = new Set()
const written = new Set()
let aliasCount = 0

function injectFrontmatter(text, extra) {
  // extra: array of yaml lines appended just before the closing --- of the block
  return text.replace(FRONTMATTER, (m, body) => `---\n${body}\n${extra.join("\n")}\n---`)
}

if (!DRY) fs.rmSync(CONTENT, { recursive: true, force: true })

for (const { rel, text } of notes) {
  const relNoExt = rel.replace(/\.md$/, "")
  const isHome = rel === cfg.homeNote
  let out = text

  // legacy URL aliases (old digital-garden slugs) -> alias-redirects plugin
  const extras = []
  const alias = cfg.legacyAliases[relNoExt]
  if (alias) {
    if (/^aliases:/m.test(out.match(FRONTMATTER)[1])) {
      console.warn(`WARN ${rel}: has its own aliases; legacy alias ${alias} NOT injected`)
    } else {
      extras.push(`aliases:`, `  - "${alias}"`)
      aliasCount++
    }
  }
  if (extras.length) out = injectFrontmatter(out, extras)

  // home note becomes the site root; give it a real title if it lacks one
  if (isHome) out = out.replace(/^title:\s*$/m, `title: ${cfg.siteTitle}`)

  for (const m of out.matchAll(EMBED_RE)) {
    const target = (m[1] ?? m[2]).trim()
    if (/^[a-z]+:\/\//.test(target)) continue // external URL
    if (!/\.[a-z0-9]+$/i.test(target) || target.endsWith(".md")) continue // note transclusion
    wanted.add(decodeURIComponent(path.basename(target)))
  }

  const dest = isHome ? "index.md" : rewritePath(relNoExt) + ".md"
  if (written.has(dest.toLowerCase())) {
    console.warn(`WARN duplicate destination ${dest} from ${rel} — skipped`)
    continue
  }
  written.add(dest.toLowerCase())
  if (!DRY) {
    const abs = path.join(CONTENT, dest)
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, out)
  }
}

// --- pass 3: copy referenced attachments --------------------------------
let copied = 0
const missing = []
for (const name of wanted) {
  const src = attachmentIndex.get(name)
  if (!src) {
    missing.push(name)
    continue
  }
  if (!DRY) {
    const dest = path.join(CONTENT, "attachments", name)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
  }
  copied++
}

console.log(
  `${DRY ? "[dry-run] " : ""}published ${written.size} notes, ` +
    `${copied} attachments, ${aliasCount} legacy aliases`,
)
if (missing.length) console.warn(`missing attachments: ${missing.join(", ")}`)
if (!notes.some((n) => n.rel === cfg.homeNote))
  console.warn(`WARN home note ${cfg.homeNote} not found among published notes`)
