# Floating MeeTwo and content corrections (T-0024)

## Intent
Make MeeTwo easy to find: a launcher in the corner of every page that opens the existing chat. Correct site content per Mingxi: neutral framing for graduate-school and job audiences, concrete roles, and a complete list of ongoing projects with GitHub links for public repos.

## Decisions
- Launcher on every page except `/meetwo`, which is the full page. Static JS only: GitHub Pages serves it and no domain is needed. Router, 2026-11-06.
- The panel reuses `MeeTwoChat` unchanged in its API calls, retention line and fallback. The only change to the chat is persistence. Router, 2026-11-06.
- Conversation (last 10 turns and `conversationId`) and the open/closed state live in `sessionStorage` (`meetwo:v1`, `meetwo:open`), so they survive navigation, including to `/meetwo`, and end with the browser tab. Worker.
- The inline chat on `/work` is removed; the launcher replaces it, so two chats never show on one page. `/work#meetwo` keeps its links. Worker.
- Mobile: the button shrinks to a round mark and `body` gets 4rem bottom padding at 640px and below, so the footer is never covered. An open panel is the visitor's choice and closes to the button. Worker.
- The launcher renders only when `PUBLIC_STANDIN_URL` is set. Worker.
- Golfie status is `active`. Seeking-roles text replaced by "Focus: AI systems and infrastructure." (home) and the heading "Get in touch" (about). "NLP lead" removed from the Work role title, the Work bullet and the home tile. Mingxi, 2026-11-06 (via Router).
- Added Agent Relay (public, repo linked) from its README and description. Added "Agent Workspace" as a `title` entry with "Repository: coming soon": `PittsIrv/agentic-workstation` does not exist on GitHub yet. Its one line comes from the private inventory's "Workspace for personal AI tooling". Router, 2026-11-06.
- Repository links checked with `gh repo view`: public are agent-relay, daybook and brawl-lab-public (linked); Golfie, standin (MeeTwo), table-forty-nine and dealer-s-choice are private (no repo link). Mingxi, 2026-11-06.

## Intuitions and rejected alternatives
- Rejected: keeping the Work page chat beside the launcher (two states for one conversation).
- Open question for Mingxi: "every other ongoing side project" was read as the projects they named plus those already `active`. Daybook, Brawl Lab and Dealer's Choice stay `shipped`; held entries stay held. The Agent Workspace blurb is minimal and needs Mingxi's text.

## How to verify
Open any page, click "Ask MeeTwo" (bottom-right), ask a question, close it, open another page: the button returns and the panel keeps the conversation. At 375px the footer stays clear of the button. `/projects`: Golfie under Active, Agent Relay with a Repository link, Agent Workspace with "Repository: coming soon", Brawl Lab with Site and Repository.

## Revisit when
`PittsIrv/agentic-workstation` becomes public (replace `comingSoon` with a `repo` link), or 2026-12-01.
