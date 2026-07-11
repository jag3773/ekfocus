// Prev/next chapter pager — renders on notes that carry pager* frontmatter
// (injected for Bible chapters by publish.mjs). Hand-written, no build step.
import { h } from "preact"

const EkPager = () => {
  const Pager = ({ fileData }) => {
    const fm = fileData.frontmatter ?? {}
    if (!fm.pagerPrevUrl && !fm.pagerNextUrl) return null
    return h("nav", { class: "ek-pager", "aria-label": "Chapter navigation" }, [
      fm.pagerPrevUrl
        ? h("a", { href: fm.pagerPrevUrl, class: "ek-pager-prev" }, `← ${fm.pagerPrevTitle}`)
        : h("span"),
      fm.pagerUpUrl ? h("a", { href: fm.pagerUpUrl, class: "ek-pager-up" }, fm.pagerUpTitle) : h("span"),
      fm.pagerNextUrl
        ? h("a", { href: fm.pagerNextUrl, class: "ek-pager-next" }, `${fm.pagerNextTitle} →`)
        : h("span"),
    ])
  }
  Pager.css = `
.ek-pager {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin: 2.2rem 0 0.5rem 0;
  padding-top: 1rem;
  border-top: 1px solid var(--lightgray);
  font-family: var(--headerFont);
  font-size: 0.95rem;
}
.ek-pager a {
  color: var(--darkgray);
  text-decoration: none;
}
.ek-pager a:hover {
  color: var(--dark);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ek-pager-up {
  color: var(--gray) !important;
}
`
  return Pager
}

export { EkPager }
