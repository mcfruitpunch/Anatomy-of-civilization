# Anatomy of Civilization

An open-source, evidence-driven historical atlas of people, families, institutions, trade, war, finance and competing explanations.

## Explore the atlas

The static website is at `index.html`. Its V1.3 explorer includes:

- **Corporate retrocession & public debt:** distinguish a 23 January 1731 legal concession return, 24 February 1731 debt decree printed in 1733, May Council restructuring, and January 1732 royal asset handover; distinguish court award issuer from an unverified payer.
- **Colonial monopoly compensation:** a sourced 1732 29,000-French-livre legal award after the Choctaw-requested Youanis post challenged a French trade monopoly; the data model explicitly warns **the amount is not verified as paid**.
- **Census evidence audit:** distinguish two surviving copies of the 1721 New Orleans census and attributed published tabulations that disagree; no forced demographic total or unverified primary manuscript reading.
- **Indigenous-led diplomacy:** new Choctaw case tracing 1721–1730 negotiations, including French trading promises, Indigenous leverage and the distinction between Youanis and Fort Tombecbe.
- **Source readings:** dated Leydse Courant news reported via Yale's published translations and later historical reproductions of the 1721 New Orleans census; reported numbers remain distinct from verified transactions or independently transcribed original folios.
- **Original records & routes:** thirteen dated/archive-identified source items and six evidence-classified transnational information channels; every entry states whether original text, an institutional summary or only a catalogue was inspected.
- **Across borders:** French and British public-debt/banknote experiments compared side by side with citations and a strict distinction between intellectual influence and proven coordination.
- **Shared ownership:** separately displays published aggregate numbers of historical stock accounts in both the Bank and East India Company; accounts are not silently converted into named individuals or families.
- **Financial traces:** inspect financial records with explicit status labels (documented government loan, shareholding, subscription target, proposed agreement, existing-credit extension, French-livre policy target, or anticipated commission); link named beneficiaries and sources without converting a percentage offer into a payment.
- **Historical dominoes:** source-linked event-to-event connections with explicit policy response vs context vs interpretation labels. Cross-case links can be followed back to underlying documents.
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

Research data lives in `data/`: `sources`, `events`, `entities`, `relationships`, `cases`, `systems`, `dominoes`, `financial_flows`, `ownership_overlap`, `comparisons`, `archival_documents`, `information_routes`, `source_extracts`, `census_evidence_audit`. Stable IDs are required.

- Documented records must cite a reviewed source with a URL and locator.
- Epistemic status and source-review status are kept separate.
- Each timeline event links to the people and institutions explicitly identified in that event; generic case association is not automatically a participant claim.
- Dates in the current schema accept `YYYY`, `YYYY-MM`, `YYYY-MM-DD`, preserving known precision. **BCE/ancient and approximate date support is planned rather than silently approximated.**
- Kinship, official positions, finance, communications and influence each require separately labeled relationships.

## Research methodology and roadmap

- [Evidence standard](methodology/EVIDENCE_STANDARD.md)
- [Family and intergenerational network rules](methodology/FAMILY_NETWORKS.md)
- [Historical evidence audit](research/audit-2026-10-19.md)
- [V0.5 — Tea Act money, merchant patronage and Hutchinson family links](research/tea-act-money-and-family-networks-1766-1773.md)
- [V0.6 — Chartered finance, early Bank of England, rival East India firms and South Sea Bubble](research/chartered-capital-and-public-debt-1661-1722.md)
- [V0.7 — Shared ownership, the calico controversy, and unexecuted 1721 engraftment](research/shareholder-overlap-calico-engraftment-1719-1722.md)
- [V0.8 — John Law, Mississippi Bubble, French Louisiana and South Sea comparison](research/france-mississippi-bubble-cross-channel-1715-1720.md)
- [V0.9 — Original financial laws, Dutch market evidence, and Louisiana 1721 census and passenger records](research/original-letters-markets-louisiana-1716-1722.md)
- [V1.0 — Dated Dutch press reports and mediated readings of 1721 Louisiana census](research/v1-0-dutch-news-and-louisiana-source-readings.md)
- [V1.1 — Choctaw sovereign diplomacy, the Youanis post and 1721 New Orleans census source discrepancies](research/v1-1-choctaw-sovereignty-and-census-versions.md)
- [V1.2 — Choctaw trade, Mobile monopoly conflict, and 29,000-livre award](research/v1-2-choctaw-trade-monopoly-29000-livres.md)
- [V1.3 — Louisiana's corporate retrocession: royal decrees, courts, assets and creditor claims](research/v1-3-louisiana-retrocession-governance-debt-dates.md)
- [Research expansion and representation plan](research/ROADMAP.md)

Current case studies: **Louisiana's Compagnie des Indes retrocession and royal debt/court changes (1731–1733)**; **Choctaw sovereign trade diplomacy and monopoly compensation (1721–1732)**; **archival information networks and Louisiana records (1716–1721)**; **John Law and the French Mississippi Bubble (1715–1720)**; **charters, public debt, and the South Sea Bubble (1661–1722)**; **shareholder account overlap and the unimplemented 1721 Engraftment Act**; the British East India Company; **imperial finance, East India Company tea relief, and North American resistance (1757–1775)**; **1773 Tea Act money, merchant appointments and family networks**; and the 1953 Iranian coup. The [imperial finance and revolution research brief](research/imperial-finance-and-revolution-1757-1775.md) records corroborated links and contested questions. This is an evolving research interface, **not** a completed or peer-reviewed history of the events. We invite corrections and perspectives from affected communities, and will not infer guilt from ancestry, ethnicity, religion or membership.

### Archival use and licensing

Source-review labels describe review of accessible citations and archive descriptions, not that all handwritten folios, account transactions or correspondence have been transcribed. Original holdings may require in-person access. Yale's South Sea Bubble data is linked under its academic-use restrictions and is **not copied** into this repository. No named personal Paris–London–Amsterdam letter or cross-national insider trade has been verified. See the V0.9 research memo.
\n
**V1.0 provenance note:** The early newspaper readings are based on Yale's editorially provided translations and scans, and the Louisiana figures are from 1910/1917 historical reproductions, not a newly completed word-for-word transcription of the original census. A Dutch dateline is not automatically the printed Leiden issue date. Source extraction must not rehost Yale's copyrighted translation or restricted research datasets.

**V1.1 evidence note:** The 1721 Choctaw council action's exact February day conflicts within one modern scholarly paper; original ANOM folio check is pending. The New Orleans census has an original 12-image entry and apparent extended 29-image variant; neither has been audited line by line. Deiler (1910), de Villiers (1917) and modern Vidal (2019) figures are separately scoped attributed readings, not one synthesized historical population. Public colonial inventories do not represent Indigenous nations' experiences or enslaved people's histories equally.

**V1.2 money-source warning:** A cited 1732 Superior Council award of 29,000 French livres is a legal decision, **not a proved treasury disbursement**. The September 2 1732 ministry letter is separately indexed and must be compared directly with the judgment before those two records can be treated as one transaction history. The 1721 census signer called Diron has not been formally matched to Bernard Diron d'Artaguiette through signature comparison.

**V1.3 date and visual-evidence correction:** the Louisiana Company debt decree is *dated 24 February 1731*, although one copy was *printed in 1733*. The royal retrocession title page is dated *23 January 1731*. Financial Cards show payment arrows only for documented loan/share movements, **never** for awards, subscriptions, equity positions, proposals or legislative authorizations. The 1732 Diron award lists adjudicator, beneficiary, unverified payer and unverified paid amount as separate roles. Original legal clauses and payment ledgers remain unread; see V1.3 research memo.
