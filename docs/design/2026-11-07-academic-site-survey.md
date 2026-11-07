# Academic personal site survey (2026-11-07)

Fourteen homepages of CS, NLP and HCI faculty (CMU, Stanford, Princeton, MIT, UPenn, UW), fetched 2026-11-07 as text and, for four, raw HTML/CSS. Typography and colour are recorded only where the markup shows them. This public copy names each site's strengths and lists failures as anonymous anti-patterns; the per-site critique is kept outside the repo.

## Sites

| # | Site | Layout | Publications | Projects shown | What works |
|---|---|---|---|---|---|
| 1 | Graham Neubig, phontron.com | Multi-page, 900 px column | Own page, code/slides per entry | Own "Software" page | Short labelled nav; dated writing cards with thumbnails; light/dark theme; one dark-red accent |
| 2 | Maarten Sap, maartensap.com | Single page | Link to full list | In research prose | Research as four themed blocks, each with an image |
| 3 | Jeffrey Bigham, cs.cmu.edu/~jbigham | Single long page | Topic filter over a bib-generated list | As news items | Thorough record of students and alumni |
| 4 | Chris Harrison, chrisharrison.net | Short landing + activity log | Research page | "Fun Projects" page | Two-sentence bio; four honest nav labels |
| 5 | Daniel Fried, dpfried.github.io | Single page, anchor nav | In-page section | As news | Teaching list: code, title, term |
| 6 | Sherry Tongshuang Wu, cs.cmu.edu/~sherryw | Top nav, theme cards, paper rows | Nine highlights grouped by theme, venue and year bold | Code links per paper | Theme cards pairing the question with the approach; selected-vs-all split |
| 7 | Emma Strubell, strubell.github.io | Jekyll template, four nav items | Own page | One item | Availability notice; clear nav |
| 8 | Diyi Yang, cs.stanford.edu/~diyiy | Plain text, four nav links | Own page | "Recent Projects": seven named themes, each with named systems | Short bio; work grouped by theme with named items |
| 9 | Percy Liang, cs.stanford.edu/~pliang | Minimal text | Sends readers to Google Scholar | Two platforms in prose | First-person statement of values and open questions |
| 10 | Michael Bernstein, hci.stanford.edu/msb | Single page: pitch, bio, highlights, all papers | Two highlights, then full list; award tags; project-site links | Via project sites | One-paragraph research pitch before credentials; two-tier list |
| 11 | Danqi Chen, cs.princeton.edu/~danqic | Single short page | Own page | No | Three identity lines; pronunciation aid |
| 12 | Jacob Andreas, mit.edu/~jda | Single page, slash nav | Three themed lists, venue + year | No | Bold one-sentence research statement first |
| 13 | Andrew Head, andrewhead.info | Single page, anchor nav | One reverse-chronological list with `[pdf] [code] [video]` | Code links | Consistent bracketed text links per entry |
| 14 | Amy X. Zhang, homes.cs.washington.edu/~axz | Single page, text nav | "Latest publications" block | "Code" page | Short bio; plain nav labels |

Typography seen in markup: system sans stacks at 720–900 px content width (1), unstyled browser defaults (8, 9, 10). No site uses a display face larger than about 2.5 rem for the name.

## Patterns worth adopting

1. **Statement before credentials** (12, 10). One sentence on what the person builds or studies, then affiliation. The reader learns the work before the résumé.
2. **Small identity block** (4, 8, 11, 14). Name, one role line, three to five links with visible text labels. Name size is modest; the content carries the page.
3. **Work grouped and named** (6, 8, 12). Each item has a name and a one-line description; groups have headings a scanner can read alone.
4. **Two tiers: highlights on the home page, the full list one click away** (10, 6). Keeps the entry page short and signals curation.
5. **One entry format, repeated exactly** (13, 10, 1). Title, then venue/date, then a row of text links that only lists links that exist. Repetition is what makes a long list scannable.
6. **Dates and status in a fixed position** (1, 10). Right-aligned or in a meta column, tabular figures, never mixed into the prose.
7. **Restraint: one column of 640–900 px, one accent, plain sans or serif** (1, 8, 10). Professional comes from measure and spacing, not decoration.
8. **Short nav of plain nouns** (1, 4, 14). Four to six labels that name what is behind them.
9. **Availability in one visible line near the top** (7). The most actionable fact for a visitor.
10. **Static HTML that renders without scripts; a last-updated date** (1, 7, 11). The worst failures seen were client-side rendering problems.

## Anti-patterns seen (unattributed)

1. Template residue shown to readers: literal template variables, "Hello World!", dead `#` links, leaked "Toggle navigation", empty section headings.
2. A news feed or activity log as the main content, pushing identity and work below the fold.
3. Icon-only links with no text label or alt text.
4. Biography walls of 150+ words with the actionable line at the end.
5. Trivia given as much space as the research.
6. Stale signals: lists that stop a year before the news, last-updated older than the newest entry, retired social networks.
