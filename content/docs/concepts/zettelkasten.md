---
publish: true
modified: 2026-11-17T22:24:31.599Z
---

A [[zettelkasten]] is a neural network, a second brain, a graph of linked ideas. See also [[CLAUDE]].

## My Principles
* Each note should be [[atomic]], expressing only one idea.
* Use [[transclusion]] to represent outlines or ordered lists of ideas
* Use [[tags]] for categories
* Don't use [[tags]] for concepts, instead create a [[concept file]].
* Use as many [[links]] as possible, no notes should be free floating
* Use descriptive phrases when [[linking ideas together]] so the connection between them is clear
* Greater value comes from [[paraphrasing]] than does quoting–but link to references always
* [[Append only]] is preferred, if your position has changed it's best to create a new note that explains why your previous understanding was insufficient
* People are links to nodes in `people` directory
* Daily notes are in `dailies` and usually excluded from global graph
* File naming:
    * Quotes are prefixed with `Q-`
    * Dated items should be formatted as `YYYY-MM-DD Title of Note`
* The `archive` directory contains completed works (books, articles, documents, etc).
* The `archive/zotero` directory holds the PDFs for my reference library, named by citekey. See [[#Reference Library]].

## Bible Setup
* The `bible` directory contains the Scriptures in Markdown format, which can be downloaded using the [[get_text.sh]] script.
* References in the vault are linked via [[2021-02-17 pre-commit File for Fixing Scripture References]]. See also [[2020-11 vim Script for Converting Scripture References]]
* https://forum.obsidian.md/t/organising-the-bible-in-obsidian/1490/54?u=jag3773

## Task Management / Daily Use
I use [[Kanban]] for visual workflow management alongside weekly, quarterly, and [[Annual Planning|annual planning]]. I have documents that I set up for each of these and use `Templater` to set them up consistently (and interlink with one another_. For example, here is a snapshot of my 2023 setup:
- [[2023 Annual Canvas.canvas|2023 Annual Canvas]] - This is a visual layout that links to import things from our annual basis, including the four quarterly files.
- [[2023 uW Planning Ideas]] - This file contains my annual planning ideas.
- [[2023-Q1]], [[2023-Q2]], [[2023-Q3]], [[2023-Q4]] - Quarterly notes files.
  - [[2023-W01]], [[2023-W52]] - Example weekly files. Each of these links to the files above and the [[Areas and Projects]] file.
  - On a weekly basis, any of these files that have been updated get synced to my Quarderno so that I can write notes in a side note. I have these side notes setup such that they get inlined into my weekly files if they exist (e.g. [[2023-W52.md_Note.pdf]]).
  - 2026 Update: I inline my quarterly Quaderno notes into my weekly Obsidian notes (e.g. [[2026-W02]] inlines [[2026-Q1.md_Note.pdf]]). I'm trying this out to see if it makes it easier to find my handwritten notes which can sometimes have topics scattered throughout multiple notes files.

I put together a [brief 4 minute video overview](https://drive.google.com/file/d/1AfF1S33BA-aLPkXw7pu086KlNqEPrxOh/view?usp=share_link) of my daily todo and project management in my obsidian vault (2023-03). Subsequent [[2023-12 Obsidian Daily Use Diagram.excalidraw]] may be helpful.

## Project Setup
Inside of "Projects" I have a file for each of my active projects. At the top I put links to everything that matters to that project (e.g. project canvas, github repo, project management location, meeting link, agenda, etc.). That gives me quick access to whatever I may need for it. I often put links to the people involved in the project too (which goes to a file for that person which has details about them and sometimes notes on 1-1 meetings I've had with them in the past). For meeting notes, I often will put those in the project file in reverse chronological order, so the most recent one is always at the top and I scroll down for past notes. These notes, of course, can  link to anything else in the vault which is often helpful.

I used to use a daily note file with the periodic notes plugin but that become too many for my liking so I've switched to a weekly note which allows me to track my weekly priorities and todos, with links to each of the projects (and Areas) that I may need to handle that week. The next post is a project template that seems to work pretty well for me.

Sometimes it makes sense to add meeting notes to my Resources>Notes folder and then i just link from there to respective projects or whatever else needs to be included.

## Reading Workflow

My library lives in `resources/zotero`, one note per source, managed by the Stacks plugin. [[Stacks.base]] is where I see what's queued, being read, and waiting for review.

### Web Clipping
-  [Web Clipping Workflow](https://drive.google.com/file/d/1NH6ejjudVm-iZ4IC7SeHyqM9-SBMDq15/view) 7 mins
- Clips saved with Obsidian Web Clipper land in `resources/inbox`. Stacks looks up the page's metadata, names the note by citekey, files it in `resources/zotero`, and marks it `processed`, so the [[Vault-Ingestor]] picks it up on its next run.

### Find It! Workflow
- [Find It! Workflow](https://drive.google.com/file/d/1b_A3txc64_TpYWLHu98bM3-kPwpDJBAJ/view) 3 mins

### Adding a Book
- `Cmd-P` → **Stacks: Add reference**, then paste the ISBN or the book's Amazon or Goodreads URL. Stacks creates the note with status `queued`.
- For something with no ISBN, DOI or URL, use **Stacks: New reference without a lookup**.

### Getting eBooks
- Look first on http://www.gutenberg.org/ebooks/bookshelf/119 or for audio books, https://librivox.org/, maybe also Anna's Archive
- Else, get the Kindle version: purchase it, then download the azw from the Content & Devices page (or an ePub from another site)
- Else, Kobo: find and purchase the book on kobo.com, then download the .acsm file
- Create a clean ePub and PDF:
    - Import the .acsm or .azw into Calibre (see [[Calibre Setup]] for configuration)
    - Convert to ePub and PDF with Calibre
    - Drop the PDF into `resources/inbox`. Stacks reads the ISBN from the opening pages and files it in `archive/zotero` as `<citekey>.pdf` on the book's note. If it can't match the PDF, rename it to the citekey, put it in `archive/zotero`, and set the note's `pdf` property (or run **Stacks: Find PDF for current reference**).

### Reading eBooks
- In Goodreads, add the book to Currently Reading
- Set the note's `status` to `reading`. Stacks copies the PDF to the Dropbox `Reading` folder (or run **Stacks: Send PDF to tablet folder**).
- On the tablet, open MoonReader+ and download the file from the Dropbox folder
- Listen, highlighting words/phrases of paragraphs that I want to remember
- After finishing:
    - In MoonReader+, select Send File and upload it to Dropbox
    - Stacks notices the returned PDF (or run **Stacks: Check tablet folder for returned PDFs**), expands each highlight to its full paragraph with `parabloom`, copies it back over the original, and sets `status: reviewing`
    - In Goodreads, mark the book complete

### Reviewing eBooks
Books ready for review are in the **Reviewing** view of [[Stacks.base]]. Open the PDF in Obsidian and adjust the highlights:
- Add comments; they come into the note as a Note callout (also useful for captioning an image that has no text to highlight)
- <mark style="background: #ADCCFFA6;">Blue highlight</mark> is for images
- <mark style="background: #FF5582A6;">Red highlight</mark> is for important items (usually only a few per book)
- <mark style="background: #BBFABBA6;">Green highlight</mark> is for resources I may want to add to my [[Reading List|reading list]]
- ==Yellow highlight== is for a normal paragraph highlight

See [[parks2414Testimony2019]] for an example that uses all of the above (and this [zulip post about it](https://unfoldingword.zulipchat.com/#narrow/channel/303759-PKM/topic/Book.20Highlights/near/495087477)).

Saving the PDF re-extracts its annotations into the note's `## Annotations` section, each linked to its page. When I'm done:
- Run **Stacks: Extract annotations for current note** one last time; Stacks sets `status: processed`
- Set `collections` and `tags` on the note
- The [[Vault-Ingestor]] then turns the highlights into atomic notes, concept files and links, and sets `ingested` on the note

### Importing Highlights from Physical Books
- Take photos of relevant pages, ideally in numeric order for easier processing.
- Add the book with **Stacks: Add reference** if it isn't in the library yet.
- Create a highlights note in `resources/notes`, for example [[2023-10-14 Words of Delight Highlights]], and embed it in the book's note under `## Annotations` (e.g. `![[2023-10-14 Words of Delight Highlights]]`).
- For each photo:
  - Open it in Photos and copy the text from the image (if that doesn't work, use Mac's Preview app after downloading)
  - Save the photo to `archive/zotero` as `<citekey>-p#.jpg`, using the page number
  - Paste the text into the highlights note as a quote under a page heading (e.g. [[2023-10-14 Words of Delight Highlights#Page 49]])
- Set the book's `status` to `processed` when finished.

## Reference Library
* Each source is one note in `resources/zotero`, named by its citekey (formula `auth.lower + shorttitle(3, 3) + year`), with metadata in properties: `type`, `title`, `authors`, `year`, `collections`, `tags`, `status`, `owned`, `pdf`, `highlights`, `added`, `related`.
* `status` tracks reading: `queued` → `reading` → `reviewing` → `processed`, with `shelved` for everything I keep but am not working through.
* [[Stacks.base]] is the library view: Library, Queue, Reviewing, Recently read, Bookshelf, By collection, and Web and articles. Click a title to open the note, or the 📄 icon to open the PDF.
* PDFs live in `archive/zotero`, named by citekey; annotation links open the PDF at the right page.
* The Stacks plugin ([[griffinObsidianstacks2026]], https://github.com/jag3773/obsidian-stacks) adds references by ISBN, DOI or URL, files whatever lands in `resources/inbox`, extracts annotations, runs the tablet round trip, inserts citations and exports bibliographies.

## Misc

- See [[Search Google Drive in Obsidian! - Share & showcase - Jesse Griffin]] for steps to import Google Drive files so that they are findable
- [[Obsidian's Value Proposition]]
- See [[2024 Using Obsidian for Beginners]] also
- See [[2024-03 Personal Knowledge Management Workshop]] for a good set of resources to send to newbies
- [[2024 Personal Knowledge Management Visual Overview - Jesse Griffin.jpg]]
- [[Obsidian Icon Packs]]
- Import from goodreads with [[import_goodreads.py]]
- Import from Google Keep with [keep-it-markdown](https://github.com/djsudduth/keep-it-markdown)
- The [todo sort](https://github.com/ryangomba/obsidian-todo-sort) plugin automatically sorts todo lists based on checked status which is really helpful for my weekly notes.

## Related
- [[MOC Concepts]]
- [[griffinObsidianstacks2026|Stacks]]: the plugin (formerly Library) behind the [[#Reference Library]]; see [[Stacks - A Research Library Inside Obsidian - Summary]]
- [[File Over App]]: why the vault keeps its library and notes as plain files
- [[2026-11-17 Johnson Keeps Slow Hunches Alive in a Commonplace Book So They Can Collide Later]]: Johnson's commonplace book as a cousin of the zettelkasten ([[johnsonWhereGoodIdeas2010]])

## References

The following videos and sites might also be helpful:
- https://fortelabs.co/blog/para/
- https://writingcooperative.com/zettelkasten-how-one-german-scholar-was-so-freakishly-productive-997e4e0ca125 - overview of what a zettelkasten is and it's value, in theory
- https://www.youtube.com/watch?v=AtdAAD47aQY - Visual overview of different ways to organize your notes (+10 because he is using [Excalidraw](https://github.com/zsviczian/obsidian-excalidraw-plugin) in Obsidian to illustrate the various methods)
- https://www.youtube.com/watch?v=oE8HyLuHjsQ - 12 minute Obsidian overview using IMF framework
- https://github.com/hadynz/obsidian-kindle-plugin - This will pull your native Kindle highlights into Obsidian 
- https://www.youtube.com/channel/UC85D7ERwhke7wVqskV_DZUA/videos - Linking Your Thinking youtube channel has lots of good walk throughs and theory
- https://zettelkasten.de/
- https://www.zettlr.com/
- [[clearZettelkastenHowOne2021]]
- [[erikssonLivingZettelkastenBlay2015]]
- [organizing the Bible in Obsidian thread](https://forum.obsidian.md/t/organising-the-bible-in-obsidian/1490/54?u=jag3773)
- [[2024-03-22 Damian and Bible Study in Obsidian]]
