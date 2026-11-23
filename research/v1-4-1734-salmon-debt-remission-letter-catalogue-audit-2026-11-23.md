# V1.4 source audit — Salmon's 14 August 1734 letter on Company house advances and requested debt remission

**Research date:** 23 November 2026  
**Starting main:** `d177ff7e0b87531a10e41ae16b878177ba7a823e`  
**Branch:** `research/1734-salmon-debt-remission-catalogue`  
**Scope:** One bounded catalogue-and-scholarship cross-check. No original manuscript image was transcribed.

## Repository state checked first

- `main` was at `d177ff7e`.
- Issue [#24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24) remained open and is still the central V1.4 task.
- No open PRs existed at the start.
- PRs #48–#53 and the earlier 1731/1732/1735 catalogue audits were already merged.
- The 23 January 1731 retrocession decree's three printed pages were already transcribed from a 1985 CIHM/ICMH microfiche facsimile; this work does not repeat it.
- The separate 24 February 1731 Company-debt decree remains catalogue-only; both operative pages remain unread.

## 1. Archives de la Nouvelle-France item 31196

Direct item record: https://nouvelle-france.org/fra/item/details?id=31196

The database record identifies:

- **Record/item:** 31196
- **Date:** **14 August 1734**
- **Place:** **New Orleans**
- **Document:** Letter from Salmon to the minister, in response to a ministerial dispatch of **16 February 1734**
- **Repository:** Archives nationales d'outre-mer (France)
- **Archival reference:** **COL G1 464/10p., CABAC_PIAF_6888_CABAC_PIAF_6888**
- **Extent shown in portal:** **10 images**
- **Language:** French

The catalogue description says the minister charged Salmon with ending disputes between the Company of the Indies and Louisiana inhabitants/concessionnaires over repayment of advances for houses. It says Salmon requested remission of half the debts because of insolvency attributed to bad years.

**What was examined:** the item metadata page in French and its English-language route. Both expose the same French title/description, date, repository, locator and image count. The portal's image navigation was observed, but the ten image pages were **not** transcribed or treated as manuscript examination. The date is the catalogue's letter date, not the date of a decision, remission or payment.

Short catalogue phrases transcribed in `extract-014` are metadata only:
- “Lettre de Salmon au ministre en réponse à sa dépêche du 16 février 1734.”
- “Salmon demande la remise de la moitié des dettes.”

The catalogue wording about advances for houses needs checking against the original French before the exact nature of the advances is described.

## 2. Secondary cross-check: Khalil Saadani (2008), printed pp. 27–29

Khalil Saadani, *La Louisiane française dans l'impasse, 1731–1743* (Paris: Éditions L'Harmattan, 2008), accessible excerpt:
https://api.pageplace.de/preview/DT0400.9782296192522_A24206785/preview-9782296192522_A24206785.pdf

Publisher bibliographic record:
https://www.editions-harmattan.fr/catalogue/livre/la-louisiane-francaise-dans-limpasse/49085

The accessible excerpt, printed pp. 27–29, describes a wider post-retrocession conflict over Company claims and obligations involving Louisiana inhabitants and concessionnaires. It distinguishes amounts the Company owed to some colonists from amounts colonists owed the Company. It discusses proposals for partial remission/reduction, the 30 March 1735 ordinance on prices for produce accepted against debts, and later collection arrangements.

On printed p. 29, Saadani reports that debtors were restricted from selling enslaved people or immovable property without written permission and describes a collection arrangement involving Dumanoir. These are **secondary claims**, not a transcription of the ordinance or an individual judicial file.

The accessible excerpt does not include notes 33–46. The underlying archival references supporting each passage were not independently checked here. Saadani's book therefore provides context and a research lead, not primary proof of the terms, implementation or outcome of the 1734 request.

## 3. Relation to the 1735 and 1731 records

The 1734 item and HNOC Surrey Calendar item 8981 ([20 April 1735], ANOM C 13c, 1:318) both concern a one-half debt-remission/reduction theme. They are not the same date or archival locator:

- **14 August 1734:** ANOM COL G1 464/10p., item 31196, ten images; catalogue describes Salmon's request for half remission of Company claims for house advances.
- **[20 April 1735]:** ANOM C 13c, 1:318, HNOC item 8981, nineteen pages; catalogue describes a reply concerning a one-half reduction of the Company's outstanding Louisiana debts, but does not resolve debt direction.

A direct correspondence relationship is **not established**. The 30 March 1735 A 23:118 commodity ordinance and 30 September 1733 C 13 vol.16:166 Company-notes correspondence are also distinct records. Compare them only after examining originals and locating explicit cross-references.

No explicit connection between item 31196 and the 24 February 1731 debt decree has been found. The letter is contextual evidence about post-retrocession creditor disputes, not a substitute for the unread decree.

## 4. Claim direction — catalogue-level only

The item 31196 description portrays the Company as seeking repayment of advances from inhabitants/concessionnaires. Salmon's requested remission is a request, not proof of approval. No amount, named debtor, individual balance, decision, payment, settlement or Crown assumption is established.

The atlas therefore records:
- claimant/creditor: Company of the Indies, as catalogue wording only;
- party described as owing: Louisiana inhabitants/concessionnaires collectively, not individually identified;
- decision-maker: unresolved;
- amount: none stated in catalogue;
- adjudicated liability: false;
- payment: false;
- connection to the 24 February 1731 decree: not established.

No financial-flow row was created. The liability ledger row for `doc-042` is review-level `abstract`; `paid`, `transfer` and `liable` remain null.

## 5. Human and community context

This is a colonial administrative/creditor perspective. It does not preserve the voices of the inhabitants, enslaved people or Indigenous nations. Saadani's report that collection measures constrained debtors' ability to sell enslaved people is important context, but it must be checked against the original ordinance and related court records. The atlas must not encode enslaved people as neutral collateral or treat a colonial accounting category as a complete description of their lives.

The repository continues to keep Choctaw Nation- and Peoria Tribe-authored histories separate from French administrative correspondence. It also retains the Louisiana Superior Council collection's finding-aid references to petitions by enslaved people seeking manumission. These sources are not interchangeable: no Indigenous consent is inferred from Company or Crown records, and the 1734 letter is not a substitute for the voices of people subjected to enslavement.

## 6. Implementation and validation

The research branch adds:

- `doc-042` — the 1734 Salmon letter, catalogue-only.
- `evt-1734-salmon-house-advance-letter` — unresolved event, catalogue-only.
- `src-anom-1734-salmon-letter-catalogue` and `src-saadani-2008-louisiana-impasse`.
- `extract-014` — short French excerpts from the catalogue description, explicitly not original letter text.
- A non-transactional claim-direction entry and retrieval lead for all ten images.
- A liability-ledger review row with null payment, transfer and liability.
- Regression tests preventing promotion to examined original text, approved remission, named debtor, payment or a direct link to the 1731 decree.

**No financial-flow record was created.** The February 24, 1731 debt decree remains catalogue-only and unread.

## Next source-verification task

1. Obtain all ten images of ANOM COL G1 464/10p. and transcribe the original French; identify the 16 February 1734 dispatch and any attached account or decision.
2. Compare with HNOC item 8981 and A 23:118 only if the original texts supply a direct documentary link.
3. Continue the highest-priority legal task: obtain both operative pages of the **24 February 1731 Company-debt decree** through the Columbia/LLMC or BnF route, compare the 1731 and 1733 printings, and transcribe the clauses before assigning any legal roles.
4. Seek court petitions, manumission records and community-authored histories to document effects on inhabitants, enslaved people and Indigenous nations beyond the colonial creditor's account.
