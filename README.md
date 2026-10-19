# Anatomy of Civilization
An open-source, evidence-driven atlas exploring the history of global power, institutions, influential families, economic systems, warfare, and ideology through interconnected timelines, historical research, network maps, and verifiable sources.

## Status
Initial milestone: a static research atlas with two foundational case studies — the **British East India Company** and the **1953 Iranian coup**.

## Run
No build step. Serve the repository root and open it in a browser:

```
python3 -m http.server 8000   # then visit http://localhost:8000
node scripts/validate.js      # check data integrity
```

## Research database (`data/`)
JSON records with unique ids: `sources`, `events`, `entities`, `relationships`, `cases`, `systems`.
Every event, relationship and interpretation must cite `sources` ids. Status values: `documented`, `interpretation`, `supported interpretation`, `unresolved`, `speculation`.

## Principles
Political independence, accuracy, transparency, source verification. Never infer culpability from ancestry, ethnicity, religion, or membership alone; a powerful relationship is not assumed to be wrongdoing.
