// Recently-updated list — renders only on the /recently-updated page.
// Emits the same markup as folder/tag listing pages (section-li / section /
// meta / desc / tags) so it inherits their exact styling.
// Hand-written (no build step; edit directly, then force a plugin reinstall).
import { h } from "preact"

const EkRecent = (opts) => {
  const limit = opts?.limit ?? 30
  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
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
      { class: "section-ul ek-recent" },
      items.map((f) =>
        h(
          "li",
          { class: "section-li" },
          h("div", { class: "section" }, [
            h(
              "p",
              { class: "meta" },
              h("time", {}, fmt(f.dates.modified ?? f.dates.created)),
            ),
            h(
              "div",
              { class: "desc" },
              h("h3", {}, h("a", { href: "/" + f.slug, class: "internal" }, f.frontmatter?.title ?? f.slug)),
            ),
            Array.isArray(f.frontmatter?.tags) && f.frontmatter.tags.length > 0
              ? h(
                  "ul",
                  { class: "tags" },
                  f.frontmatter.tags.map((t) =>
                    h("li", {}, h("a", { class: "internal tag-link", href: "/tags/" + t }, t)),
                  ),
                )
              : null,
          ]),
        ),
      ),
    )
  }
  Recent.css = `
ul.ek-recent {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
`
  return Recent
}

export { EkRecent }
