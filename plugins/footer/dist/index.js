// EKFocus footer — hand-written (no build step; edit directly).
// Link targets are configurable from quartz.config.yaml via options.links.
import { h } from "preact"

const DEFAULT_LINKS = {
  Keybase: "https://keybase.io/jag3773/",
  GitHub: "https://github.com/jag3773/ekfocus",
  unfoldingWord: "https://www.unfoldingword.org",
}

const Footer = (opts) => {
  const links = opts?.links ?? DEFAULT_LINKS
  const year = new Date().getFullYear()
  const FooterComponent = ({ displayClass }) =>
    h("footer", { class: `ek-footer ${displayClass ?? ""}` }, [
      h(
        "ul",
        { class: "ek-footer-links" },
        Object.entries(links).map(([text, link]) => h("li", {}, h("a", { href: link }, text))),
      ),
      h("p", { class: "ek-footer-legal" }, [
        `Copyright © ${year} Jesse Griffin. All original work licensed as `,
        h("a", { href: "https://creativecommons.org/licenses/by-sa/4.0/" }, "CC BY-SA 4.0"),
        ". Scripture is from the Berean Standard Bible.",
      ]),
    ])
  FooterComponent.css = `
.ek-footer {
  text-align: left;
  margin: 2rem 0 4rem 0;
  padding-top: 1rem;
  border-top: 1px solid var(--lightgray);
  font-size: 0.85rem;
  color: var(--gray);
}
.ek-footer-links {
  list-style: none;
  margin: 0 0 0.4rem 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.2rem;
}
.ek-footer-links a,
.ek-footer-legal a {
  color: var(--darkgray);
}
.ek-footer-legal {
  margin: 0;
}
`
  return FooterComponent
}

export { Footer }
