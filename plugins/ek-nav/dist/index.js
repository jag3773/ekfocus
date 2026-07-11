// EKFocus top navigation — hand-written (no build step; edit directly).
// Link targets are configurable from quartz.config.yaml via options.links.
import { h } from "preact"

const DEFAULT_LINKS = {
  Concepts: "/docs/concepts",
  Languages: "/docs/biblical-languages",
  Writing: "/blog",
  Scripture: "/bible",
  Recent: "/recently-updated",
}

const EkNav = (opts) => {
  const links = opts?.links ?? DEFAULT_LINKS
  const Nav = ({ displayClass }) =>
    h(
      "nav",
      { class: `ek-nav ${displayClass ?? ""}` },
      Object.entries(links).map(([text, href]) => h("a", { href, class: "ek-nav-link" }, text)),
    )
  Nav.css = `
.ek-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.4rem;
  align-items: center;
}
.ek-nav-link {
  font-family: var(--headerFont);
  font-size: 0.98rem;
  font-weight: 500;
  color: var(--darkgray);
  text-decoration: none;
}
.ek-nav-link:hover {
  color: var(--dark);
  text-decoration: underline;
  text-underline-offset: 4px;
}
`
  return Nav
}

export { EkNav }
