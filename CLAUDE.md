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

## Current Pages in Repo
- index.html, index2.html, index3.html — Home page versions
- pricing2.html — Pricing page
- compare2.html, compare3.html — Comparison pages
- equipment.html, equipment2.html — Equipment page
- faq2.html — FAQ page
- squirrel.html, squirrel2.html, squirrel3.html — About/mascot pages
- come2.html — Come to us page
- terms.html — Terms of service
- privacy.html — Privacy policy
- release.html — Photo release form
- css/ — Stylesheets
- js/ — JavaScript
- img/ — Images
- squirrels/ — Squirrel images
- includes/ — Shared HTML includes
- CNAME — Custom domain config
