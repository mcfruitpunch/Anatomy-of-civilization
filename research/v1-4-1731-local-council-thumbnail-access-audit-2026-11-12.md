# V1.4 — 12 November 2026: 24 January 1731 local Council dossier image-access audit

Related: [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This milestone clarifies what the public Louisiana Historical Center record page actually exposes. It does **not** transcribe the local record or the separate royal debt decree, and it assigns no liability or payment.

## Repository state checked first

- Default branch: `main`, latest commit before this work: `4439c13f9324c0ff1a5e74b95bd52ccdb5b54b47` (PR #42 merge).
- Repository-scoped search returned no open PRs.
- [PR #42](https://github.com/mcfruitpunch/Anatomy-of-civilization/pull/42) is merged. The current main commit has no commit-associated workflow run/status returned by the GitHub connector in this check; this note does not retroactively claim a new run for main.
- Issue #24 remains open; the February 24, 1731 Company-debt decree's operative clauses remain the highest-priority unresolved legal text.

## Direct institutional record-page examination

Opened the Louisiana Historical Center's [record 1731-01-24-03](https://lacolonialdocs.org/document/2003) on 12 November 2026. The page itself identifies:

- catalogue date: **24 January 1731**;
- language: French;
- source: French Superior Council;
- origin: New Orleans, Province of Louisiana;
- repository: Louisiana Historical Center;
- catalogue category: “Administrative Acts, Retrocession of Louisiana”;
- indexed people: Coligny, Company of Indies, Le Redde and Orry;
- page indicator: **Pg. 1 / 24**;
- image links displayed: **48**.

These are record-page metadata and a count of links displayed, not a transcription of the manuscript's clauses. The archive's modern category is not itself evidence of the operative legal content.

### Three sampled image targets

I opened three of the page's image links. Each returned a small JPEG preview under the S3 path `station_thumbs_sm`:

| Archive page link ID | Observed preview target | Result |
| --- | --- | --- |
| 3 | [doc-img-125291.jpg](https://lacolonialdocs-data.s3.amazonaws.com/station_thumbs_sm/doc-img-125291.jpg) | Small preview; no readable transcription obtained |
| 4 | [doc-img-125292.jpg](https://lacolonialdocs-data.s3.amazonaws.com/station_thumbs_sm/doc-img-125292.jpg) | Small preview; no readable transcription obtained |
| 26 | [doc-img-125290.jpg](https://lacolonialdocs-data.s3.amazonaws.com/station_thumbs_sm/doc-img-125290.jpg) | Small preview; no readable transcription obtained |

I did not obtain a full-resolution manuscript image. Only three of the 48 displayed image links were sampled. It would be unsafe to infer that the 48 links correspond to 24 recto/verso pairs, to infer the document's page sequence from link order, or to transcribe French text from these preview renditions.

The structured result is recorded in `data/louisiana_image_access_audit.json`. The document's access level is now `thumbnail_preview_links_observed_text_unread`, rather than the broader and less precise `catalogue_metadata_only`. Its liability-ledger review remains **catalogue**; `paid`, `transfer` and `liable` remain null.

## Archive-method and affected-community context

The Louisiana State Museum's [official Colonial Documents guide](https://louisianastatemuseum.org/louisiana-historical-center-colonial-documents) describes the Superior Council collection as including debt cases, successions, property inventories, commercial transactions, petitions for manumission and records concerning free and enslaved Africans, Native peoples and European colonists. The guide also explains that the WPA Black Books are 1930s translations arranged chronologically, that some WPA pages are missing and that some original documents have been lost. No matching Black Book 20 entry for this 24 January dossier was verified in this milestone.

The [Choctaw Nation of Oklahoma's community-authored *Iti Fabvssa* history](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) describes Choctaw diplomacy as active negotiation, including the 1729 treaty negotiations with the French and the role of Choctaw women; it dates the final of four trading posts in that account, Fort Tombecbe, to 1736. This is a distinct community-authored historical perspective, not a reading of this 1731 French Council file. Nothing in the French catalogue metadata establishes Choctaw consent to French territorial claims, nor does it identify this file as a record of a specific Choctaw post.

Likewise, the archive's indexing of people and colonial commercial actors cannot stand in for the experiences of enslaved people or establish that colonial property descriptions exhausted their personhood, kinship or agency. No person-level or Indigenous liability inference is made here.

## What is established, interpreted and unresolved

**Documented by the archive page:** a French Superior Council record dated 24 January 1731; the archive's category and indexed names; 24 displayed pages and 48 image links. Three sampled image links resolve to small preview assets.

**Methodological interpretation:** the current publicly exposed preview targets are inadequate for a reliable diplomatic transcription. The access level must distinguish preview availability from legible original-page examination.

**Unresolved:** the contents of all 24 manuscript pages; exact folio sequence; whether the file records promulgation, registration, local implementation or other administrative acts; how it relates to the 23 January royal decree; and any effect on property, obligations, debts or people. No payment, debt settlement, transfer or liability is established.

## Implementation

- Added `data/louisiana_image_access_audit.json` with the exact page metadata, 48-link inventory, three sampled target URLs and explicit access flags.
- Updated `doc-021` and source `src-lcd-retrocession-1731` to distinguish thumbnail previews from readable manuscript pages.
- Extended the already-invoked Louisiana liability validator to reject unsupported claims that the original text, full-resolution scans or WPA crosswalk were examined, and to keep 24 January distinct from 23 January.
- Left `data/louisiana_liability_ledger.json` unchanged.

## Next source-verification action

1. Request legible full-resolution images of the 24-page record and its exact original folio/page sequence from the Louisiana Historical Center; the public page's three sampled links are thumbnail previews only.
2. Separately locate the corresponding WPA Black Book 20 entry, recording its printed page and PDF image page, then compare its translation with the French manuscript rather than treating the WPA summary as the original.
3. Continue to prioritize obtaining both pages of the **24 February 1731** Company-debt decree (including the 1733 Saugrain–Prault printing or 1731 Imprimerie royale edition). Its title and catalogue entries do not establish operative debtor/creditor rules or payment.
