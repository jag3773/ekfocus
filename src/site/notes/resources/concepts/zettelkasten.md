---
{"dg-publish":true,"dg-path":"docs/concepts/zettelkasten.md","permalink":"/docs/concepts/zettelkasten/","noteIcon":""}
---


A [[resources/concepts/zettelkasten\|zettelkasten]] is a neural network, a second brain, a graph of linked ideas. See also [[resources/agents/CLAUDE\|CLAUDE]].

## My Principles
* Each note should be [[resources/concepts/atomic\|atomic]], expressing only one idea.
* Use [[resources/concepts/transclusion\|transclusion]] to represent outlines or ordered lists of ideas
* Use [[resources/concepts/tags\|tags]] for categories
* Don't use [[resources/concepts/tags\|tags]] for concepts, instead create a [[resources/concepts/concept file\|concept file]].
* Use as many [[links\|links]] as possible, no notes should be free floating
* Use descriptive phrases when [[resources/concepts/linking ideas together\|linking ideas together]] so the connection between them is clear
* Greater value comes from [[resources/concepts/paraphrasing\|paraphrasing]] than does quoting–but link to references always
* [[resources/concepts/Append only\|Append only]] is preferred, if your position has changed it's best to create a new note that explains why your previous understanding was insufficient
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
* References in the vault are linked via [[resources/scripts/2021-02-17 pre-commit File for Fixing Scripture References\|2021-02-17 pre-commit File for Fixing Scripture References]]. See also [[resources/scripts/2020-11 vim Script for Converting Scripture References\|2020-11 vim Script for Converting Scripture References]]
* https://forum.obsidian.md/t/organising-the-bible-in-obsidian/1490/54?u=jag3773

## Task Management / Daily Use
I do weekly, quarterly, and annual planning. I have documents that I set up for each of these and use `Templater` to set them up consistently (and interlink with one another_. For example, here is a snapshot of my 2023 setup:
- [[resources/notes/2023 Annual Canvas.canvas\|2023 Annual Canvas]] - This is a visual layout that links to import things from our annual basis, including the four quarterly files.
- [[areas/planning/2023 uW Planning Ideas\|2023 uW Planning Ideas]] - This file contains my annual planning ideas.
- [[areas/planning/2023-Q1\|2023-Q1]], [[areas/planning/2023-Q2\|2023-Q2]], [[areas/planning/2023-Q3\|2023-Q3]], [[areas/planning/2023-Q4\|2023-Q4]] - Quarterly notes files.
  - [[resources/dailies/2023-W01\|2023-W01]], [[resources/dailies/2023-W52\|2023-W52]] - Example weekly files. Each of these links to the files above and the [[resources/notes/Areas and Projects\|Areas and Projects]] file.
  - On a weekly basis, any of these files that have been updated get synced to my Quarderno so that I can write notes in a side note. I have these side notes setup such that they get inlined into my weekly files if they exist (e.g. [2023-W52.md_Note.pdf](/img/user/resources/dailies/2023-W52.md_Note.pdf)).
  - 2026 Update: I inline my quarterly Quaderno notes into my weekly Obsidian notes (e.g. [2026-W02]] inlines [[2026-Q1.md_Note.pdf](/img/user/resources/dailies/2026-W02.md)). I'm trying this out to see if it makes it easier to find my handwritten notes which can sometimes have topics scattered throughout multiple notes files.

I put together a [brief 4 minute video overview](https://drive.google.com/file/d/1AfF1S33BA-aLPkXw7pu086KlNqEPrxOh/view?usp=share_link) of my daily todo and project management in my obsidian vault (2023-03). Subsequent [[resources/excalidraw/2023-12 Obsidian Daily Use Diagram.excalidraw\|2023-12 Obsidian Daily Use Diagram.excalidraw]] may be helpful.

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
    - Import .acsm or .azw to Calibre (see [[resources/scripts/Calibre Setup\|Calibre Setup]] for configuration)
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
- <mark style="background: #BBFABBA6;">Green highlight</mark> is for making resources that I may want to add to my reading list
- ==Yellow highlight== is for a normal paragraph highlight
See [[resources/zotero/parks2414Testimony2019\|parks2414Testimony2019]] for an example that uses all of the above features (and this [zulip post about it](https://unfoldingword.zulipchat.com/#narrow/channel/303759-PKM/topic/Book.20Highlights/near/495087477)).

When the adjustments are completed it's time to extract the annotations and organize in Zotero:
- Organize the book in a collection and apply tags
- Remove the tag for `_reviewing`
- In Obsidian, Cmd-P > "Zotero Integration: Import Literature Note" and select the book

*Bulk Import: Toggle developer tools and find the failing PDF and mark it as `_chokes_zotero_intergration`

### Importing Highlights from Physical Books
- Take photos of relevant pages, ideally in numeric order for easier processing.
- Obsidian: Create a note in resources/notes that's appropriately named, for this example, I did [[resources/notes/2023-10-14 Words of Delight Highlights\|2023-10-14 Words of Delight Highlights]]
- Zotero: Add a note to the entry with Obsidians inline code, for this example `
<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">



### Page 49
>[!quote]
> The monomyth is the most general or universal narrative pattern in the Bible. It takes more specific forms as well, including these:
> 1. ﻿﻿﻿The quest, in which a hero struggles to reach a goal, undergoing obstacles and temporary defeat before achieving success.
> 2. ﻿﻿﻿The death-rebirth motif, in which a hero endures death or danger and returns to life or security.
> 3. ﻿﻿﻿The initiation, in which a character is thrust out of an existing, usually ideal, situation and undergoes a series of ordeals as he or she encounters various forms of evil or hardship for the first time.
> 4. ﻿﻿﻿The journey, in which characters encounter danger and experience growth as they move from one place to another.
> 5. ﻿﻿﻿Tragedy, or the more specific form of the fall from innocence, depicting a decline from bliss to woe.
> 6. ﻿﻿﻿Comedy, a U-shaped story that begins in prosperity, descends into tragedy, but rises to a happy ending as obstacles to success are  overcome.
> 7. ﻿﻿﻿Crime and punishment.
> 8. The temptation, in which someone becomes the victim of an evil tempter or temptress.
> 9. The rescue.
> 10. ﻿﻿﻿﻿The suffering servant motif, in which a character undergoes undeserved suffering for the benefit of others.
> 11. ﻿﻿﻿﻿The Cinderella or rags-to-riches motif, in which a character overcomes the obstacles of ostracism and poverty.
> 12. The movement from ignorance to epiphany (insight, illumination).
> p. 49
> ![rykenWordsDelightLiterary1992-p49.jpg](/img/user/archive/zotero/rykenWordsDelightLiterary1992-p49.jpg)

### Page 51
>[!quote]
>In the gospel of John, the type scene of the misunderstood statement occurs nine times and consist of three elements: Jesus makes a pronouncement, a bystander expresses a misunderstanding of the utterance, and Jesus proceeds to explain the meaning of the statement. In the book of Acts, the following cycle of events is repeated: God raises up leaders who preach the gospel; they perform mighty works; crowds are drawn and many hearers are converted; opposition and persecution arise against the leaders; God intervenes to rescue them.  
>p. 51

### Page 69
![rykenWordsDelightLiterary1992-p69.jpg](/img/user/archive/zotero/rykenWordsDelightLiterary1992-p69.jpg)

### Page 209
>[!quote]
>With the genre and main idea of the poem identified, the next logical step is to lay out the unity and structure of the poem. Here the aim is to give an overview of the entire poem and to provide clear pathways through it. There are several dimensions to the structure of a poem. Every poem has its own topical units based on either changing ideas or changing images. It is important to mark out the successive units in a poem, thereby showing the flow of thought or feeling.
>Structure also depends on the type of material that dominates a poem. There are four possibilities. If a poem is mainly a description of either a character or a scene, it has a descriptive structure. If it presents a sequence of ideas or emotions, it has an expository structure. Narrative structure occurs if the main material is a sequence of events. If the dominant element is an address by the speaker to a listener, the poem has a dramatic structure. Many poems consist of a combination of these, but there is great merit in choosing one of them as the way in which an explicator has chosen to organize the poem for a given occasion. We are not in quest for the one right way to formulate the structure. What we need is a clear path- way through the poem, even when it is selected from two or more options.
>Other structural schemes may be important for a given poem. In the previous chapter I noted that lyrics tend to have a three-part structure. In the next chapter we will see that praise psalms have their own version of three-part structure and that lament psalms have five main elements. If a poem is strongly repetitive, in effect maintaining a single principle in different guises, the term repetitive structure is helpful. If a poem consists of a series of ideas that march by a process of logic to a conclusion, we can speak of logical structure. A poem that mainly lists various aspects of a topic can best be identified as structured on the catalogue principle.
>Many lyric poems are written at the white heat of emotion. They follow the very flow of a speaker's consciousness and jump abruptly from one subject to another. It is futile to look for a logical flow of ideas in such a poem. The point of unity is that it is all happening in the mind and consciousness of the speaker. The best designation for such a structure is psychological structure. Many lament psalms furnish examples.
>One of the most helpful things that was ever pointed out to me about poems was that most of them are organized around one or more contrasts. Perhaps this is the poetic equivalent of plot conflict in a story. In any case, one should always look for the principle of contrast in a poem. [[resources/bible/writings/Psalm 1\|Psalm 1]] is organized around a contrast between two ways of life. Lament psalms contrast the helpless victim and the oppressive foe, as well as portraying a tension between the speaker's emotional terror and confidence in God.
>p. 209
>![rykenWordsDelightLiterary1992-p209.jpg](/img/user/archive/zotero/rykenWordsDelightLiterary1992-p209.jpg)

### Page 421
>[!quote]
>The journey and quest motifs are obviously important in the pat- terns I have noted. The outward expansion of the church is not a random wandering but a purposeful quest to conquer the world with the Christian gospel. There is a strong sense of movement toward a goal. Of course, there is a surprise at the very end of the book. The story ends abruptly, with Paul's mission to Rome left incomplete. This open-ended conclusion is an impressive version of the technique of the serial story, with its premise "to be continued." The story told in the Book of Acts did not end but is still continuing.
>All this emphasis on travel and geography helps to supply some of the master images that unify the story. Chief among these are the journey and the city. The journeys of the apostles and missionaries assume the symbolic force of "the Way" (see 9:2; 16:17; 18:26; 19:9, 23; 24:14, 22). The journey of Paul as a prisoner bound for Rome has the overtones of a Via Dolorosa (the way of sorrow; that is, the way of the cross), a journey of suffering for Christ. The image of the city also recurs in the story and is one of the things that gives the Book of Acts its modern flavor.
>Along with the progressive element in the story, the book is struc- tured on a cyclic principle. The following pattern is repeated through- out the book in an ever-widening spiral: Christian leaders arise and preach the gospel; God performs mighty acts through them; listeners are converted and added to the church; opponents (usually Jewish) begin to persecute the Christian leaders; God intervenes to rescue the leaders or otherwise protect the church.2
>Geography is a major organizing principle in the Book of Acts. I have already noted that the progression of the plot involves geographic expansion outward from Jerusalem. The story begins in Jerusalem and ends in Rome, and there is a symbolic importance in this strategy. Jerusalem represents the Jewish roots from which Christianity arose. Rome is the capital of the Gentile world. The geographical transfer that occurs in the Book of Acts is also a theological transfer.
>The foregoing discussion of the structure of the book suggests why some commentators have ascribed an epic quality to Acts. The story has epic sweep. It is the story not of an individual but of a whole group. The epic sense of destiny breathes through the book. Equally epic is the expansion of the action over vast stretches of geography.
>p. 421

### Page 451
>[!quote]
>The traits of both form and content that I have noted in the Christ hymns of the New Testament are epitomized in the hymn found in [[resources/bible/epistles/Colossians 1#1:15-20\|Colossians 1#1:15-20]]. This Christ hymn consists of two companion poems. The first exalts Christ's supremacy over creation, while the second extols his headship over the church. The impact of companion poems depends on our tracing the parallels between the two parts. hymn, everything in the first poem corresponds to something in the this second. In figure 2 the two poems are printed with lines that show the connections, and I leave it to my readers to ponder what those cor- respondences are.
>The keynote of the companion poems is the idea of supremacy. The best index to this emphasis is the recurrence of the words all and everything: all creation, all things (a total of five times), in everything, all the fulness. et diw
>The companion poems of [[resources/bible/epistles/Colossians 1\|Colossians 1]] encapsulate the New Testa- ment forms I have discussed in this chapter. They are poetic in form. Their lines have the concise, memorable quality that we associate with the proverbial quality of New Testament literature. The passage shares the lyric quality of much of the New Testament and falls into the specific New Testament genre of the Christ hymn.
>p. 451
>![rykenWordsDelightLiterary1992-p458.jpg](/img/user/archive/zotero/rykenWordsDelightLiterary1992-p458.jpg)

</div></div>
` 
- Google Photos, Zotero, Obsidian: For each photo:
  - Open in Photos, copy text from image (if this doesn't work, copy from Mac's Preview app after downloaded)
  - Download photo (to /tmp)
  - Attach new file from Zotero (which moves and renames, `Cmd+Shift+Z`), add `-p#` to the filename for the page number.
  - Paste text into Obsidian as a quote under a page number header (e.g. [[resources/notes/2023-10-14 Words of Delight Highlights#Page 49\|2023-10-14 Words of Delight Highlights#Page 49]])
- Obsidian: import resource from Zotero
- Profit!

## Misc

- See [[resources/notes/Search Google Drive in Obsidian! - Share & showcase - Jesse Griffin\|Search Google Drive in Obsidian! - Share & showcase - Jesse Griffin]] for steps to import Google Drive files so that they are findable
- For Zotero integration, I used to use ~~[[resources/scripts/2021-01-10 Zotero Setup\|2021-01-10 Zotero Setup]]~~ but now I use the **Zotero Integration** plugin and this template: [[resources/templates/Zotero Integration Template\|Zotero Integration Template]]
- [[resources/notes/Obsidian's Value Proposition\|Obsidian's Value Proposition]]
- See [[resources/notes/2024 Using Obsidian for Beginners\|2024 Using Obsidian for Beginners]] also
- See [[archive/projects/2024-03 Personal Knowledge Management Workshop\|2024-03 Personal Knowledge Management Workshop]] for a good set of resources to send to newbies
- [2024 Personal Knowledge Management Visual Overview - Jesse Griffin.jpg](/img/user/archive/slidedecks/rendered/2024%20Personal%20Knowledge%20Management%20Visual%20Overview%20-%20Jesse%20Griffin.jpg)
- [[resources/notes/Obsidian Icon Packs\|Obsidian Icon Packs]]
- Import from goodreads with [[import_goodreads.py]]
- Import from Google Keep with [keep-it-markdown](https://github.com/djsudduth/keep-it-markdown)
- The [todo sort](https://github.com/ryangomba/obsidian-todo-sort) plugin automatically sorts todo lists based on checked status which is really helpful for my weekly notes.

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
- [[resources/zotero/clearZettelkastenHowOne2021\|clearZettelkastenHowOne2021]]
- [[resources/zotero/erikssonLivingZettelkastenBlay2015\|erikssonLivingZettelkastenBlay2015]]
- [organizing the Bible in Obsidian thread](https://forum.obsidian.md/t/organising-the-bible-in-obsidian/1490/54?u=jag3773)
- [[resources/notes/2024-03-22 Damian and Bible Study in Obsidian\|2024-03-22 Damian and Bible Study in Obsidian]]

## ~~Import Browsing History~~

1. Export Firefox browsing history using "History Export" extension.
2. Add required "type" field by running `cat data.json|jq '.[] += { type: "webpage" }' >Browsing\ History.json`
3. Import into Zotero
  1. This froze zotero several times, turns out that 71k records aren't handled easily