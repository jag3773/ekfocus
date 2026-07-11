---
publish: true
---

A few recently updated notes to start your exploration.

```dataview
TABLE WITHOUT ID file.link AS Title, file.tags as Tags
WHERE dg-publish = True AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 20
```
