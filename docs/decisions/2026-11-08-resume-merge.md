# Work and Projects merged from the two resumes (T-0069)

Date: 2026-11-08. Worker: T-0069.

## Intent

Mingxi (2026-11-08): "Those are my two resumes for different targeting roles. Change my website's relevant parts. If two experience are framing differently, combine all the skills from my different resume." /work and /projects now carry one entry per experience, merging the AI-engineer (AIE) and software-engineer (SWE) resume wording, and the Skills section lists the union of both resumes' skills.

## Decisions

| What | Who | Why |
|---|---|---|
| One entry per experience; bullets merge both framings, tags are the union of both resumes plus the site's existing tags | Mingxi | Their words above. |
| Skills = union of both resumes' skill lines, de-duplicated; the site's own extras ("Context management", "Heuristic search") kept | Mingxi (all skills) / Worker (keep extras) | Mingxi asked for all of them; removing site content was not asked. |
| "Backend & infrastructure" split into "Web & backend" and "Cloud & DevOps"; new group "AI-assisted development" | Worker | Frontend frameworks do not belong under a "Backend" label, and the coding-tool line (Claude Code, Codex, Cursor, …) fits no existing group. Other groups keep their names. |
| AlpSoft promoted from a one-line "Also" item to a full entry | Worker | The SWE resume gives it three substantive bullets; a one-liner would drop them. Placed by end date, between Chimps Lab and Enterview. |
| Tsinghua org renamed "ModelBest, THUNLP Lab, Tsinghua University" (was "Tsinghua University, THUNLP — OpenBMB") | Worker | Resume wording; only the AIE resume has this item. |
| Work intro states both resume summaries as labels | Worker | It is the section header for exactly this content. Home and About positioning left alone. |
| Conflicting facts not changed (list below) | Rule | The brief: where the resumes disagree, stop and report. |
| Site content absent from both resumes kept (TA, ProtectPT, PersonaTeaming Playground practitioner study, coursework, other projects) | Worker | Removal was not asked. |
| `public/resume.pdf` not replaced | Rule | Replacing it is Mingxi's call. |

## Stopped on (for the Router / Mingxi)

1. **Chimps Lab title.** AIE: "Research Assistant". SWE: "Research Engineer". Site keeps "Research Assistant".
2. **MS program name.** AIE: "Language Technologies (Artificial Intelligence)". SWE: "Language Technologies (School of Computer Science)". Site keeps "(Artificial Intelligence)".
3. **Startup name.** AIE: "Enterview". SWE: "Enterview.ai". Site keeps "Enterview".
4. **Poker paper term** (site vs AIE resume, not resume vs resume). Site: "Spring 2026". AIE: "Jan 2025 – May 2025". Unchanged.
5. **Dealer's Choice period** (site vs SWE). SWE: "Jun 2025 – Jun 2026". Site: 2025-06 to now. Unchanged.
6. **Hosted resume.** `public/resume.pdf` is an older version (no AlpSoft, no projects) and shows a phone number on the public site.
7. **Names.** The poker paper's meta line names two co-authors; no resume has an author list for it, so there is nothing to check them against. Unchanged.

## Mapping (every changed line → source)

| Site line | Source |
|---|---|
| Work intro, first sentence | AIE Summary ("Agents, LLM applications, evaluation, and retrieval") |
| Work intro, second sentence | SWE Summary ("full-stack web apps, REST APIs, real-time systems, data pipelines, and cloud infrastructure") |
| TikTok org "San Jose, CA" | SWE header |
| TikTok lead | AIE bullet 2 + SWE bullet 1 (search service), AIE bullet 3 (copilot) |
| TikTok bullet 1 (search service, SQLite graph, RRF, +23%) | AIE bullet 2 + SWE bullet 1 |
| TikTok bullet 2 (lookup API verification) | SWE bullet 2 |
| TikTok bullet 3 (regression benchmark, internal published skill) | AIE bullet 1 + SWE bullet 2 |
| TikTok bullet 4 (revenue-diagnosis copilot, scheduled pipeline) | AIE bullet 3 + SWE bullet 3 |
| TikTok bullet 5 (adopted by operations) | AIE bullet 3 + SWE bullet 3 |
| TikTok tags Hive, SQLite, Data pipelines, Skills | SWE bullets 1, 3; AIE bullet 1 |
| Sapling bullets 1–4 | AIE Sapling bullets 1–2 ("Manuscript in preparation" kept from the site) |
| Sapling tags Human study, Model distillation, AI safety | AIE Sapling bullets |
| Chimps lead, bullet 3 (red-teaming pipeline and interface) | SWE Chimps bullet 3 + existing site line |
| Chimps bullet 4 (React/Django platform) | SWE Chimps bullet 1 |
| Chimps bullet 5 (bounded batching, 100 images) | AIE Chimps bullet 2 + SWE Chimps bullet 2 |
| Chimps tags Django, PostgreSQL, REST APIs, Data visualization | SWE Chimps bullet 1 |
| Enterview bullet 1 ("partnering on technical product decisions") | AIE Enterview bullet 1 (replaces the site's "owned") |
| Enterview bullet 2 | AIE bullet 2 + SWE bullet 2 |
| Enterview bullet 3 | SWE bullet 2 |
| Enterview tags React, Django, PostgreSQL, Redis, Docker, Azure, REST APIs, LLM APIs | SWE bullets 1–2 |
| AlpSoft lead, bullets 1–3, tags | SWE AlpSoft bullets 1–3 |
| Tsinghua org and lead | AIE ModelBest bullets 1–2 |
| Skills: Go, HTML, CSS, Prompt engineering, System design | SWE Languages, Engineering |
| Skills: Web applications | AIE Programming |
| Skills: Agent memory, Agentic RL, Agent safety | AIE Agents ("Agenti RAG" typo fixed to "Agentic RAG") |
| Skills: MySQL, Redis, MongoDB, Hive, Spark SQL, Django ORM, Supabase | SWE Databases & Data |
| Skills: Search, DataOps | AIE Data |
| Skills: Web & backend group | SWE Web & Backend, Engineering (REST APIs, WebSockets, Microservices, RBAC) |
| Skills: Cloud & DevOps group | SWE Cloud & DevOps, Engineering (CI/CD, Git, Linux, Agile); AIE Data (Docker, AWS) |
| Skills: AI-assisted development group | SWE AI-Assisted Development (MCP, Skills already under Agents) |
| Dealer's Choice "did" lines and tags | SWE Dealer's Choice bullets 1–3 and stack line |
| Golfie first "did" line, tags TypeScript, Docker | SWE Golfie bullet 1 and stack line |

## Intuitions and rejected alternatives

- Keeping each resume's framing as separate entries: Mingxi asked for one entry with both.
- Rewriting bullets into new prose: the brief says trim, don't rewrite; wording stays the resumes'.
- Seven skills groups in a two-column grid leaves the last row half full; accepted over a 30-item "Backend & infrastructure" group.

## How to verify

Open https://pittsirv.github.io/work. Experience shows TikTok, Sapling Lab, Chimps Lab, AlpSoft, Enterview; open "Details" on each. TikTok mentions the lookup API and "Improved accuracy by 23%"; AlpSoft has three bullets. "Also" lists the ModelBest internship. Skills has seven groups ending with "AI-assisted development". Open /projects: Dealer's Choice mentions the Vercel migration and AI-assisted workflow; Golfie starts with "Full-stack app for swing video upload".

## Revisit when

Mingxi settles the items under "Stopped on", or either resume changes.
