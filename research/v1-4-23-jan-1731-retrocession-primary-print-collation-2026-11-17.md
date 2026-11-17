# 17 November 2026 — 23 January 1731 Louisiana retrocession decree: printed facsimile transcription and periodical collation

**Scope.** One bounded source-verification milestone for [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This reads the complete three-page printed retrocession decree dated 23 January 1731. It does **not** read the separate Company-debt decree dated 24 February 1731 and does not assign a corporate liability or payment.

## Repository baseline

- Starting main: ee8b4107261362792c66b09f3557e3714208448e (PR #47 merge).
- Open issues inspected: #5, #24, #22, #20, #18, #16, #14, #12, #10, #7 and #2.
- No open PRs at the start of this milestone.
- PRs #47–#37 were inspected as recent merged history; #47 was the latest merged research milestone.
- Issue #24 still identifies the 23 January print and ANOM COL F3 242 fol. 187 as incompletely examined, and the 24 February 1731 debt decree as the highest-priority unresolved financial instrument.

## Facsimile and edition identification

The [CIHM/ICMH microfiche PDF](https://upload.wikimedia.org/wikipedia/commons/7/7f/Arrest_du_Conseil_d%27Estat_du_roy%2C_concernant_la_retrocession_faite_%C3%A0_Sa_Majest%C3%A9_par_la_Compagnie_des_Indes_%28IA_cihm_50701%29.pdf) identifies the work as:

*Arrest du Conseil d'Estat du Roy, concernant la rétrocession faite à Sa Majesté par la Compagnie des Indes, de la concession de la Louisiane & du pays des Illinois*, dated **23 January 1731**, “Extrait des Registres du Conseil d'Estat,” Paris, **Imprimerie royale**, M. DCCXXXI.

The reproduction's technical/bibliographic notes state:
- CIHM/ICMH copyright/reproduction year: **1985**;
- reduction ratio: **22X**;
- the pages are marked discoloured/stained/foxed and show-through;
- the filmed copy was supplied by the **Seminary of Quebec Library**.

All three printed pages were visually inspected from this facsimile:
- PDF page index 4 (zero-based): unnumbered title/first-text page;
- PDF page index 5: printed page 2;
- PDF page index 6: printed page 3.

The physical 1731 copy at the Seminary of Quebec Library was not examined. This is a page-image examination of a microfiche facsimile, not a claim of direct physical-object inspection.

## Page-level transcription

The full page-level transcription is stored in the source_extracts data, record extract-011. The original French is preserved in three segments with the PDF page indices above. The text was read visually from the facsimile and cross-checked against the PDF's extracted OCR. Because the microfiche notes flag show-through and discoloration, spellings/punctuation should be checked against a higher-resolution exemplar before treating this as a critical diplomatic edition.

### Substantive provisions

1. The request is presented by the Company's **Directors and Syndics**, authorized by a Company deliberation of **22 January**.
2. The King accepts the retrocession made by those Syndics and Directors **for and on behalf of the Company**.
3. The returned concession is described as the **property, seigneurie and justice** of Louisiana and its dependencies, together with the **country of the Illinois**.
4. The decree lists the **places, forts, buildings, artillery, arms and troops then present**.
5. The King accepts return of the Company's **exclusive-trade privilege** and declares Louisiana commerce free to all his subjects.
6. The decree expressly maintains the Company's rights against its **debtors in the province**, exercisable when and as the Company judges appropriate.

The decree's phrase that the Company is not to be charged in future follows the return of the exclusive-trade privilege and the declaration of free trade. It should not be converted into a blanket release of the Company's separate debts. The separate 24 February debt decree must be read on its own terms.

## Contemporary Mercure de France comparison

The March 1731 Mercure de France, printed pp. 610–611, has a separate contemporary entry beginning “AUTRE du même jour, concernant la rétrocession...” and summarizing the same 23 January act. The [Bureau du Mercure OCR transcription](https://bureaudumercure.org/mercure/term/domain?domain=186&page=2) at lines 4999–5027 reproduces the Company's retained creditor-rights clause.

The key passage agrees in substance with printed p. 3 of the Imprimerie royale facsimile. The periodical uses abbreviations such as “S.M.” and shows spelling/punctuation variation; it is an abridged extract, not a word-for-word duplicate. The Bureau du Mercure portal states that its contents are exploratory/provisional/incomplete. The Mercure page image was not examined in this milestone, so this is a comparison of the facsimile against periodical OCR, not a fully image-to-image collation.

## Historical assessment

**Documented in the examined printed text:** the Company returned its Louisiana/Illinois concession and exclusive-trade privilege to the Crown; the decree lists specified colonial infrastructure and forces; Louisiana commerce was declared free to the King's subjects; and the Company retained rights against provincial debtors.

**Interpretation, not a separate legal holding:** the clause “sans que la Compagnie en puisse estre chargée à l’avenir” is situated in the exclusive-trade passage. It cannot safely be read as a general discharge of all Company liabilities. The same instrument preserves Company-side creditor rights, but does not identify any debtor or quantify any claim.

**Not established:** who owed money, what the Company itself owed, whether the Crown assumed Company liabilities, any amount due, collection, settlement, receipt, payment or enforcement. The 24 February 1731 debt decree remains unread and catalogue-only.

## Affected-community perspectives and limits

The decree uses French royal/Company language of propriété, Seigneurie & Justice and calls the Illinois country “pays des Sauvages Illinois.” That records the Crown's legal vocabulary, not Indigenous consent or recognition of French title by the nations whose homelands were being claimed.

The [Peoria Tribe of Indians of Oklahoma's community-authored history](https://www.peoriatribe.gov/204/History) identifies the Tribe as a sovereign nation and as a confederation of Kaskaskia, Peoria, Piankashaw and Wea peoples; it describes its Illinois/Illini identity, homelands and nineteenth-century removal. This is relevant present-day community context, not a direct response to the 1731 decree and not a statement on behalf of every Illinois/Illini descendant nation. The decree does not identify enslaved people or establish that people were among the listed material assets; separate records and descendant/community-aware research are required.

## Implementation

- Added src-cihm-1731-retrocession-microfiche and src-peoria-tribe-history to source provenance.
- Updated doc-022 to microform_facsimile_text_examined.
- Added extract-011 with the three page-level transcription segments.
- Updated the retrocession event and the January decree witness.
- Changed only the January ledger review label to facsimile_text; all paid, transfer and liable fields remain null.
- Added a dedicated regression validator and integrated it into scripts/validate.js.
- Updated the witness, retrocession-clause and liability validators.
- Updated the public source-reading explorer to display the French transcription when the retrocession1731 case is selected, and added a browser regression assertion.

## Next source-verification gap

1. Obtain a higher-resolution scan or inspect the physical Seminary of Quebec copy.
2. Inspect ANOM COL F3 242 fol. 187 and collate it with the printed text.
3. Obtain the March 1731 Mercure page image and complete an image-to-image collation.
4. **Highest-priority financial task:** obtain both pages of the **24 February 1731 Company-debt decree** (1731 Imprimerie royale or 1733 Saugrain–Prault printing), transcribe its operative clauses, and only then map debtor/creditor roles. Seek original accounts and receipts separately before recording any payment.
