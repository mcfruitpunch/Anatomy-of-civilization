# V1.4 — 14 November 2026: BnF Recueil volume-one retrieval audit

Related: [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This milestone adds a **candidate access route** for the still-unread 24 February 1731 Company-debt decree. It does not establish that the decree is reproduced in this compilation and does not close the issue.

## Repository state checked first

- Starting `main`: `8f17e25f5df695ead3715f22ac03facef5d86be3`, merge commit for PR #44.
- PR #44 had been left open because its validator did not allow the explicitly mediated `scholarly_synthesis_with_archival_footnotes_not_original_transcription` evidence level used by `extract-009`.
- I added that exact evidence level to the allowlist without relaxing the extract's original-folio limitations. GitHub Actions run #75 then passed research-data integrity, browser JavaScript syntax, and explorer navigation. PR #44 was merged only after that run passed.
- Issue #24 remains open. The original operative clauses of the 24 February 1731 decree remain the highest-priority uncompleted legal-text task.

## New retrieval route

### BnF collection-level record

The Bibliothèque nationale de France's *Patrimoines Partagés — France-Amériques*, “Compagnie des Indes” collection page lists three separate items relevant to this trail:
1. the 23 January 1731 Louisiana/Illinois retrocession arrêt;
2. the Company-debt arrêt dated 24 February 1731, represented by a 1733 printing;
3. a *Recueil ou collection des titres, édits, déclarations, arrêts, règlemens et autres pièces concernant la Compagnie des Indes orientales établie au mois d'août 1664*, dated 1755–1756.

The BnF page's link for the later *Recueil* resolves to the Gallica digital-item thumbnail endpoint for ARK `bpt6k1102726`. The thumbnail request returned **HTTP 403** on 14 November 2026. No image, OCR, table of contents, or volume pages were read.

### Volume identification cross-check

The *French Books on India* bibliography lists Germain Dernis's *Recueil* as a four-volume publication from Paris, A. Boudet, 1755–1756, and provides Gallica links for volumes 1–4. A separate *Les Éditions du Net* bibliographic page identifies the Gallica object `bpt6k1102726` as **T. 1**. These are bibliographic cross-references, not evidence of the compilation's contents.

**Important limit:** I have not verified that volume 1—or any of the four volumes—actually reproduces the 24 February 1731 Louisiana debt arrêt. The BnF's separate catalogue entry for the 1733 printing remains the only located item-level identification of that standalone edition. The *Recueil* is recorded only as a candidate route for searching a later official compilation.

## Evidence classification

- **Documented catalogue/bibliographic fact:** BnF lists the 1755–1756 *Recueil* in the Compagnie des Indes collection; its linked Gallica thumbnail endpoint identifies ARK `bpt6k1102726`. The bibliography identifies a four-volume set; the cross-reference labels this Gallica object T. 1.
- **Access fact:** the observed thumbnail endpoint returned HTTP 403 on 14 November 2026; no content was retrieved.
- **Unresolved:** whether the 1731 debt arrêt is reproduced in volume 1 or another volume; its exact page numbers, wording, and relationship to the 1733 standalone printing.
- **Not established:** any debtor, creditor, liability allocation, Crown assumption, settlement, amount paid, or receipt.

## Affected communities and interpretive limits

The BnF collection is a French institutional catalogue and reflects the administrative record-making of a colonial commercial company. It does not establish Indigenous consent to French claims over Louisiana or Illinois. For Choctaw diplomatic agency and negotiated trade relationships, retain the Choctaw Nation's community-authored [Iti Fabvssa account of early treaties and Fort Tombecbe](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) alongside French administrative records. The Louisiana Historical Center's [indexing-method statement](https://www.lacolonialdocs.org/post/8/the-process) warns that WPA-era indexing and abstracts omit names, including those of enslaved people and women. Absence from a catalogue is not evidence of absence from the historical event.

## Implementation

- Added `src-bnf-recuel-volume1-gallica` as a digital-item locator with explicit HTTP 403 and no-content limitation.
- Added `src-editions-du-net-recuel-t1` as a secondary bibliographic cross-reference, not as primary evidence.
- Extended the existing BnF collection-context locator with the exact volume-one Gallica access path and its failure status.
- Added `data/louisiana_decree_retrieval_leads.json`, deliberately separate from `louisiana_decree_witnesses.json`.
- Added `scripts/validate-louisiana-decree-retrieval-leads.js` and integrated it into the main research validator. The gate prevents an unexamined compilation from being promoted to a decree witness or given invented page numbers.
- No legal clauses, liability assignments, payments, or new financial-flow rows were added.

## Next action

Obtain a legible copy or table of contents of the four-volume *Recueil*, search each volume for the exact title/date of the 24 February 1731 arrêt, and only then record the volume/page locator if found. In parallel, continue requesting the two-page 1733 Saugrain–Prault printing (Columbia 1505745 / LLMC1338688796) and the separately catalogued 1731 Imprimerie royale printing. Do not merge this retrieval lead into the witness list until the target text is directly confirmed.
