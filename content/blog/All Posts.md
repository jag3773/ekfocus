---
publish: true
---

```dataview
LIST
FROM "resources/blog"
WHERE dg-publish
SORT file.name DESC
```