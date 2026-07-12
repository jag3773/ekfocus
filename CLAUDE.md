# ekfocus.com — Quartz site

Personal knowledge-garden site (Scripture study, theological concepts, biblical
languages) for Jesse Griffin. Built with **Quartz v5**, published from the
Obsidian vault at `~/Obsidian/ekfocus`, deployed on **Vercel**
(project `ekfocus-h574`, domain www.ekfocus.com).

## Architecture

```
Obsidian vault (notes with `publish: true` frontmatter)
      │  make publish  (run from the vault root)
      ▼
publish.mjs regenerates content/ → git commit + push to main
      ▼
Vercel builds main → www.ekfocus.com
```

- `main` is the only branch. The pre-2026-07 Eleventy "digital garden" site's
  history is reachable through the merge commit that absorbed it.
- Requires **Node ≥ 22**: use `/opt/homebrew/bin/node` (the default PATH node
  on this machine is v16). Jesse's `~/.npm` cache has root-owned files — pass
  `--cache <tmpdir>` to npm if installs fail.

## Publishing (the whole authoring workflow)

1. In Obsidian, set `publish: true` in a note's frontmatter (that's the only
   flag; the old `dg-publish` era ended with a bulk migration, vault commit
   b68bb99).
2. `make publish` from the vault root — syncs, commits, pushes; Vercel deploys.

`publish.mjs` does at sync time (all knobs in **publish.config.json**):
- selects `publish: true` notes; rewrites vault paths to site paths
  (`pathRewrites`, longest prefix wins — preserves the old site's URLs)
- home note → `content/index.md`; `sitePages/*.md` copied in (recently-updated)
- injects `modified:` from the vault file's mtime (so dates survive full
  regeneration; git dates are NOT relied on — shallow clones are fine)
- injects prev/next/book pager frontmatter for Bible chapters (rendered by
  `plugins/ek-pager`), and regroups `Bible.md` into per-book chapter pills
- rewrites `[[Book Ch#Ch:V]]` verse links to display "Book Ch:V"
- injects `aliases:` for the 16 notes whose old slugs differ (`legacyAliases`)
- copies image/file attachments referenced by markdown embeds, raw `<img>`
  tags, legacy `/img/user/...` paths, and old GitHub-raw links into
  `content/attachments/` (basename lookup across the vault, hyphen-name
  fallback for old slugified references)

`content/` is fully regenerated every publish — never edit it by hand.

## Local plugins (plugins/)

`ek-nav` (top bar links), `footer` (replaces stock footer: links + copyright),
`ek-recent` (list on /recently-updated, emits folder-listing markup),
`ek-pager` (Bible chapter pager) — hand-written `dist/index.js`, no build step.

`search` and `graph` are **patched forks** of the stock plugins (patches
commented in their sources): search attaches its UI before the index loads and
loads the index lazily; graph has `hidePaths` (no graph on `bible/`, `index`)
and `excludePaths` (no Bible nodes in the global graph).

**After editing any local plugin**, force a reinstall or the cached copy in
`.quartz/` keeps serving old code:

```sh
python3 -c "import json; l=json.load(open('quartz.lock.json')); l['plugins'].pop('<name>',None); json.dump(l,open('quartz.lock.json','w'),indent=2)"
rm -rf .quartz/plugins/<name> && npx quartz plugin install --from-config
```

Core-file patches (kept minimal, all commented): `quartz/components/Head.tsx`
(no doubled homepage title), `quartz/components/renderPage.tsx` (lazy
fetchData — the content index is ~5MB), `quartz/styles/custom.scss` (all
design CSS: graphite palette variables live in quartz.config.yaml).

## Vercel

- Build settings come from `vercel.json` in the repo (build command, `public`
  output, cleanUrls, three legacy redirects).
- `VERCEL_FORCE_NO_BUILD_CACHE=1` (in vercel.json build env) is deliberate:
  the plugin installer's update path fails against Vercel's restored cache
  (46 plugins "failed to update"). Fresh installs are reliable. Builds ~5 min.
- If production ever gets pinned to a promoted deployment, new pushes only
  build previews — promote again (`npx vercel promote <url> --yes`, CLI is
  authed as jag3773) or check Settings → Git → Production Branch = main.

## Verification

- Local: `npx quartz build --serve` → http://localhost:8080 (~2 min build).
- Production sweep: key pages, redirects, attachments, sitemap parity —
  a reference script exists in session history; core checks:
  `curl -s https://www.ekfocus.com/ | grep generator` (expect Quartz),
  `/bible/bible` → 308 → `/bible`, `/attachments/hebrew-anytime-paradigms.png`
  → 200, sitemap has ~1,430 URLs.

## History

- Migrated from the Obsidian Digital Garden plugin + Eleventy in July 2026.
  That plugin is uninstalled and its GitHub token revoked; the legacy site's
  history is reachable through the merge commit that absorbed it.
