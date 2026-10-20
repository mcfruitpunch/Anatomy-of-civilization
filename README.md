# Anatomy of Civilization

An open-source, evidence-driven historical atlas of people, families, institutions, trade, war, finance and competing explanations.

## Explore the atlas

The static website is at `index.html`. Its V0.3 explorer includes:

- **Timeline:** case, text and year filters; select an event to open sources and its **explicitly linked** historical actors.
- **Power networks:** click or keyboard-focus nodes; inspect an entity and its sourced connections. Filter for kinship, institutional roles or other connections.
- **Evidence transparency:** documented/source-reviewed records are distinct from proposed or bibliographic-only material. By default, only source-reviewed documented links appear in the interactive graph; uncheck the filter to inspect labeled pending connections.
- **Case studies:** narrative, decision-making, consequences, competing interpretations and original source links.
- **Accessible navigation:** textual relationship list, keyboard-controlled graph nodes, responsive layout and reduced-motion support.

A family connection **never** establishes shared motives or culpability.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
node scripts/validate.js
node --check site/app.js
node scripts/test-explorer.js
```

No build step, JavaScript packages or external frontend dependencies. Opening the HTML file directly may block JSON loading due to browser security restrictions.

## Publish with GitHub Pages

A deployment workflow exists at `.github/workflows/pages.yml`. **Repository administrators must first enable GitHub Pages**:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. In **Actions**, run the **Publish research atlas** workflow if the latest main-branch push already occurred (or push a new commit to main).
4. Check the `deploy` job's green result and the actual Pages URL displayed by GitHub before sharing the website.

When enabled, the expected *format* is `https://mcfruitpunch.github.io/Anatomy-of-civilization/`; this is **not** a verified live link until deployment succeeds. GitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The workflow validates records and browser JS, uploads only `index.html`, `site/` and `data/`, and deploys from the main branch. Pull requests never deploy directly.

## Data model

Research data lives in `data/`: `sources`, `events`, `entities`, `relationships`, `cases`, `systems`. Stable IDs are required.

- Documented records must cite a reviewed source with a URL and locator.
- Epistemic status and source-review status are kept separate.
- Each timeline event links to the people and institutions explicitly identified in that event; generic case association is not automatically a participant claim.
- Dates in the current schema accept `YYYY`, `YYYY-MM`, `YYYY-MM-DD`, preserving known precision. **BCE/ancient and approximate date support is planned rather than silently approximated.**
- Kinship, official positions, finance, communications and influence each require separately labeled relationships.

## Research methodology and roadmap

- [Evidence standard](methodology/EVIDENCE_STANDARD.md)
- [Family and intergenerational network rules](methodology/FAMILY_NETWORKS.md)
- [Historical evidence audit](research/audit-2026-10-19.md)
- [Research expansion and representation plan](research/ROADMAP.md)

Current case studies: the British East India Company and the 1953 Iranian coup. This is an evolving research interface, **not** a completed or peer-reviewed history of either event. We invite corrections and perspectives from affected communities, and will not infer guilt from ancestry, ethnicity, religion or membership.
