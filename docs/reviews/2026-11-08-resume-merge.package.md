# Project
# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games), except the projects gallery, which reads `src/data/projects.json` (see `docs/projects-gallery.md`); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

## Implementation workflow

Mingxi owns the design; Claude implements directly (the earlier Codex-as-worker workflow is retired). Claude reviews its own diff against the spec and voice principles and runs `npm run build` before committing.

**Commits:** Mingxi is the author. Every commit Claude makes ends with a `Co-Authored-By: Claude …` trailer. Never make Claude the author.

Active design spec: `docs/superpowers/specs/2026-09-08-professional-restructure-design.md` (supersedes the 2026-07-17 editorial redesign spec).

# Decision record
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

# Diff
```diff
diff --git a/docs/decisions/2026-11-08-resume-merge.md b/docs/decisions/2026-11-08-resume-merge.md
new file mode 100644
index 0000000..cec2a50
--- /dev/null
+++ b/docs/decisions/2026-11-08-resume-merge.md
@@ -0,0 +1,82 @@
+# Work and Projects merged from the two resumes (T-0069)
+
+Date: 2026-11-08. Worker: T-0069.
+
+## Intent
+
+Mingxi (2026-11-08): "Those are my two resumes for different targeting roles. Change my website's relevant parts. If two experience are framing differently, combine all the skills from my different resume." /work and /projects now carry one entry per experience, merging the AI-engineer (AIE) and software-engineer (SWE) resume wording, and the Skills section lists the union of both resumes' skills.
+
+## Decisions
+
+| What | Who | Why |
+|---|---|---|
+| One entry per experience; bullets merge both framings, tags are the union of both resumes plus the site's existing tags | Mingxi | Their words above. |
+| Skills = union of both resumes' skill lines, de-duplicated; the site's own extras ("Context management", "Heuristic search") kept | Mingxi (all skills) / Worker (keep extras) | Mingxi asked for all of them; removing site content was not asked. |
+| "Backend & infrastructure" split into "Web & backend" and "Cloud & DevOps"; new group "AI-assisted development" | Worker | Frontend frameworks do not belong under a "Backend" label, and the coding-tool line (Claude Code, Codex, Cursor, …) fits no existing group. Other groups keep their names. |
+| AlpSoft promoted from a one-line "Also" item to a full entry | Worker | The SWE resume gives it three substantive bullets; a one-liner would drop them. Placed by end date, between Chimps Lab and Enterview. |
+| Tsinghua org renamed "ModelBest, THUNLP Lab, Tsinghua University" (was "Tsinghua University, THUNLP — OpenBMB") | Worker | Resume wording; only the AIE resume has this item. |
+| Work intro states both resume summaries as labels | Worker | It is the section header for exactly this content. Home and About positioning left alone. |
+| Conflicting facts not changed (list below) | Rule | The brief: where the resumes disagree, stop and report. |
+| Site content absent from both resumes kept (TA, ProtectPT, PersonaTeaming Playground practitioner study, coursework, other projects) | Worker | Removal was not asked. |
+| `public/resume.pdf` not replaced | Rule | Replacing it is Mingxi's call. |
+
+## Stopped on (for the Router / Mingxi)
+
+1. **Chimps Lab title.** AIE: "Research Assistant". SWE: "Research Engineer". Site keeps "Research Assistant".
+2. **MS program name.** AIE: "Language Technologies (Artificial Intelligence)". SWE: "Language Technologies (School of Computer Science)". Site keeps "(Artificial Intelligence)".
+3. **Startup name.** AIE: "Enterview". SWE: "Enterview.ai". Site keeps "Enterview".
+4. **Poker paper term** (site vs AIE resume, not resume vs resume). Site: "Spring 2026". AIE: "Jan 2025 – May 2025". Unchanged.
+5. **Dealer's Choice period** (site vs SWE). SWE: "Jun 2025 – Jun 2026". Site: 2025-06 to now. Unchanged.
+6. **Hosted resume.** `public/resume.pdf` is an older version (no AlpSoft, no projects) and shows a phone number on the public site.
+7. **Names.** The poker paper's meta line names two co-authors; no resume has an author list for it, so there is nothing to check them against. Unchanged.
+
+## Mapping (every changed line → source)
+
+| Site line | Source |
+|---|---|
+| Work intro, first sentence | AIE Summary ("Agents, LLM applications, evaluation, and retrieval") |
+| Work intro, second sentence | SWE Summary ("full-stack web apps, REST APIs, real-time systems, data pipelines, and cloud infrastructure") |
+| TikTok org "San Jose, CA" | SWE header |
+| TikTok lead | AIE bullet 2 + SWE bullet 1 (search service), AIE bullet 3 (copilot) |
+| TikTok bullet 1 (search service, SQLite graph, RRF, +23%) | AIE bullet 2 + SWE bullet 1 |
+| TikTok bullet 2 (lookup API verification) | SWE bullet 2 |
+| TikTok bullet 3 (regression benchmark, internal published skill) | AIE bullet 1 + SWE bullet 2 |
+| TikTok bullet 4 (revenue-diagnosis copilot, scheduled pipeline) | AIE bullet 3 + SWE bullet 3 |
+| TikTok bullet 5 (adopted by operations) | AIE bullet 3 + SWE bullet 3 |
+| TikTok tags Hive, SQLite, Data pipelines, Skills | SWE bullets 1, 3; AIE bullet 1 |
+| Sapling bullets 1–4 | AIE Sapling bullets 1–2 ("Manuscript in preparation" kept from the site) |
+| Sapling tags Human study, Model distillation, AI safety | AIE Sapling bullets |
+| Chimps lead, bullet 3 (red-teaming pipeline and interface) | SWE Chimps bullet 3 + existing site line |
+| Chimps bullet 4 (React/Django platform) | SWE Chimps bullet 1 |
+| Chimps bullet 5 (bounded batching, 100 images) | AIE Chimps bullet 2 + SWE Chimps bullet 2 |
+| Chimps tags Django, PostgreSQL, REST APIs, Data visualization | SWE Chimps bullet 1 |
+| Enterview bullet 1 ("partnering on technical product decisions") | AIE Enterview bullet 1 (replaces the site's "owned") |
+| Enterview bullet 2 | AIE bullet 2 + SWE bullet 2 |
+| Enterview bullet 3 | SWE bullet 2 |
+| Enterview tags React, Django, PostgreSQL, Redis, Docker, Azure, REST APIs, LLM APIs | SWE bullets 1–2 |
+| AlpSoft lead, bullets 1–3, tags | SWE AlpSoft bullets 1–3 |
+| Tsinghua org and lead | AIE ModelBest bullets 1–2 |
+| Skills: Go, HTML, CSS, Prompt engineering, System design | SWE Languages, Engineering |
+| Skills: Web applications | AIE Programming |
+| Skills: Agent memory, Agentic RL, Agent safety | AIE Agents ("Agenti RAG" typo fixed to "Agentic RAG") |
+| Skills: MySQL, Redis, MongoDB, Hive, Spark SQL, Django ORM, Supabase | SWE Databases & Data |
+| Skills: Search, DataOps | AIE Data |
+| Skills: Web & backend group | SWE Web & Backend, Engineering (REST APIs, WebSockets, Microservices, RBAC) |
+| Skills: Cloud & DevOps group | SWE Cloud & DevOps, Engineering (CI/CD, Git, Linux, Agile); AIE Data (Docker, AWS) |
+| Skills: AI-assisted development group | SWE AI-Assisted Development (MCP, Skills already under Agents) |
+| Dealer's Choice "did" lines and tags | SWE Dealer's Choice bullets 1–3 and stack line |
+| Golfie first "did" line, tags TypeScript, Docker | SWE Golfie bullet 1 and stack line |
+
+## Intuitions and rejected alternatives
+
+- Keeping each resume's framing as separate entries: Mingxi asked for one entry with both.
+- Rewriting bullets into new prose: the brief says trim, don't rewrite; wording stays the resumes'.
+- Seven skills groups in a two-column grid leaves the last row half full; accepted over a 30-item "Backend & infrastructure" group.
+
+## How to verify
+
+Open https://pittsirv.github.io/work. Experience shows TikTok, Sapling Lab, Chimps Lab, AlpSoft, Enterview; open "Details" on each. TikTok mentions the lookup API and "Improved accuracy by 23%"; AlpSoft has three bullets. "Also" lists the ModelBest internship. Skills has seven groups ending with "AI-assisted development". Open /projects: Dealer's Choice mentions the Vercel migration and AI-assisted workflow; Golfie starts with "Full-stack app for swing video upload".
+
+## Revisit when
+
+Mingxi settles the items under "Stopped on", or either resume changes.
diff --git a/docs/whats-new.md b/docs/whats-new.md
index b0d776e..5a886d7 100644
--- a/docs/whats-new.md
+++ b/docs/whats-new.md
@@ -1,5 +1,9 @@
 # What's new
 
+## 2026-11-08 · Work page matches both resumes
+Try: open /work, click "Details" under TikTok and AlpSoft, scroll to Skills; open /projects and read Dealer's Choice and Golfie.
+You get: one entry per job that combines your AI-engineer and software-engineer resume wording, AlpSoft as a full entry, and every skill from both resumes in seven groups. Where the resumes disagree (your Chimps Lab title, the MS program name, the startup name), the site keeps its old wording until you pick.
+
 ## 2026-11-07 · Follow your writing, and keep reading
 Try: open /poems/adventure and click "Next"; open /articles/monologue; add /rss.xml to a feed reader.
 You get: previous and next links at the end of every poem and article, an RSS and an Atom feed that pick up new poems and articles by themselves, an "RSS" link in every footer, and a reading time worked out from the article's text (Monologue now reads 6 min, not the 8 min you typed).
diff --git a/src/data/projects.json b/src/data/projects.json
index 08fc5c6..8e3470b 100644
--- a/src/data/projects.json
+++ b/src/data/projects.json
@@ -91,6 +91,7 @@
       "end": "now"
     },
     "did": [
+      "Full-stack app for swing video upload and in-browser recording, with a coach review queue and scheduling.",
       "Three-phase pipeline: pose estimation, rule-based fault detection across five swing phases, LLM-generated drill plan.",
       "Per-video pose tiers, from RTMPose on CPU to GPU models on Modal.",
       "Coarse pass to locate the swing, then a dense pass at native frame rate to capture impact."
@@ -102,9 +103,11 @@
       "Python",
       "FastAPI",
       "Next.js",
+      "TypeScript",
       "RTMPose",
       "ONNX Runtime",
-      "Modal"
+      "Modal",
+      "Docker"
     ],
     "visibility": "public"
   },
@@ -166,8 +169,9 @@
       "end": "now"
     },
     "did": [
-      "Custom variants with real-time multiplayer over WebSocket.",
-      "ECS in private subnets behind a public ALB; CI/CD for testing and deployment."
+      "House game variants (self-created), private rooms, chat, account authentication, and bot opponents, with table state in sync for every player in real time over WebSockets.",
+      "Originally Dockerized on AWS ECS in private subnets behind a public ALB; migrated to Vercel to cut infrastructure costs. Automated CI/CD.",
+      "Built with AI-assisted workflows (Claude Code and Codex): plan, specs, and tests; agent-written code; human-in-the-loop review."
     ],
     "links": {
       "site": "https://dealer-s-choice.vercel.app/",
@@ -176,8 +180,11 @@
     "tags": [
       "TypeScript",
       "NestJS",
+      "Next.js",
       "WebSocket",
       "AWS ECS",
+      "Docker",
+      "Vercel",
       "CI/CD"
     ],
     "visibility": "public"
diff --git a/src/data/work.json b/src/data/work.json
index c2cdfa5..aab5faf 100644
--- a/src/data/work.json
+++ b/src/data/work.json
@@ -1,5 +1,5 @@
 {
-  "intro": "AI systems and infrastructure: retrieval, evaluation, agents, and data pipelines.",
+  "intro": "AI engineering and research: agents, LLM applications, evaluation, and retrieval. Software engineering: full-stack web apps, REST APIs, real-time systems, data pipelines, and cloud infrastructure.",
   "meetwo": "Personal agent that answers as you and discloses only approved information.",
   "education": [
     {
@@ -25,25 +25,30 @@
   "experience": [
     {
       "role": "Data Engineer Intern",
-      "org": "TikTok, San Jose",
+      "org": "TikTok, San Jose, CA",
       "id": "tiktok",
       "dates": "June – August 2026",
-      "lead": "Enterprise retrieval for internal AI agents; livestream revenue-diagnosis copilot.",
+      "lead": "Enterprise search service and retrieval skill for internal AI agents; livestream revenue-diagnosis copilot.",
       "bullets": [
-        "Designed a graph-based enterprise retrieval skill over Hive tables, datasets, dashboards, documents, and millions of metadata fields and values, using query decomposition, contextual rewriting, graph expansion, and reciprocal rank fusion (RRF).",
-        "Built a benchmark from on-call Q&A pairs to evaluate agent results. The skill was integrated and published as an internal skill.",
-        "Built a livestream revenue-diagnosis copilot: LightGBM percentile prediction, comparison cohorts, and business rules flag revenue drops and abnormal metrics; retrieved business documentation grounds the recommendations.",
-        "Validated with operations stakeholders and integrated into their workflow."
+        "Led design and implementation of a graph-based enterprise search service and retrieval skill over Hive tables, datasets, dashboards, and documents, indexing millions of metadata fields and values in an embedded SQLite graph with query decomposition, contextual rewriting, graph expansion, and reciprocal rank fusion (RRF). Improved accuracy by 23%.",
+        "Built the service’s lookup API to return data-source IDs only after verifying each candidate against internal metadata APIs.",
+        "Built a regression benchmark from on-call Q&A pairs to evaluate agent results and catch quality regressions. Shipped as an internal published skill.",
+        "Built a livestream revenue-diagnosis copilot and scheduled data pipeline: feature engineering, SQL, LightGBM percentile prediction, comparison cohorts, and business rules detect revenue drops and abnormal metrics; retrieved business documentation grounds the recommendations.",
+        "Validated with operations stakeholders and adopted into the operations team’s daily workflow."
       ],
       "tags": [
         "Python",
         "SQL",
+        "Hive",
+        "SQLite",
         "Graph retrieval",
         "Query rewriting",
         "RRF",
         "LightGBM",
         "Feature engineering",
-        "LLM agents"
+        "Data pipelines",
+        "LLM agents",
+        "Skills"
       ]
     },
     {
@@ -53,15 +58,19 @@
       "dates": "May 2026 – Present",
       "lead": "Theory-of-Mind attribution toward AI in long-term interaction.",
       "bullets": [
-        "Research on an NSF- and OpenAI-funded interdisciplinary project.",
-        "Developing a multi-turn user simulation that varies user traits, assistant social behavior, memory, and scenario.",
-        "Developing turn-level LLM judges and heuristic measures to evaluate how attributions change across a conversation. Manuscript in preparation."
+        "Led NLP research for an NSF- and OpenAI-funded interdisciplinary AI safety project on how users form and update Theory-of-Mind attributions toward AI during long-term human–AI interaction.",
+        "Designed, conducted, and analyzed data from a human study.",
+        "Developed a multi-turn user simulation that varies user traits, assistant social behavior, memory, and scenario.",
+        "Created a human-calibrated LLM judge and distilled a cheap, fast decision model for online evaluation. Manuscript in preparation."
       ],
       "tags": [
         "User simulation",
+        "Human study",
         "Multi-turn evaluation",
         "LLM-as-judge",
+        "Model distillation",
         "Measurement design",
+        "AI safety",
         "Python"
       ]
     },
@@ -69,56 +78,84 @@
       "role": "Research Assistant",
       "org": "Chimps Lab, CMU",
       "dates": "May 2024 – May 2026",
-      "lead": "LLM red-teaming and image-generation bias auditing.",
+      "lead": "LLM red-teaming, image-generation bias auditing, and a research web platform.",
       "bullets": [
         "PersonaTeaming (UIST 2026, with Apple Research): designed the persona-generation algorithm for adaptive LLM red-teaming.",
         "Evaluated 11 experimental conditions on 6 target LLMs. Improved mean attack success rate by 46% and attack diversity by 7% over the RainbowPlus baseline.",
-        "Built and deployed the PersonaTeaming Playground on AWS, used in an industry practitioner study.",
-        "Built bias-auditing infrastructure for image generation: persistent history, caching, and batching at 100 images per prompt, with interactive visualizations."
+        "Built and deployed an automated red-teaming pipeline and interface, the PersonaTeaming Playground on AWS, used in an industry practitioner study.",
+        "Engineered and maintained a React/Django web platform used by researchers and study participants, with PostgreSQL-backed audit history, caching, REST APIs, Python data workflows, and interactive data visualizations.",
+        "Built image-generation bias-auditing infrastructure; reworked execution with bounded batching to support requests of up to 100 images, eliminating timeout failures on large requests and improving end-to-end throughput."
       ],
       "tags": [
         "Python",
         "React",
+        "Django",
+        "PostgreSQL",
+        "REST APIs",
         "AWS",
+        "Data visualization",
         "LLM red-teaming",
         "Evaluation pipelines",
         "LLM-as-judge",
         "AI safety"
       ]
     },
+    {
+      "role": "Software Engineer Intern",
+      "org": "AlpSoft, Singapore",
+      "dates": "May 2025 – August 2025",
+      "lead": "Production platform for Enterprise Singapore; security hardening, real-time chat, and AWS deployments.",
+      "bullets": [
+        "Built and maintained a production Next.js/React and TypeScript platform for Enterprise Singapore: backend REST APIs, MySQL-backed features, authentication, RBAC, and AWS deployments via Terraform and CI/CD pipelines.",
+        "Redesigned API trust boundaries to move sensitive configuration behind server-side endpoints and tighten authorization, resolving penetration-test findings and passing the client’s follow-up security validation.",
+        "Shipped a WebSocket-based real-time chat system after an external messaging dependency became unavailable, owning frontend state, backend message handling, database persistence, deployment, and production debugging."
+      ],
+      "tags": [
+        "TypeScript",
+        "Next.js",
+        "React",
+        "MySQL",
+        "REST APIs",
+        "Authentication",
+        "RBAC",
+        "AWS",
+        "Terraform",
+        "CI/CD",
+        "WebSocket"
+      ],
+      "id": "alpsoft"
+    },
     {
       "role": "Full Stack Engineer & Tech Lead",
       "org": "Enterview (AI startup), Pittsburgh, PA",
       "dates": "June 2023 – November 2024",
       "lead": "AI interview-preparation platform.",
       "bullets": [
-        "Led a team of four engineers; owned technical product decisions.",
-        "Designed user-context data models and backend APIs, integrating an LLM and speech recognition to evaluate spoken answers.",
-        "Reduced feedback latency by optimizing WebSocket handling."
+        "Led a four-engineer team building an AI interview-preparation platform while partnering on technical product decisions.",
+        "Designed persistent user-context data models and backend REST APIs for personalized interview coaching; integrated an LLM and a speech recognition model to score spoken answers and generate targeted feedback.",
+        "Reduced feedback latency by optimizing WebSocket message handling."
       ],
       "tags": [
         "TypeScript",
-        "Backend APIs",
+        "React",
+        "Django",
+        "PostgreSQL",
+        "Redis",
+        "Docker",
+        "Azure",
+        "REST APIs",
         "Data modeling",
         "Speech recognition",
+        "LLM APIs",
         "WebSocket"
       ]
     },
-    {
-      "role": "Software Engineer Intern",
-      "compact": true,
-      "org": "AlpSoft, Singapore",
-      "dates": "May 2025 – August 2025",
-      "lead": "Enterprise sites for EnterpriseSG; penetration-test fixes and AWS deployments.",
-      "bullets": [],
-      "tags": []
-    },
     {
       "role": "Research Intern",
       "compact": true,
-      "org": "Tsinghua University, THUNLP — OpenBMB",
+      "org": "ModelBest, THUNLP Lab, Tsinghua University",
       "dates": "May 2023 – August 2023",
-      "lead": "REST APIs as LLM-callable tools; embedding-based clustering for tool retrieval.",
+      "lead": "REST APIs as LLM-callable tools with searchable metadata and instructions; tool-invocation tests; embedding-based clustering for tool retrieval.",
       "bullets": [],
       "tags": []
     },
@@ -176,9 +213,15 @@
         "C",
         "JavaScript",
         "TypeScript",
+        "Go",
+        "HTML",
+        "CSS",
+        "Prompt engineering",
         "Data structures",
         "Database design",
-        "Distributed systems"
+        "Distributed systems",
+        "System design",
+        "Web applications"
       ]
     },
     {
@@ -198,12 +241,15 @@
     {
       "group": "Agents",
       "items": [
-        "Agentic RAG",
         "Agentic search",
+        "Agent memory",
+        "Agentic RAG",
+        "Agentic RL",
         "Tool use",
         "LLM evaluation",
         "Skills",
         "MCP",
+        "Agent safety",
         "Context management"
       ]
     },
@@ -211,24 +257,68 @@
       "group": "Data",
       "items": [
         "PostgreSQL",
+        "MySQL",
         "SQLite",
+        "Redis",
+        "MongoDB",
+        "Hive",
+        "Spark SQL",
+        "Django ORM",
+        "Supabase",
+        "Search",
         "Feature engineering",
         "Data pipelines",
         "Information retrieval",
+        "DataOps",
         "Heuristic search"
       ]
     },
     {
-      "group": "Backend & infrastructure",
+      "group": "Web & backend",
       "items": [
-        "FastAPI",
+        "React",
+        "Next.js",
+        "Redux",
+        "Tailwind CSS",
+        "Node.js",
         "NestJS",
+        "Express",
+        "Django",
+        "FastAPI",
+        "Flask",
         "REST APIs",
-        "WebSocket",
+        "WebSockets",
+        "Microservices",
+        "RBAC"
+      ]
+    },
+    {
+      "group": "Cloud & DevOps",
+      "items": [
+        "AWS (ECS, EC2, S3, ALB, VPC)",
+        "Azure",
+        "Vercel",
+        "Modal",
         "Docker",
-        "AWS (EC2, ECS)",
+        "Kubernetes",
         "Terraform",
-        "CI/CD"
+        "GitHub Actions",
+        "CI/CD",
+        "Git",
+        "Linux",
+        "Agile"
+      ]
+    },
+    {
+      "group": "AI-assisted development",
+      "items": [
+        "Claude Code",
+        "Claude Cowork",
+        "Codex",
+        "Cursor",
+        "Muse",
+        "LLM APIs",
+        "Agentic workflows"
       ]
     }
   ],
```

Reviewer sees only this package.
