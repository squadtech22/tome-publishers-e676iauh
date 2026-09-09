/**
 * Site content for the marketing pages.
 *
 * Structure and copy are ported from amazopublishers.com (same owner) and
 * rewritten for the TOME voice. Keeping it in one typed module means the
 * home page, the nav and the generated service pages cannot drift apart.
 */

export interface Service {
  slug: string;
  title: string;
  /** Short line used on the home page grid and the service page hero. */
  summary: string;
  /** Longer opening paragraph for the service page. */
  body: string;
  /** What the engagement actually includes. */
  includes: string[];
  /** Shown in the primary header nav rather than the dropdown. */
  primary?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: 'ghostwriting',
    title: 'Ghostwriting',
    summary:
      'Professional ghostwriters who write in your voice, not theirs. You keep the byline and the final word.',
    body: 'A ghostwriter is not a substitute for you. The job is to get what is already in your head onto the page in the register you would have used if you had six free months and the training to spend them well.',
    includes: [
      'Structured interviews to capture voice, argument and anecdote',
      'A chapter map agreed before a word of prose is drafted',
      'Drafts delivered in stages, never in one overwhelming block',
      'Unlimited rewrites within the agreed scope',
      'Written by people — no AI drafting',
    ],
    primary: true,
  },
  {
    slug: 'book-editing-proofreading',
    title: 'Book Editing & Proofreading',
    summary:
      'Developmental, line and copy editing — plus a final proofread that catches what the earlier passes missed.',
    body: 'These are four different jobs and they are not interchangeable. Structural problems cannot be fixed by fixing commas, and a proofreader reading the edited manuscript instead of the typeset pages will miss the errors that typesetting introduces.',
    includes: [
      'Developmental edit on structure, argument and pace',
      'Line edit for rhythm, clarity and voice',
      'Copyedit for grammar, consistency and fact-checking',
      'Proofread on the typeset pages, by fresh eyes',
      'Every change tracked, and every change yours to reject',
    ],
    primary: true,
  },
  {
    slug: 'amazon-book-publishing',
    title: 'Amazon Book Publishing',
    summary:
      'The world’s largest bookstore, set up properly — categorised, keyworded and launched rather than merely uploaded.',
    body: 'Most self-published books lose to their own metadata. Category and keyword choices made in ten minutes at the end of a long project decide who ever sees the book at all.',
    includes: [
      'KDP account set up and registered in your name',
      'Category and keyword research against live competition',
      'Print and eBook files validated before submission',
      'Pricing and territory strategy',
      'Launch sequencing so reviews arrive when they matter',
    ],
    primary: true,
  },
  {
    slug: 'book-marketing',
    title: 'Book Marketing',
    summary:
      'Finding the readers who were already looking for a book like yours, rather than shouting at everyone else.',
    body: 'Book marketing fails when it tries to reach everybody. We would rather reach the few thousand people for whom this specific book is the best thing they will read this year, and reach them properly.',
    includes: [
      'Positioning and comparable-title analysis',
      'Launch timeline beginning months before publication',
      'Reviewer and media outreach to outlets that cover this shelf',
      'Retail page optimisation',
      'Post-launch reporting against real numbers',
    ],
    primary: true,
  },
  {
    slug: 'book-cover-design',
    title: 'Book Cover Design',
    summary:
      'Covers that read correctly at thumbnail size first, and hold up in print second.',
    body: 'Readers meet your cover at about 120 pixels wide, in a grid of forty others. If the title is unreadable there, the design has failed regardless of how it looks at full size on a designer’s monitor.',
    includes: [
      'Multiple concept directions before any one is developed',
      'Thumbnail legibility testing against real retail grids',
      'Full wrap: front, spine and back, print-ready',
      'Typography drawn for the book, not picked from a menu',
      'Source files handed over at the end',
    ],
    primary: true,
  },
  {
    slug: 'book-publishing',
    title: 'Book Publishing',
    summary:
      'End-to-end publishing: manuscript to distributed book, across every major retailer.',
    body: 'The full path from finished draft to a book people can buy — editing, design, typesetting, ISBNs, metadata and distribution, managed as one project rather than six disconnected ones.',
    includes: [
      'ISBN assignment, registered to you',
      'Print and digital production',
      'Metadata and BISAC categorisation',
      'Distribution to all major retail and library channels',
      'A single project manager across the whole thing',
    ],
  },
  {
    slug: 'book-formatting',
    title: 'Book Formatting',
    summary:
      'Interiors typeset to professional standards, for print and for every eBook reader.',
    body: 'Typesetting is what separates a book from a printed document. Measure, leading and margins are set for sustained reading, not for hitting a page count.',
    includes: [
      'Print interiors typeset to trim size',
      'Reflowable eBook files tested on real devices',
      'Front and back matter set correctly',
      'Running heads, folios and section openers',
      'Fixed-layout handling for illustrated books',
    ],
  },
  {
    slug: 'blog-article-writing',
    title: 'Blog & Article Writing',
    summary:
      'Regular, well-researched articles that build an audience between book releases.',
    body: 'A book launch is a spike. An audience is what makes the next launch start from higher ground, and articles are the cheapest way to build one.',
    includes: [
      'Topic research grounded in what your readers search for',
      'Long-form articles written by people who read the genre',
      'A publishing cadence you can actually sustain',
      'Internal linking back to your books',
      'Ongoing performance reporting',
    ],
  },
];

/**
 * Genre and packaging pages. They sit in the header dropdown alongside the
 * craft services, matching the structure of the sister site.
 */
export const SPECIALIST_SERVICES: Service[] = [
  {
    slug: 'hassle-free-publishing',
    title: 'Hassle-Free Publishing',
    summary:
      'One price, one project manager, one date. Everything from edit to retail listing, handled.',
    body: 'For authors who want a finished book and would rather not learn the trade to get one. Scope is fixed in writing before anything starts, so the number you are quoted is the number you pay.',
    includes: [
      'A single fixed quote covering the whole path to publication',
      'One project manager from first call to launch day',
      'Editing, design, typesetting and distribution included',
      'ISBNs and retail accounts registered in your name',
      'A firm publication date, agreed up front',
    ],
  },
  {
    slug: 'book-promotion',
    title: 'Book Promotion',
    summary:
      'Campaigns aimed at the readers most likely to buy, run on dates that actually matter.',
    body: 'Promotion is not the same as marketing. Marketing decides what the book is and who it is for; promotion is the campaign that puts it in front of them at the right moment.',
    includes: [
      'Promotional calendar built around your launch',
      'Reader newsletter and review-site placements',
      'Paid campaigns with real reporting, not vanity metrics',
      'Retail price-promotion scheduling',
      'Results measured against sales, not impressions',
    ],
  },
  {
    slug: 'childrens-books',
    title: 'Children’s Books',
    summary:
      'Picture books, early readers and chapter books, planned around how children actually read.',
    body: 'A children’s book is an engineering problem as much as a creative one: page count, spread rhythm, reading age and read-aloud rhythm all constrain each other.',
    includes: [
      'Planned across standard 32-page spreads',
      'Illustration briefing and commissioning',
      'Vocabulary and sentence length pitched to a real reading age',
      'Read-aloud testing for rhyme and rhythm',
      'Print specification for durable children’s formats',
    ],
  },
  {
    slug: 'comics-graphic-novels',
    title: 'Comics & Graphic Novels',
    summary:
      'Panel breakdown, page-turn reveals and lettering set as part of the art, not on top of it.',
    body: 'Sequential art has its own grammar. A script that reads well as prose can fall apart once it is broken into panels and pages, and the page turn is a storytelling device in its own right.',
    includes: [
      'Script-to-panel breakdown',
      'Page-turn reveals planned deliberately',
      'Artist and letterer matching',
      'Lettering treated as part of the artwork',
      'Print and digital-first file preparation',
    ],
  },
  {
    slug: 'romance-love-stories',
    title: 'Romance & Love Stories',
    summary:
      'Contemporary, historical, romantasy and romantic suspense — edited to the beats readers expect.',
    body: 'Romance readers are among the most genre-literate audiences in publishing. They know the beats, and they notice when a book misses them.',
    includes: [
      'Beat-structure edit against genre convention',
      'Dual POV handled consistently',
      'Heat level set with you and held throughout',
      'Period detail checked for historical romance',
      'Series planning and cover consistency',
    ],
  },
];

/** Post-publication services — presented as a secondary band. */
export const ADDITIONAL_SERVICES: Service[] = [
  {
    slug: 'audio-book',
    title: 'Audio Book',
    summary: 'Studio narration and full audiobook production, distributed to Audible and beyond.',
    body: 'Audiobooks are the fastest-growing format in publishing, and the one most often skipped because the production process is unfamiliar.',
    includes: [
      'Narrator casting with real auditions',
      'Studio-quality recording and direction',
      'Mastering to retail specification',
      'Distribution to Audible, Apple and Spotify',
    ],
  },
  {
    slug: 'website-content-writing',
    title: 'Website Content Writing',
    summary: 'Clear, search-aware website copy that sounds like a person wrote it.',
    body: 'Copy that reads well and ranks well are not opposing goals. Writing for search engines at the expense of readers stopped working years ago.',
    includes: [
      'Page-by-page copy built on real search intent',
      'A voice consistent with your books',
      'Metadata and structured data',
      'Revisions until it sounds like you',
    ],
  },
  {
    slug: 'book-video-trailer',
    title: 'Book Video Trailer',
    summary: 'Short, sharp video trailers cut for social feeds and retail pages.',
    body: 'A trailer has a few seconds to earn attention in a feed. That is a different craft from a cinema trailer, and it is edited differently.',
    includes: [
      'Script and storyboard from the book itself',
      'Motion graphics in your cover’s visual language',
      'Cuts sized for every major platform',
      'Licensed music and sound design',
    ],
  },
  {
    slug: 'author-website',
    title: 'Author Website',
    summary: 'A fast, permanent home for your books, your list and your readers.',
    body: 'Social platforms rent you an audience. A website is the only place online you actually own, and the only one that will still be there in ten years.',
    includes: [
      'Design drawn from your book’s identity',
      'Catalogue pages for every title',
      'Mailing-list capture that you control',
      'Fast, accessible and search-ready',
    ],
  },
];

export const ALL_SERVICES = [...SERVICES, ...SPECIALIST_SERVICES, ...ADDITIONAL_SERVICES];

export const GENRE_GROUPS = [
  {
    heading: 'Fiction & non-fiction',
    items: [
      ['Literary & upmarket fiction', 'Voice-led novels where the sentences carry as much weight as the plot.'],
      ['Commercial fiction', 'Crime, thriller and speculative work, edited to genre expectation.'],
      ['Business & leadership', 'Books that carry an argument and have to survive a sceptical reader.'],
      ['Memoir & biography', 'Chronology, distance, and the hard question of what to leave out.'],
      ['History & popular science', 'Structural editing plus a sourcing and citation pass.'],
      ['Poetry & short forms', 'Sequencing, spacing and typesetting that respects the line break.'],
      ['Faith, self-help & wellbeing', 'Claims checked, tone kept warm, and no promises the book cannot keep.'],
    ],
  },
  {
    heading: 'Children’s & illustrated',
    items: [
      ['Picture books', 'Planned across 32-page spreads, with the pictures carrying what the words leave out.'],
      ['Early readers & chapter books', 'Controlled vocabulary and sentence length, pitched at a real reading age.'],
      ['Middle grade & young adult', 'Pace held tight enough that a child who is allowed to stop does not.'],
      ['Comics & graphic novels', 'Panel breakdown, page-turn reveals and lettering set as part of the art.'],
      ['Rhyme & children’s verse', 'Scanned line by line, because a rhyme that trips ruins the read-aloud.'],
    ],
  },
  {
    heading: 'Romance',
    items: [
      ['Contemporary romance', 'Beat structure and dual POV, with the heat level set and held.'],
      ['Historical romance', 'Period language, money and social rules checked against the era.'],
      ['Romantasy', 'A romance arc and a magic system that have to resolve together.'],
      ['Romantic suspense', 'A threat plot paced so it tightens the relationship instead of pausing it.'],
    ],
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Onboarding',
    body: 'You are assigned a dedicated project manager who stays with the book to the end — not a queue, and not a new name every fortnight.',
  },
  {
    n: '02',
    title: 'Strategy',
    body: 'We write down how the book gets made and what success looks like, and you approve it before any production begins.',
  },
  {
    n: '03',
    title: 'Milestones',
    body: 'The project is broken into milestones with real dates, so progress is never something you have to ask about.',
  },
  {
    n: '04',
    title: 'Production',
    body: 'A team matched to your genre does the work, following your instructions and holding your voice.',
  },
  {
    n: '05',
    title: 'Originality',
    body: 'Everything is written by people. AI drafting does not carry emotion, and readers can tell.',
  },
  {
    n: '06',
    title: 'Results',
    body: 'We deliver what was scoped, on the dates agreed. Your satisfaction is the only measure that counts.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'The publishing side always intimidated me. Having one person who knew the whole process and answered plainly made the difference.',
    name: 'D. L.',
    role: 'Debut novelist',
  },
  {
    quote:
      'Turning the book into an audiobook was the best decision of the launch. The casting process was genuinely thorough.',
    name: 'L. M.',
    role: 'Non-fiction author',
  },
  {
    quote:
      'I came in with an outline and no idea how any of it worked. The chapter map alone was worth the engagement.',
    name: 'M. J.',
    role: 'Memoirist',
  },
  {
    quote: 'I wanted a ghostwriter who would not sand the edges off the story. That is what I got.',
    name: 'J. B.',
    role: 'Historical fiction',
  },
  {
    quote: 'Every step was explained before it happened. No surprise invoices, no vanishing project manager.',
    name: 'H. J.',
    role: 'Business author',
  },
  {
    quote:
      'The cover tested better at thumbnail than anything I had commissioned before. That is what actually moved sales.',
    name: 'J. K.',
    role: 'Thriller author',
  },
];

export const FAQS = [
  {
    q: 'Why choose TOME Publishers?',
    a: 'You get a plagiarism-free guarantee, a money-back guarantee under qualifying terms set out in writing, and complete confidentiality. Every account, ISBN and royalty stream is registered in your name, not ours.',
  },
  {
    q: 'Can I change my team or point of contact if I am not satisfied?',
    a: 'Yes. If the assigned team or project manager is not working for you, tell us and we will reassign the project to someone with genuine expertise in your genre. There is no charge for this.',
  },
  {
    q: 'Will I own the rights to my book?',
    a: 'Always. Once the project is complete and approved, every right to the content remains with you. We do not take a share of royalties and we do not hold your accounts.',
  },
  {
    q: 'What services do you offer?',
    a: 'End-to-end publishing support: ghostwriting, developmental and copy editing, proofreading, formatting, cover design, ISBN assignment, distribution across all major platforms, audiobook production, and post-launch marketing.',
  },
  {
    q: 'How long does publishing take?',
    a: 'It depends entirely on scope. A proofread and format on a finished manuscript can take two to three weeks. Full-service publishing usually runs four to twelve weeks. Ghostwriting a full manuscript typically takes four to nine months. You get real dates in writing before you commit.',
  },
  {
    q: 'Do you use AI to write books?',
    a: 'No. Drafting is done by human writers. We may use software for research, transcription and consistency checking, but the prose is written by a person, and we will tell you exactly who.',
  },
];

export const RETAILERS = [
  'Amazon Kindle',
  'Apple Books',
  'Barnes & Noble',
  'Kobo',
  'Ingram Spark',
  'Audible',
  'Google Play Books',
  'Smashwords',
];

export const HERO_PROMISES = [
  'Unlimited rewrites within your agreed scope',
  'A dedicated project manager from day one',
  'Two-day turnaround on revisions',
];

export const STATS = [
  { figure: 12, suffix: '+', label: 'Years of experience' },
  { figure: 480, suffix: '+', label: 'Books published' },
  { figure: 40, suffix: '+', label: 'Creative writers' },
];
