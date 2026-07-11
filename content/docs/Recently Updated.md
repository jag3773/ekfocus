---
publish: true
modified: 2026-05-17T00:07:17.000Z
---

A few recently updated notes to start your exploration.

```dataview
TABLE WITHOUT ID file.link AS Title, file.tags as Tags
WHERE dg-publish = True AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 20
```
