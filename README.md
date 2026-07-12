# ekfocus.com

[Quartz v5](https://quartz.jzhao.xyz/) site for [ekfocus.com](https://www.ekfocus.com), published from the Obsidian vault at `/Users/jesse/Obsidian/ekfocus`. This replaced the old Eleventy digital-garden setup in July 2026; the legacy site's history is reachable through the merge commit that absorbed it. See [CLAUDE.md](./CLAUDE.md) for the full architecture and operational notes.

## How publishing works

1. Flag a note in Obsidian with `publish: true` in its frontmatter.
2. Run `make publish` from the vault root (`/Users/jesse/Obsidian/ekfocus`).
3. That runs [`publish.mjs`](./publish.mjs), which regenerates `content/` from scratch:
   - selects every vault note with `publish: true`,
   - maps vault folders to site URLs (see below),
   - copies image attachments referenced by published notes into `content/attachments/`,
   - injects legacy URL aliases for notes whose old digital-garden slug differs from the Quartz slug (the `alias-redirects` plugin turns these into redirects),
   - places the home note at `content/index.md`.
4. The Makefile commits `content/` and pushes; Vercel builds this branch and deploys.

Unflagging a note (or deleting it) removes it from the site on the next publish — `content/` is fully regenerated each run.

## Where to change things

**All publishing behavior is configured in [`publish.config.json`](./publish.config.json)** — edit that file, not the script:

- `pathRewrites` — vault folder → site URL prefix. Longest prefix wins. A folder with no rule publishes at its vault-relative path.
- `homeNote` — the vault note that becomes the site homepage.
- `legacyAliases` — vault note → old URL that should keep working (rendered as redirects). Add an entry here if you rename a note and want its old URL preserved.
- `siteTitle` — fallback title for the home page.

Site-wide settings (title, theme colors, fonts, analytics, enabled plugins) are in [`quartz.config.yaml`](./quartz.config.yaml). Custom styles live in `quartz/styles/custom.scss`.

**Local plugins** live in [`plugins/`](./plugins) (top nav, footer, chapter pager, recent list, plus forks of `search` and `graph` with small patches — each patch is commented in its source). After editing a local plugin, force a reinstall or the cached copy in `.quartz/` keeps serving the old code:

```sh
python3 -c "import json; l=json.load(open('quartz.lock.json')); l['plugins'].pop('<name>',None); json.dump(l,open('quartz.lock.json','w'),indent=2)"
rm -rf .quartz/plugins/<name> && npx quartz plugin install --from-config
```

## Local preview

```sh
npx quartz build --serve    # http://localhost:8080
```

Requires Node ≥ 22 (`/opt/homebrew/bin/node` on this machine).

## Deployment

Vercel builds `main`. Build settings come from [`vercel.json`](./vercel.json) — no dashboard configuration needed. Rollback: use Vercel's instant rollback to a previous deployment.
