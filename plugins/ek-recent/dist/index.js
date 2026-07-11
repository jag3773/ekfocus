// Recently-updated list — renders only on the /recently-updated page.
// Hand-written (no build step; edit directly).
import { h } from "preact"

const EkRecent = (opts) => {
  const limit = opts?.limit ?? 30
  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  const Recent = ({ fileData, allFiles }) => {
    if (fileData.slug !== "recently-updated") return null
    const items = (allFiles ?? [])
      .filter((f) => f.slug && f.slug !== "index" && f.slug !== "recently-updated" && f.dates)
      .sort(
        (a, b) =>
          new Date(b.dates.modified ?? b.dates.created) -
          new Date(a.dates.modified ?? a.dates.created),
      )
      .slice(0, limit)
    return h(
      "ul",
      { class: "ek-recent" },
      items.map((f) =>
        h("li", {}, [
          h("a", { href: "/" + f.slug, class: "internal" }, f.frontmatter?.title ?? f.slug),
          h("span", { class: "ek-recent-date" }, fmt(f.dates.modified ?? f.dates.created)),
        ]),
      ),
    )
  }
  Recent.css = `
.ek-recent {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.ek-recent li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--lightgray);
}
.ek-recent-date {
  color: var(--gray);
  font-size: 0.85rem;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
`
  return Recent
}

export { EkRecent }
