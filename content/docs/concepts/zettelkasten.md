---
publish: true
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
* The `archive/zotero` directory has PDFs of my library and is full text searchable in Zotero.
* Zotero integration:
    * Zotero Integration plugin is used
    * Attach PDFs in Zotero with Zotfile, storing them in `archive/zotero`
    * Resources queued for reading are in the `Queued` collection
    * Zotmoov: https://github.com/wileyyugioh/zotmoov/releases

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

### Web Clipping
-  [Web Clipping Workflow](https://drive.google.com/file/d/1NH6ejjudVm-iZ4IC7SeHyqM9-SBMDq15/view) 7 mins

### Find It! Workflow
- [Find It! Workflow](https://drive.google.com/file/d/1b_A3txc64_TpYWLHu98bM3-kPwpDJBAJ/view) 3 mins

### Getting eBooks
- Look first on http://www.gutenberg.org/ebooks/bookshelf/119 or for audio books, https://librivox.org/, maybe also Anna's Archive
- Else, get Kindle version:
    -  Visit Amazon page for paperback, add to the Zotero
    -  Purchase Kindle version
    -  Download azw from Content & Devices pages or ePub from other site
- Else, Kobo:
    - Still visit Amazon page and click add to Zotero
    - Find and purchase book on kobo.com
    - Download .ascm book 
- Create clean ePub and PDF:
    - Import .acsm or .azw to Calibre (see [[Calibre Setup]] for configuration)
    -  Convert to ePub and PDF with Calibre
    -  Drag PDF to Zotero item (which copies the file and renames it according to the citekey)

### Reading eBooks
- In Goodreads, add book to Currently Reading
- In Zotero: send file to tablet
- On tablet, open MoonReader+ and download file from Dropbox folder
- Listen, highlighting words/phrases of paragraphs that I want to remember
- After finished:
    - Select Send File and upload it to Dropbox
    - In Zotero:
      - in "Tablet Files (modified)", select "Get from Tablet"
      - Tag as `_reviewing`
    - In Goodreads, mark complete

### Reviewing eBooks
The books that are ready to be reviewed are in the "Reviewing" saved search in Zotero. Pick one of those and begin adjusting the highlights:
- Add notes, they come into Obsidian as a Note callout (this can also be helpful for adding a caption to an image that doesn't have one that I can highlight)
- <mark style="background: #ADCCFFA6;">Blue highlight</mark> is for images
- <mark style="background: #FF5582A6;">Red highlight</mark> is for important items (usually only a few per book)
- <mark style="background: #BBFABBA6;">Green highlight</mark> is for making resources that I may want to add to my [[Reading List|reading list]]
- ==Yellow highlight== is for a normal paragraph highlight
See [[parks2414Testimony2019]] for an example that uses all of the above features (and this [zulip post about it](https://unfoldingword.zulipchat.com/#narrow/channel/303759-PKM/topic/Book.20Highlights/near/495087477)).

When the adjustments are completed it's time to extract the annotations and organize in Zotero:
- Organize the book in a collection and apply tags
- Remove the tag for `_reviewing`
- In Obsidian, Cmd-P > "Zotero Integration: Import Literature Note" and select the book

*Bulk Import: Toggle developer tools and find the failing PDF and mark it as `_chokes_zotero_intergration`

### Importing Highlights from Physical Books
- Take photos of relevant pages, ideally in numeric order for easier processing.
- Obsidian: Create a note in resources/notes that's appropriately named, for this example, I did [[2023-10-14 Words of Delight Highlights]]
- Zotero: Add a note to the entry with Obsidians inline code, for this example `![[2023-10-14 Words of Delight Highlights]]` 
- Google Photos, Zotero, Obsidian: For each photo:
  - Open in Photos, copy text from image (if this doesn't work, copy from Mac's Preview app after downloaded)
  - Download photo (to /tmp)
  - Attach new file from Zotero (which moves and renames, `Cmd+Shift+Z`), add `-p#` to the filename for the page number.
  - Paste text into Obsidian as a quote under a page number header (e.g. [[2023-10-14 Words of Delight Highlights#Page 49]])
- Obsidian: import resource from Zotero
- Profit!

## Misc

- See [[Search Google Drive in Obsidian! - Share & showcase - Jesse Griffin]] for steps to import Google Drive files so that they are findable
- For Zotero integration, I used to use ~~[[2021-01-10 Zotero Setup]]~~ but now I use the **Zotero Integration** plugin and this template: [[Zotero Integration Template]]
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

## ~~Import Browsing History~~

*This froze zotero several times, turns out that 71k records aren't handled easily.*

1. Export Firefox browsing history using "History Export" extension.
2. Add required "type" field by running `cat data.json|jq '.[] += { type: "webpage" }' >Browsing\ History.json`
3. Import into Zotero