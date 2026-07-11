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
    if (fm && /^publish: true\s*$/m.test(fm[1]))
      notes.push({ rel, text, mtime: fs.statSync(file).mtime })
  } else if (!attachmentIndex.has(path.basename(file))) {
    attachmentIndex.set(path.basename(file), file)
  }
}

// --- bible chapter ordering (for prev/next pager + index grouping) -------
// mirrors Quartz v5 slugification so injected URLs match emitted pages
const quartzSlugPath = (p) =>
  p
    .split("/")
    .map((seg) =>
      seg
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, "")
        .toLowerCase(),
    )
    .join("/")

const noteRelByName = new Map(notes.map((n) => [path.basename(n.rel, ".md"), n.rel]))
const slugForNote = (name) => {
  const rel = noteRelByName.get(name)
  if (!rel) return null
  return "/" + quartzSlugPath(rewritePath(rel.replace(/\.md$/, "")))
}

const pagerByChapter = new Map() // "Psalm 23" -> {prev, next, book}
{
  const idx = notes.find((n) => n.rel === cfg.bibleIndexNote)
  if (idx) {
    const chapters = [...idx.text.matchAll(/^##\s+\[\[(.+?)\]\]\s*$/gm)].map((m) => m[1])
    chapters.forEach((name, i) => {
      const bm = name.match(/^(.+?)\s+\d+$/)
      pagerByChapter.set(name, {
        prev: chapters[i - 1] ?? null,
        next: chapters[i + 1] ?? null,
        book: bm ? bm[1] : name,
      })
    })
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

for (const { rel, text, mtime } of notes) {
  const relNoExt = rel.replace(/\.md$/, "")
  const isHome = rel === cfg.homeNote
  let out = text

  const extras = []

  // carry the vault file's real modification time so "recently updated"
  // ordering survives the full content/ regeneration on every publish
  if (!/^(modified|lastmod|updated):/m.test(out.match(FRONTMATTER)[1])) {
    extras.push(`modified: ${mtime.toISOString()}`)
  }

  // prev/next chapter pager for Bible notes (rendered by plugins/ek-pager)
  const pager = pagerByChapter.get(path.basename(rel, ".md"))
  if (pager) {
    if (pager.prev && slugForNote(pager.prev))
      extras.push(`pagerPrevTitle: "${pager.prev}"`, `pagerPrevUrl: "${slugForNote(pager.prev)}"`)
    if (pager.next && slugForNote(pager.next))
      extras.push(`pagerNextTitle: "${pager.next}"`, `pagerNextUrl: "${slugForNote(pager.next)}"`)
    extras.push(
      `pagerUpTitle: "${pager.book}"`,
      `pagerUpUrl: "/bible#${pager.book.toLowerCase().replace(/\s+/g, "-")}"`,
    )
  }

  // verse links: display "[[Leviticus 11#11:44]]" as "Leviticus 11:44"
  // (only when the anchor starts with the chapter number and no alias is set)
  out = out.replace(
    /(?<!!)\[\[([^\]|#]+?)\s+(\d+)#(\d+:[\d\-–,:]+)\]\]/g,
    (m, book, ch, anchor) => (anchor.startsWith(`${ch}:`) ? `[[${book} ${ch}#${anchor}|${book} ${anchor}]]` : m),
  )

  // legacy URL aliases (old digital-garden slugs) -> alias-redirects plugin
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

  // Bible index: regroup the flat "## [[Genesis 1]]" chapter list into one
  // section per book with compact numbered chapter pills (styled in custom.scss)
  if (rel === cfg.bibleIndexNote) {
    const books = new Map()
    for (const m of out.matchAll(/^##\s+\[\[(.+?)\]\]\s*$/gm)) {
      const cm = m[1].match(/^(.+?)\s+(\d+)$/)
      const [book, num] = cm ? [cm[1], cm[2]] : [m[1], null]
      if (!books.has(book)) books.set(book, [])
      books.get(book).push(num ? `[[${m[1]}|${num}]]` : `[[${m[1]}]]`)
    }
    const fmEnd = out.indexOf("\n---", 4) + 4
    const sections = [...books.entries()]
      .map(([book, chapters]) => `## ${book}\n\n${chapters.join(" ")}`)
      .join("\n\n")
    out = out.slice(0, fmEnd) + `\n\n# Berean Standard Bible\n\n${sections}\n`
  }

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

// --- site pages: repo-owned pages (not vault notes), e.g. recently-updated
const sitePagesDir = path.join(ROOT, cfg.sitePagesDir ?? "sitePages")
let sitePages = 0
if (fs.existsSync(sitePagesDir)) {
  for (const f of fs.readdirSync(sitePagesDir)) {
    if (!f.endsWith(".md")) continue
    if (!DRY) fs.copyFileSync(path.join(sitePagesDir, f), path.join(CONTENT, f))
    sitePages++
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
  `${DRY ? "[dry-run] " : ""}published ${written.size} notes, ${sitePages} site pages, ` +
    `${copied} attachments, ${aliasCount} legacy aliases`,
)
if (missing.length) console.warn(`missing attachments: ${missing.join(", ")}`)
if (!notes.some((n) => n.rel === cfg.homeNote))
  console.warn(`WARN home note ${cfg.homeNote} not found among published notes`)
