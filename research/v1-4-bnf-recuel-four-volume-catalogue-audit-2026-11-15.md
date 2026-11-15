# V1.4 — 15 November 2026: BnF Recueil four-volume catalogue and access audit

Related: [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This milestone improves the retrieval route for the still-unread 24 February 1731 Company-debt decree. It does **not** establish that the decree appears in the later compilation and does not close the issue.

## Repository state checked first

- Starting `main`: `b72d936b1b228b2d6a0ec91346f1726a0d2410ca`, merge commit for PR #45.
- PRs #44 and #45 were merged; no open pull requests were returned by the repository-scoped search.
- Issue #24 remains open and remains the highest-priority legal-text task.
- The existing `louisiana_decree_retrieval_leads.json` already held a volume-one candidate route; this milestone expands it using a stable BnF catalogue notice rather than repeating the earlier collection-page lookup.

## Directly examined institutional catalogue record

**Bibliothèque nationale de France, Catalogue général**, notice ARK [`ark:/12148/cb338513279`](https://catalogue.bnf.fr/ark:/12148/cb338513279), notice no. **FRBNF33851327**.

The rendered record states:

- Title: *Recueil ou collection des titres, édits, déclarations, arrêts, règlemens et autres pièces concernant la Compagnie des Indes orientales établie au mois d'août 1664*.
- Publication: Paris, impr. Boudet, **1755–1756**.
- Physical description: **4 volumes**, in-4.
- Catalogue note: **volume 4 contains a “Table générale chronologique des pièces contenues dans les volumes de la collection des privilèges de la Compagnie des Indes.”**
- Four digital parts and their displayed identifiers:
  - T.1 — NUMM-110272; Gallica ARK `ark:/12148/bpt6k1102726`.
  - T.2 — NUMM-110273; Gallica ARK `ark:/12148/bpt6k110273k`.
  - T.3 — NUMM-110274; Gallica ARK `ark:/12148/bpt6k110274z`.
  - T.4 — NUMM-110275; Gallica ARK `ark:/12148/bpt6k110275b`.
- Four microfilm shelfmarks are listed: **MFILM V-13992, V-13993, V-13994 and V-13995**. The rendered record lists them in sequence but does not explicitly map each shelfmark to an individual volume; the atlas preserves them as an unpaired set.

This is direct examination of the **catalogue record only**, not of the four volumes.

## Gallica access attempts — 15 November 2026

I followed the four “Consulter en ligne” links from the BnF notice. Each returned HTTP 403 in this research environment:

| Volume | Digital record | Gallica ARK | Outcome |
|---|---|---|---|
| T.1 | NUMM-110272 | bpt6k1102726 | HTTP 403; no text |
| T.2 | NUMM-110273 | bpt6k110273k | HTTP 403; no text |
| T.3 | NUMM-110274 | bpt6k110274z | HTTP 403; no text |
| T.4 | NUMM-110275 | bpt6k110275b | HTTP 403; no text |

No page image, OCR, table of contents, chronological-table entry, or volume contents were examined. These failures are access outcomes, not evidence that the digital objects are absent.

## What this changes — and what it does not

**Documented catalogue facts:** The *Recueil* is a four-volume 1755–1756 Boudet compilation; T.4 is catalogued as containing a chronological table; the BnF notice identifies four digital parts and lists four microfilm shelfmarks.

**Research interpretation / retrieval strategy:** T.4's chronological table is now the best first inspection target. If it indexes the 24 February 1731 arrêt, its entry should identify the volume/page to inspect next. This is a search strategy, not a claim that the act appears there.

**Unresolved:** Whether the 24 February 1731 debt arrêt is reproduced in any volume; its exact page number; whether a later compilation text agrees with the separately catalogued 1731 Imprimerie royale and 1733 Saugrain–Prault printings.

**Not established:** Any debtor, creditor, liability allocation, Crown assumption, settlement, amount paid, receipt, or actual disbursement.

## Affected communities and interpretive limits

The BnF record is an institutional catalogue for a French royal/company legal collection. It records the documentary structure of colonial administration, not Indigenous consent to French claims over Louisiana or Illinois. Keep Choctaw Nation-authored historical context (including *Iti Fabvssa*'s account of Choctaw diplomacy) distinct from French administrative descriptions. The Louisiana Historical Center's account of its indexing process warns that WPA-era abstracts omit names, including those of enslaved people and women. Absence from a catalogue or legal index cannot establish absence from the underlying event or its human consequences.

## Implementation

- Added source `src-bnf-recuel-collection-notice` with the stable BnF notice, publication details, four digital identifiers, chronological-table note, microfilm shelfmarks and access limits.
- Updated the existing BnF collection-context and volume-one locator provenance.
- Expanded the existing candidate retrieval lead to map all four digital volumes, preserve the four unpaired microfilm shelfmarks, identify T.4's chronological table as the first inspection target, and record all four HTTP 403 attempts.
- Updated `doc-024` with the new catalogue-level retrieval reference while keeping its access level at `catalogue_metadata_only`.
- Strengthened `validate-louisiana-decree-retrieval-leads.js` to validate all four volume identifiers, the T.4 index metadata, all four failed access attempts, and negative cases preventing promotion to inspected content or an invented page locator.
- No decree witness, source extract, liability row, amount, actor assignment, or payment edge was added.

## Next action

Request a legible scan of **T.4** or access the listed BnF microfilm set. Inspect the *Table générale chronologique* for the exact date/title of the 24 February 1731 debt arrêt and references to Louisiana/debts. If the index points to a volume/page, inspect the original printed page(s), transcribe the operative clauses, and compare against the standalone 1731 and 1733 printings. If no index entry is found, document that negative search and continue with the standalone witnesses. Do not promote the *Recueil* to a decree witness until the target text is directly examined.
