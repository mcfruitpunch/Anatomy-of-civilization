# 16 November 2026 — 1731 Superior Council reorganization: scholarly cross-check and date reconciliation

**Scope.** This is a bounded source/provenance milestone for Issue #24. It does not read the 24 February 1731 Company-debt decree and does not close the liability question. It verifies a previously thinly sourced administrative transition that affects who exercised colonial judicial/governing authority after the Company's withdrawal.

## Repository baseline

- Starting `main`: `09f7e712ab83359be0bc2ada0fd9a9ff2428eaf5` (PR #46 merge).
- Open research priorities include #24 (1731 decrees/liabilities), #22 (Diron award/payment), #20 (Choctaw diplomacy folios), and #5 (Pages deployment).
- No open PRs were present at the start of this pass.
- The 1731 Superior Council reorganization already existed as `doc-025` and `evt-1731-superior-council-reorganization`, but its evidence was attributed only to the 2026 University of Limoges article. The task was to independently cross-check the secondary account and preserve the archival date discrepancy without upgrading the original-text reading level.

## New scholarly cross-check

### Khalil Saadani, 2003

Khalil Saadani, “Le Gouvernement de la Louisiane Française, 1731–43: Essai d'Histoire Comparative,” *French Colonial History*, vol. 4 (2003), pp. 117–132, DOI: [10.1353/fch.2003.0025](https://doi.org/10.1353/fch.2003.0025). JSTOR identifies the article as pp. 117–132 (stable record [41938155](https://www.jstor.org/stable/41938155)); the full-text copy was inspected through [Academia](https://www.academia.edu/117344287/Le_Gouvernement_de_la_Louisiane_Fran%C3%A7aise_1731_43_Essai_dHistoire_Comparative).

On printed pp. 117–118 Saadani states that the Company's withdrawal simplified Louisiana's administrative structure: the *Conseil de régie* that represented the Company disappeared; royal letters patent dated **22 May 1731** restored the *Conseil supérieur* according to the 1716 edict and revoked the August 1719 provisions that had allowed some Company directors to sit on it. Saadani further describes the formal administrative link to Canada as resuming, but says the distance made that attachment largely theoretical and Louisiana officials continued direct correspondence with the minister.

This is a secondary historical interpretation, not a transcription of the May 1731 instrument. It supports a distinction between two bodies: the Company's representative *Conseil de régie* and the colonial *Conseil supérieur*. It does not show that every Company employee left public service; Saadani later notes that Saadani notes on p. 122 that some officials, storekeepers and accountants in the post-withdrawal administrative apparatus had already worked under Company administration; the passage does not name them or establish a complete personnel transfer.

### Archival references printed in Saadani's notes

Saadani's note 3 (printed p. 131) lists:
- AN, Colonies, A 22, fols. 134–135;
- A 23, fols. 106–107;
- B 55, fols. 634–635;
- AN, Archives de la Marine, A1–69, fol. 20, described as letters patent to regulate the judges composing the Louisiana Superior Council, dated **24 May 1731**;
- AN, Colonies, C13A13, fol. 260, a **draft** of letters patent concerning establishment of the Louisiana Council (1731).

Saadani's notes 5–6 (pp. 131–132) separately cite royal instructions/mémoires dated 15 and 22 May 1731, including B55 fols. 606–607 and 593, and a reference printed as B57 fols. 594–595. These citations are preserved as printed; no attempt is made to silently correct a possible series/folio discrepancy.

### Alexandre Ribeaux, 2026

Alexandre Ribeaux, “Homicide, impérialisme et vengeance en Louisiane française entre 1738–1740,” *Conflictualité* no. 5 (2026), published online 7 April 2026, PDF pp. 7–8, notes 38–39, [article/PDF](https://www.unilim.fr/conflictualite/806).

Note 39 identifies a copy of the edict dated **22 May 1731** at **ANOM, COL F3 242, fol. 190**. Ribeaux says the monarchy returned to the 1716 composition of the Superior Council and excluded Company directors. He adds that the cited text makes no mention of judges in the “distant places.” The article's main purpose is to present later 1738–1740 correspondence; the cited 1731 folio itself was not transcribed in the passage used here.

### What the dates do—and do not—establish

There are at least two distinct archival references in the scholarship:
1. A copy of an edict dated **22 May 1731**, ANOM COL F3 242 fol. 190 (Ribeaux note 39; also Saadani's main text pp. 117–118).
2. Letters patent dated **24 May 1731**, AN, Archives de la Marine A1–69 fol. 20 (Saadani note 3).

These may be related copies, separate instruments issued in a short administrative sequence, or a date/citation discrepancy. The original documents have not been compared, so the relationship is **unresolved**. The draft at C13A13 fol. 260 must remain distinct from a promulgated instrument. The May 22 royal instructions cited elsewhere in Saadani are also not automatically the same as the letters patent.

## Historical assessment

**Documented at the level of scholarly cross-reference:** two scholarly works identify the post-retrocession return to the 1716 Superior Council framework and the exclusion of Company directors from that Council. Saadani additionally describes the disappearance of the Company-representing *Conseil de régie*.

**Scholarly interpretation:** Saadani characterizes the reorganization as simplifying the colonial administrative structure and restoring a formal dependency on Canada, though distance limited the practical effect. This is an interpretation of institutional design, not proof of daily administrative practice.

**Unresolved:** the original wording, the exact relationship between 22 and 24 May records, named directors affected, initial appointments, individual votes, and whether judges in distant posts continued under the new royal regime. No named roster is inferred.

**Financial caution:** Saadani pp. 117–118 also reports a Company indemnity connected to withdrawal, but that statement is not transcribed from the cited originals in this pass. Its figures and terms are deliberately **not** added to `financial_flows.json`, the liability ledger, or any payment record. A promise, award, authorization or agreed schedule is not a receipt or proof of payment. The original records must be obtained and mapped to each claim before any amount or debtor is encoded.

## Affected communities and limits of colonial records

The reorganization sources are French Crown and Company administrative/legal records. They describe a change in colonial governing institutions; they do not establish Indigenous consent to French territorial claims or transfer Indigenous sovereignty.

The Choctaw Nation's community-authored *Iti Fabvssa* article, “[Fort Tombecbe and Early Choctaw Treaties](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/)” (3 April 2023), describes Choctaw diplomacy as active negotiation: leaders sought trade relationships and terms, and Choctaw women played a vital role in peace negotiations. It describes the 1729 treaty for four trading posts and identifies Fort Tombecbe as the later 1736 post. This community-authored source is contextual; it does not discuss the May 1731 edict or prove a specific Choctaw response to it.

The 2026 Ribeaux article also describes a later 1738 case involving Chactas and notes the importance of Indigenous diplomatic relationships, but its discussion is not a substitute for Choctaw-authored history. Neither source should be generalized to other distinct Indigenous nations. The Louisiana Historical Center's warning about omissions in WPA-era abstracts remains relevant when using colonial indexes for enslaved people's and women's experiences.

## Implementation

- Added `src-saadani-2003-fch` with page-level locators and the article's archival citations.
- Corrected `src-unilim-1731-retrocession` author and locator metadata to Alexandre Ribeaux and the exact PDF/footnote locations.
- Added `extract-010`, explicitly classified as scholarly synthesis with archival footnotes, not original transcription.
- Reclassified `doc-025` as `scholarly_reference_only` so the UI/data model distinguishes a scholarly archival citation from catalogue inspection or original-text examination.
- Updated the Council reorganization event to preserve the unresolved 22/24 May relationship.
- Added `scripts/validate-louisiana-governance-reorganization.js` and integrated it into `scripts/validate.js`. Negative tests reject a 24 May date substitution, promotion to original-text examination, imported monetary figures, or removal of the date uncertainty.
- No debtor, creditor, Company director identity, asset transfer, debt assumption, liability, settlement, amount, payment, or new financial flow was added.

## Next source-verification action

1. Request/inspect **ANOM COL F3 242 fol. 190** (the 22 May copy) using the known University of Louisiana at Lafayette Collection 329 route: **reel 580 contains F3 242** (finding aid, printed p. 6). The reel and folio image remain unexamined.
2. Separately request **AN, Archives de la Marine A1–69 fol. 20**, the 24 May reference; do not assume it is on any Collection 329 reel without a direct inventory match.
3. Compare the instruments and the cited A22/A23/B55 records; inspect the C13A13 fol. 260 draft separately.
4. Return to the highest-priority V1.4 blocker: obtain and transcribe both pages of the **24 February 1731 Company-debt decree** (printed 1733), then test its operative provisions against the original 1731–1737 creditor, account and receipt records.

Issue #24 remains open. This milestone improves the provenance and chronology of the governance transition; it does not resolve the Company's liabilities.
