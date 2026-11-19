import fs from "fs"
import path from "path"
import { FilePath, FullSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"

const SITE = "https://www.ekfocus.com"
const SITE_NAME = "EKFocus"
const DESCRIPTION =
  "Scripture study, theological concepts, and original language resources, linked in a growing web of notes."

const ROBOTS = `User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Applebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`

const AI_TXT = `# ${SITE_NAME}
User-agent: *
Allow: /

Site: ${SITE}/
Llms: ${SITE}/llms.txt
Sitemap: ${SITE}/sitemap.xml
Author: Jesse Griffin
`

const SUMMARY = {
  name: SITE_NAME,
  url: `${SITE}/`,
  description: DESCRIPTION,
  language: "en",
  author: "Jesse Griffin",
  llms: `${SITE}/llms.txt`,
  sitemap: `${SITE}/sitemap.xml`,
}

const CURATED_LLMS = `# ${SITE_NAME}

> ${DESCRIPTION}

## Start here

- [Home](${SITE}/): Jesse Griffin's public garden of notes on Scripture, theology, and the biblical languages
- [Concepts](${SITE}/docs/concepts): Theological and philosophical ideas traced across Scripture and secondary sources
- [Biblical languages](${SITE}/docs/biblical-languages): Hebrew, Greek, and Aramaic paradigm charts, vocabulary, and grammar notes
- [Writing](${SITE}/blog): Essays, study notes, and commentary
- [Scripture](${SITE}/bible): The biblical text with concept notes and cross-references linked through it
- [Recently updated](${SITE}/recently-updated): The latest changes in the garden

## Notes

- [Glory of God](${SITE}/docs/concepts/glory-of-god): A concept note mapping the glory of God across Scripture
- [Justification by faith](${SITE}/docs/concepts/justification-by-faith): A concept note on justification by faith and the passages that carry it
- [Live in Christ, you've already died to self](${SITE}/blog/2021-06-17-live-in-christ-you-ve-already-died-to-self): An essay on union with Christ and death to self

## Optional

- [Full index](${SITE}/llms-full.txt): Every published note, grouped by section
- [RSS](${SITE}/index.xml): The latest notes as a feed
`

function pageUrl(slug: string): string {
  const simple = String(simplifySlug(slug as FullSlug) ?? "")
  if (!simple || simple === "index" || simple === "/") return `${SITE}/`
  return `${SITE}/${simple.replace(/^\/+|\/+$/g, "")}`
}

function clean(text: string | undefined): string {
  if (!text) return ""
  const stripped = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  if (!stripped || stripped === "No description provided") return ""
  return stripped.length > 160 ? `${stripped.slice(0, 157).trimEnd()}...` : stripped
}

function sectionFor(slug: string): string {
  if (slug.startsWith("docs/concepts")) return "Concepts"
  if (slug.startsWith("docs/biblical-languages") || slug.includes("biblical-language")) return "Biblical languages"
  if (slug.startsWith("blog/")) return "Writing"
  if (slug.startsWith("bible/")) return "Scripture"
  if (slug.startsWith("tags/")) return "Tags"
  if (slug.startsWith("docs/")) return "Notes"
  return "Other"
}

function generateLlmsFull(content: ProcessedContent[]): string {
  const sections = new Map<string, string[]>()
  for (const [, file] of content) {
    const data = file.data as Record<string, unknown>
    if (data.unlisted === true) continue
    const slug = String(data.slug ?? "")
    if (!slug || slug === "404") continue
    const frontmatter = (data.frontmatter as Record<string, unknown> | undefined) ?? {}
    const title = String(frontmatter.title ?? slug)
    const description = clean(String(data.description ?? frontmatter.description ?? "")) || `A note on ${SITE_NAME}`
    const line = `- [${title.replace(/[\[\]]/g, "")}](${pageUrl(slug)}): ${description}`
    const section = slug === "index" ? "Home" : sectionFor(slug)
    const bucket = sections.get(section) ?? []
    bucket.push(line)
    sections.set(section, bucket)
  }

  const order = ["Home", "Concepts", "Biblical languages", "Writing", "Scripture", "Notes", "Tags", "Other"]
  const body = order
    .filter((name) => sections.has(name))
    .map((name) => `## ${name}\n\n${sections.get(name)!.sort().join("\n")}`)
    .join("\n\n")

  return `# ${SITE_NAME}\n\n> ${DESCRIPTION}\n\n${body}\n`
}

async function writeFile(output: string, rel: string, content: string): Promise<FilePath> {
  const dest = joinSegments(output, rel) as FilePath
  await fs.promises.mkdir(path.dirname(dest), { recursive: true })
  await fs.promises.writeFile(dest, content)
  return dest
}

export const GeoFiles: QuartzEmitterPlugin = () => ({
  name: "GeoFiles",
  async *emit(ctx, content) {
    const output = ctx.argv.output
    yield await writeFile(output, "robots.txt", ROBOTS)
    yield await writeFile(output, "llms.txt", CURATED_LLMS)
    yield await writeFile(output, "llms-full.txt", generateLlmsFull(content))
    yield await writeFile(output, path.join(".well-known", "ai.txt"), AI_TXT)
    yield await writeFile(output, path.join("ai", "summary.json"), JSON.stringify(SUMMARY, null, 2) + "\n")
  },
  async *partialEmit() {},
})
