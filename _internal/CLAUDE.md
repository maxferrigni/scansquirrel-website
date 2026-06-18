# CLAUDE.md — ScanSquirrel Website Repository

## Repository
- GitHub: https://github.com/maxferrigni/scansquirrel-website
- Local clone: ~/Projects/scansquirrel-website/
- Owner: Max Ferrigni (maxferrigni)

## Workflow
1. Max pastes HTML page content into the chat.
2. He specifies which file it goes to (e.g., index2.html, pricing2.html).
3. Claude writes the content to that file in the local repo.
4. Claude immediately commits and pushes to GitHub — no confirmation needed.
5. If Max doesn't specify a filename, ask or infer from the content.

## Rules
- Push every page update immediately after writing it.
- Use clear commit messages (e.g., "Update index2.html", "Add new faq page").
- Do not ask for confirmation before pushing — just do it.
- Do not ask Max to run terminal commands — handle everything directly.
- Keep the repo clean — no temp files, no unnecessary changes.

## Site Structure (current — keep this updated)
- `index.html` — Home. Hero: "Scan Your Items for About $200" + shoebox image; folds in the Neighborhoods/Squirrels grid as the dark section (`id="areas"`).
- `pricing.html` — Pricing. Third-person; prices framed as a GUIDELINE; each price is an agreed job worked out with the Squirrel before work starts (do NOT use the word "negotiable").
- `compare.html` — "3 ways to do this" comparison.
- `faq.html` — FAQ.
- `terms.html`, `privacy.html`, `release.html` — Legal.
- `squirrels/<territory>/index.html` — Territory pages (`pasadena`, `eastside-la`). The TOP of each (hero + "Let's connect") mirrors the others; everything from "About your <Territory> Squirrel" DOWN is bespoke per territory (future: different people per territory).
- `includes/nav.html` — Shared nav, fetched at runtime by `js/nav-loader.js`. Menu = Compare, FAQ, Pricing. (No "Squirrels" item — that hub was folded into the home page `#areas`.)
- `js/nav-loader.js` — Injects nav, rotating subtitle, and "captive territory" link rewriting: `?from=` param or `/squirrels/<t>/` path keeps visitors inside their territory. Home-anchor links (`/#...`) and `/` are rewritten to the territory home for captive visitors.
- `css/base.css`, `css/nav.css`, `css/territory.css` — Stylesheets.
- `img/map/*.jpg` — Territory map cards, compressed to ~200–250KB. Keep new ones small (sips JPEG ~q60–80).
- `_internal/old/` — Archived/retired pages (index2/3/4, the old squirrels.html hub, pricing2.html, v1/, etc.). NOT linked from the live site; keep out of SEO.

## Known Issues / Recurring Fixes (READ BEFORE DIAGNOSING)
### Mobile: fixed nav overlaps the first section (RECURRING — seen 3+ times)
- Symptom: on phones, the top of a page's first section/hero is cut off under the nav (e.g., only the bottom third of the H1 is visible).
- Cause: `nav#nav` is `position: fixed` (css/nav.css). On mobile it's ~90px tall (≈44px hamburger + padding; the rotating subtitle is hidden < 768px). Each page must give its FIRST section enough `padding-top` to sit below it.
- Fix / rule: in the page's mobile `@media` block, set the first section's `padding-top` to **≥ 7rem** (≈112px). `5.5rem` is too short and fails on real phones. Reference: `index.html` uses `6rem` (OK); territory pages use `4.5rem` (their layout adds extra top space).
- Already fixed: `compare.html`, `faq.html`, `pricing.html` bumped 5.5rem → 7rem (2026-06-18). 
- CHECKLIST for ANY new/edited page: at ~390px width, confirm the H1 clears the nav; if not, raise the first section's mobile `padding-top` to 7rem.
