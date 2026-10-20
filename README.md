# Anatomy of Civilization

An open-source, evidence-driven historical atlas of institutions, power networks, family ties, economic systems, wars and competing explanations.

## Status

- **V0.1 merged:** working static research atlas with East India Company and 1953 Iran coup case studies.
- **V0.2 under review:** linked archival sources, claim/source verification, uncertainty-aware dates, a first documented family-network example, and automated integrity checks.
- **Research disclaimer:** linked source/locator reviewed does not mean independently peer-reviewed or comprehensively verified. Some interpretations still rely on bibliographic-only leads.

## Explore locally

Serve the repository root (opening `index.html` directly can block JSON fetches):

```sh
python3 -m http.server 8000  # then visit http://localhost:8000
node scripts/validate.js
```

No npm dependencies or build step.

## Research data

The `data/` directory has versioned JSON records: `sources`, `events`, `entities`, `relationships`, `cases`, and `systems`. All records use stable IDs. The evidence library lists source links, locators and review flags.

- **Epistemic classification:** `documented`, `supported interpretation`, `interpretation`, `unresolved`, `speculation`.
- **Source review:** separate `reviewed` / `pending` labels; unreviewed interpretive links are not shown as established graph edges.
- **Historical dates:** only known precision, using `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.
- **Family networks:** kinship is a relationship type, not an inference of coordinated action.

## Project standards and first audit

- [Evidence standard](methodology/EVIDENCE_STANDARD.md)
- [Family and intergenerational network rules](methodology/FAMILY_NETWORKS.md)
- [October 2026 historical audit and open questions](research/audit-2026-10-19.md)

We welcome source corrections, alternative documented perspectives, and challenges to causal interpretations. This project researches mechanisms of power; it is not an allegation that all elites or institutions share a secret plan.

## Development priorities

1. Extend the primary-source audit with page and passage level citations and perspectives from affected populations.
2. Improve family/dynasty and institutional networks with filtering.
3. Build interactive location timelines and robust provenance-aware search.
4. Set up static public deployment once the basic research quality gate is satisfied.
