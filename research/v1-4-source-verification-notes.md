# V1.4: Louisiana liabilities, 1731–1732

Fourteen dated documentary leads are currently catalogued in `data/louisiana_liability_ledger.json` (as of 30 October 2026). The original debt decree clauses and Diron judgment remain unread. No named legal debtor or actual payment has been verified. The [31 October 2026 original-decree reproduction dossier](v1-4-decree-reproduction-dossier-2026-10-31.md) adds Columbia/LLMC/OCLC retrieval keys and records renewed Gallica HTTP 403 without claiming an original-page reading.

## July 15, 1732 archival lead

The Louisiana Historical Center indexes [1732-07-15-01](https://lacolonialdocs.org/document/2148) as a French Superior Council statement of account, with five original-image pages. The modern English index card describes an account involving the succession of François Duval and the Company of the Indies and also references January 15, 1736. The catalogue date and later accounting date are different. The card is editorial metadata, not a verbatim French primary transcription. No cash payment or Crown assumption of the Company's debt is proven by this catalogue entry. The original handwritten pages still require close transcription.

## 23 October 2026: distinguish decree date from printing date, and record source access

The highest-priority unresolved question in [issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24) remains **the operative text of the 24 February 1731 debt decree**. This pass checked bibliographic evidence and located a direct Gallica identifier, **not** the decree's debt-allocation articles.

| Item | What was independently checked | Evidentiary level | Remaining task |
| --- | --- | --- | --- |
| **24 Feb 1731 act; 1731 printing** | [BnF Catalogue général filtered results](https://catalogue.bnf.fr/affiner.do?afficheRegroup=false&critereRecherche=&index=&listeAffinages=FacPays_fr%3BFacNatDoc_a%3BFacLan_fre%3BAUT3_12495798&motRecherche=&nbResultParPage=100&numNotice=&triResultParPage=0&trouveDansFiltre=NoticePUB&typeNotice=), result **39**, identifies '[Acte. 1731-02-24. Versailles]' and **Impr. royale, 1731**. | **Catalogue metadata only**; result-list URL is not a stable item-level permalink. | Find stable BnF record and inspect all printed articles; verify whether editions differ. |
| **Same 24 Feb 1731 act; 1733 printing** | BnF [curated commercial-companies list](https://heritage.bnf.fr/france-ameriques/en/commercial-companies) links the debt act to [Gallica ark:/12148/btv1b8602624n](https://gallica.bnf.fr/ark:/12148/btv1b8602624n). [Columbia Law record 1505745](https://pegasus.law.columbia.edu/record/1505745) gives a **two-page** 1733 Paris Saugrain–Prault edition whose title explicitly says 'Du 24 février 1731'. | **Bibliography plus identified digitized object, not examined operative clauses**; direct Gallica image fetch returned HTTP 403. | Access Gallica/LLMC through permitted viewer or request a reproduction; transcribe debtor/creditor rules with page and line. |
| **1732-07-15-01, Duval succession account** | [Louisiana Historical Center record 2148](https://lacolonialdocs.org/document/2148) identifies **five French manuscript images**, a **15 July 1732 catalogue date**, and parties indexed as Bruslé, Prévost, Company of Indies and François Duval's succession. The earlier run noted a separate **15 January 1736** reference in an English index card. | **Modern metadata**, not a reliable transaction transcription. | Examine all five originals; reconcile every date with the 1930s WPA Black Book 21 translation/index and establish debit/credit direction before asserting a payment. |

**Important distinction:** a title mentioning *payement des dettes* states the subject of a decree, not who ultimately owed, assumed, extinguished or paid a debt. Neither a catalogue nor a court's award is a receipt. The two known imprints should be modeled as **two printings of one dated legal act**, not two fiscal events.

### People and sovereignty omitted from fiscal ledgers

The [Choctaw Nation of Oklahoma's Iti Fabvssa, 3 April 2023](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/), explicitly describes **Choctaw-led trade negotiations at Mobile in 1729**, the role of diplomatic kinship and gifts, and **Fort Tombecbe's establishment in 1736**. This community-authored account is historical interpretation of Choctaw diplomatic agency, not a Company debt record. It must not be used to equate HNOC's **'Youanis (Yazoo)'** in Salmon's January 1732 asset abstract with the **Haiyowvni/Youanis** post of the Choctaw negotiations, nor to invent Choctaw liability. BnF scholar [Catherine Desbarats's commercial-companies study](https://heritage.bnf.fr/france-ameriques/en/commercial-companies) also contextualizes the Company's colonial project as involving forced labor and severe mortality, which fiscal instruments alone cannot convey.

### Implementation and open evidence gates

The V1.4 liability ledger retains **six document leads** and leaves `paid`, `transfer`, and `liable` null for all. The strengthened validator cross-checks source IDs, archival dates, exact review levels, duplicate records and negative fixtures for fabricated payers, sums and directed transfers. The general research-data validator invokes it so PR CI can enforce these constraints. No cash payment, beneficiary receipt, Crown assumption, or investor identity has been established in this pass.

**Next source-verification task:** retrieve the two-page 1733 printing or 1731 Imprimerie royale copy, record a precise page-level excerpt of the operative clause(s), and only then consider a role-based liability mapping. Cross-check any reported settlements against original receipts or ledger postings; a royal order is not proof of disbursement.

## 24 October 2026: post-retrocession creditor and receipt *leads*, not confirmed payments

**Scope:** The [Louisiana Historical Center's Company of Indies person/document index](https://lacolonialdocs.org/person/9183/for/documents/14113) was checked for later legal-accounting material. This is a **modern archival index**, partly based on WPA synoptic translations, not a direct transcription of the French originals. The three rows below have been added as `doc-026`–`doc-028` and to the null-valued liability ledger.

| Indexed record / item URL | Archive's category and indexed participants | Evidence grade and what remains unknown |
| --- | --- | --- |
| [1735-10-19-02](https://lacolonialdocs.org/document/2450) | **Private Documents, Agreement with Creditors**; index includes Company of Indies, Lamy, Bruslé, Hugault, Prevost, Henry, Salmon, Rivard and variants. | **Catalogue only.** The parties' legal roles, terms, amount, signatures and performance are unread. Not evidence of a particular settlement. |
| [1736-08-20-04](https://lacolonialdocs.org/document/2689) | **Private Documents, Receipt**; index includes Guillon, Company of Indies, Hugault, Picquery, Henry, Labbe/Labe. | **Catalogue only.** A document *categorized* as a receipt is a promising target, **not** proof that the Company or Crown paid, who received, what was received, or that the matter concerns the 1731 debt act. |
| [1737-05-11-01](https://lacolonialdocs.org/document/3041) | **Private Documents, Receipt**; index includes de Livaudais, Baldic, de Chaumont Concession, Company of Indies, Amyault d'Ausseville and Faucon Dumanoir. | **Catalogue only.** Same limitations; no transaction, amount, asset or liability arrow is established. |

**Why this matters:** The 1731 decree question should be tested against **later instruments** as well as its own clauses. But merely sharing an indexed corporate name is not evidence that these three records concern the same debt or each other. In particular, do **not** construct a 1735 agreement → 1736 receipt → 1737 receipt causal or payment chain without matching original claims, counterparties and accounting references.

**Translation and inclusion warning:** The museum's [description of its digitization and indexing process](https://www.lacolonialdocs.org/post/8/the-process) says initial index entries relied on 1935–1942 WPA summaries and warns of numbering/spelling errors and **significant omissions of enslaved people's and women's names**. Consequently, absence from an index cannot establish absence from the underlying legal or economic event. A creditor's ledger is not a complete account of people subjected to forced labor or dispossession. Compare all available original manuscript faces and seek independent Indigenous and descendant-community histories rather than using colonial corporate documents alone.

**Reproducible verification route:** The [Louisiana State Museum's WPA Black Book index](https://louisianastatemuseum.org/louisiana-historical-center-colonial-documents) links Black Book **23 (July–December 1735)**, **26 (August 1736)** and **29 (March–May 1737)**. Their existence and coverage were checked, **not** their internal pages; the externally hosted PDFs were not available for direct examination here. First identify the matching WPA page and any original French page images, transcribe exact legal roles and sums, and check whether a dated signature or receipt actually documents consideration and delivery. Treat the earlier [1732 Duval account](https://lacolonialdocs.org/document/2148) separately (Black Book **21**), with its 1732/1736 catalogue-date ambiguity unresolved.

**Evidence gate:** `data/louisiana_liability_ledger.json` now contains **nine** explicitly reviewed document leads, all with `paid`, `transfer` and `liable` set to null. The validator requires catalogue-only status for the two newly indexed receipts and rejects invented payers, amounts, transfers, liability assignments and extra unreviewed fields. This milestone adds **research targets and guardrails**, not a verified disbursement or interpretation of the 1731 act.

**Priority after this pass:** (1) read the 24 February 1731 debt decree's operative clauses (1731 and 1733 printings); (2) transcribe the 1735 creditors' agreement and two later receipts, verifying whether any truly refer to the same obligation; (3) reconcile the 1732 Duval succession manuscript with WPA Black Book 21. No Crown assumption, Company settlement, receipted transfer or beneficiary amount should be asserted without original evidence.

## 26 October 2026: close the missing Duval-account provenance link

The V1.4 notes had discussed the **15 July 1732 Duval succession account**, but the structured archival documents and liability ledger omitted it. This was a **data coverage gap**, not new evidence of payment. The [Louisiana Historical Center item 1732-07-15-01](https://lacolonialdocs.org/document/2148) was checked directly at its museum index page: it is catalogued under **15 July 1732**, in the French Superior Council collection at New Orleans, with **five original manuscript pages** and indexed references to **Antoine Bruslé, Prévost, Company of Indies and François Duval's succession**. These are indexed subjects, not independently verified transaction parties. The page images were not transcribed.

The earlier English index-card reference to **15 January 1736** remains unresolved: do not replace the archive's 1732 date with 1736, or treat the two dates as separate payments. The record is now **doc-029** with a source-specific catalogue locator, and a **null-valued** row in the ten-entry Louisiana liability ledger. The validator enforces catalogue review level and rejects invented liability, transfer or payment values for this lead, as for all the others. This change does **not** establish that the account falls under the 24 February 1731 debt decree.

**Reproduction/transcription route:** compare each of the five French manuscript faces with the [Louisiana State Museum WPA Black Book 21 (1732–1734)](https://louisianastatemuseum.org/louisiana-historical-center-colonial-documents) and verify what the 1736 reference means. The WPA book was not examined in this milestone and is an imperfect later translation/index, not a substitute for the original. The museum warns that historical summaries can omit women's and enslaved people's names; do not use an index's silence as evidence that they were uninvolved. Independently examine Choctaw and other Indigenous histories rather than inferring colonial title or consent from French accounts.

**Highest-priority blocker unchanged:** obtain the operative clauses of the 24 February 1731 Company debt decree (1731/1733 printings) and check who owed whom, any authorized process, and whether subsequent signed receipts document actual performance. Gallica image access remains unavailable here; Columbia Law's bibliographic record identifies the 1733 two-page edition but does not expose its text in the catalogue. No invented debtor, investor, total, payment or Crown assumption is added.

## 28 October 2026: audited edition witnesses and original-access blocker

**Source access attempted, not source text read.** The 24 February 1731 debt decree remains the top uncompleted task in [issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). The BnF [curated Company collection](https://heritage.bnf.fr/france-ameriques/en/commercial-companies) identifies the 1733 edition at Gallica [ark:/12148/btv1b8602624n](https://gallica.bnf.fr/ark:/12148/btv1b8602624n), but a fresh direct fetch returned **HTTP 403**. [Columbia Law catalogue record 1505745](https://pegasus.law.columbia.edu/record/1505745) independently describes a **two-page 1733 Paris Saugrain–Prault printing** titled as an act **of 24 February 1731**. A [BnF Catalogue général filtered result, entry 39](https://catalogue.bnf.fr/affiner.do?afficheRegroup=false&critereRecherche=&index=&listeAffinages=FacPays_fr%3BFacNatDoc_a%3BFacLan_fre%3BAUT3_12495798&motRecherche=&nbResultParPage=100&numNotice=&triResultParPage=0&trouveDansFiltre=NoticePUB&typeNotice=), separately identifies a **1731 Imprimerie royale** printing. The BnF result-list address is not an individual notice permalink. These are **bibliographic witnesses**, not two different laws or direct inspection of debt provisions.

**Implementation:** `data/louisiana_decree_witnesses.json` records the inspected UMSL **23 January 1731 retrocession title page** and both **24 February 1731 debt-act edition leads**, keeping legal-act date, publication year, evidence level, source IDs, locators and access limitations separate. `scripts/validate-louisiana-decree-witnesses.js`, invoked from the main validator, rejects a fabricated 1733 act date, uninspected operative clauses, named legal debtors, payers and payments. This does not add a liability assignment or payment arrow. The separate eleven-row liability ledger is unchanged.

**What is established:** original royal *title-page* date for 23 January; institutional catalogues for two editions of the 24 February debt act. **What is interpreted:** that comparing the two editions may clarify how the Crown and Company understood creditor/debtor rules. **What is unresolved:** every operative article of the debt act, any textual variants, who was legally liable, collection versus disbursement, deadlines, settlement and actual receipts. No legal meaning is assigned from the title alone.

**Human context:** the royal documents describe French colonial claims; they do not establish Indigenous consent or legitimate transfer of Indigenous territory. Continue to use [Choctaw Nation's Iti Fabvssa](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) and community-affiliated research to restore Indigenous diplomatic agency, and account for the [Louisiana museum's warning](https://www.lacolonialdocs.org/post/8/the-process) about omitted enslaved people's and women's names in WPA summaries. No legal creditor record alone describes those people's lived experiences.

**Next concrete retrieval:** request or access a lawful high-resolution reproduction of the 1731 Imprimerie royale or 1733 Saugrain–Prault two-page debt decree, record page-specific French clauses, check edition variants and only then consider a sourced role-based liability ledger. A catalogue is not a transcript and a decree is not a receipt.

## 29 October 2026: two 1735 indexed promissory notes, not verified debts or payments

The Louisiana Historical Center's [Company of Indies index](https://lacolonialdocs.org/person/9183/for/documents/14113) separately classifies [1735-08-06-01](https://lacolonialdocs.org/document/2403) (6 August 1735) and [1735-09-01-02](https://lacolonialdocs.org/document/2420) (1 September 1735) as **Private Documents, IOU/Promissory Note**. The item pages confirm dates, French Superior Council collection context and original-language French. The August index lists Company of Indies, Maglelaine L'Eveque and Nicolas Pierron; the September index lists Company of Indies, Claude Boisson and Magdelaine Chesne. **These are modern indexed name strings, not firsthand verified signatures, genders, family links, debtors or creditors.** The original manuscript pages were **not read**: linked thumbnail access failed in this run. The records are now `doc-031` and `doc-032` with distinct source IDs and null-valued liability-ledger rows; the strict validator rejects fictitious promisor fields, amounts, payments and elevated review status.

**Interpretive possibility, not established:** These instruments might help test how corporate creditor claims persisted after the 1731 administrative retrocession, and whether they relate to the 30 March 1735 commodity ordinance. No such linkage has been shown. An IOU may memorialize a promise, not a completed disbursement; a catalogue category cannot establish even its contractual direction. Nor do indexed names prove that the two notes concern the same debt or the October 1735 creditor agreement.

**Representation:** The museum's [indexing-method statement](https://www.lacolonialdocs.org/post/8/the-process) explicitly warns of WPA omissions of women and enslaved people's names. Preserve their possible presence without fabricating identities or roles. Colonial credit instruments also cannot represent Indigenous sovereignty or consent; pair broader interpretation with [Choctaw Nation Iti Fabvssa](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) and other community-authored histories.

**Next task:** Obtain and read the actual 24 February 1731 debt decree's two pages, then transcribe these two original 1735 promissory notes and compare named obligations and any commodity provisions. No Crown liability, money movement, amount, or settlement is asserted by this update.

## 30 October 2026: original-correspondence route for post-retrocession paper-credit disputes

**Highest-priority primary-text blocker remains the 24 February 1731 debt decree.** The BnF/Columbia catalogue witnesses identify its date and printings, but neither edition's operative articles were read in this pass. A fresh targeted search did not locate an accessible verified transcription of those articles. Do not claim a new interpretation of the decree.

**New independently checked institutional catalogue:** Historic New Orleans Collection, *Guide to French Louisiana Manuscripts*, [notice 8350](https://surrey.hnoc.org/full_notice.php?id_document=8350), identifies a **12-page letter dated 30 September 1733**, New Orleans, **Superior Council of Louisiana to the minister**, on problems with Company-issued **notes and bills of exchange**; original archival locator **ANOM C13, vol. 16:166** (the calendar's notation). The **catalogue page was directly examined**, not the original 12-page French letter. It is now `doc-033` with a source record and null-valued liability-ledger entry.

**Secondary historical account, not direct decree reading:** Nancy Maria Miller Surrey, *The Commerce of Louisiana During the French Régime, 1699–1763* (Columbia University Press, 1916), **printed pp. 122–123**, describes a **15 October 1731** colonial ordinance reportedly ending circulation of Company paper as currency and treating notes as private contracts; a **30 October 1731** extension for distant holders; and a **30 September 1733** Superior Council action reportedly reducing the value of older notes. Her footnotes refer to French colonial archival records, including **ANOM série A, vol. 23** for the October 1731 ordinance. This passage was examined through a searchable digitized historical text; it is **Surrey's historical account**, not a transcription independently verified against the original French legal instruments. The [University of Alabama Press edition record](https://www.uapress.ua.edu/9780817384135/the-commerce-of-louisiana-during-the-french-regime-1699-1763/) identifies the 1916 study and its later republication; the [Google Books 1916 bibliographic record](https://books.google.com/books?id=5RJwAAAAIAAJ) identifies the edition. Her claims about note valuation are **not** coded as verified payments, actual redemptions or final debtor liabilities.

**Critical document-identity distinction:** the **30 September 1733 outgoing Council letter (ANOM C13, 16:166)** is not proven identical to the **30 September 1733 ordinance/action reported by Surrey**. Sharing a date and subject is insufficient to merge a letter, ordinance and monetary transaction. The 1733 correspondence is a useful original-source target for testing how post-retrocession paper claims were disputed; it does **not** prove the February 1731 decree governed those claims.

**Affected communities:** The Council and Company describe the perspectives of colonial officials and institutional creditors, not the sovereignty of Choctaw or other Indigenous nations, nor the full experiences of enslaved Africans. Continue comparison with Choctaw Nation's [Iti Fabvssa historical account](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) and the Louisiana Historical Center's [indexing warning](https://www.lacolonialdocs.org/post/8/the-process) about omitted enslaved people's and women's names. No unnamed person is inferred as debtor, investor, beneficiary or signer.

**Next evidence requests:** (1) obtain and transcribe the two-page 24 February 1731 debt decree (1731/1733 printings); (2) obtain ANOM C13 vol.16:166, 30 September 1733 Council letter, identify exact original folios and whether it references that decree; (3) separately retrieve ANOM série A vol.23 October 1731 ordinances and the alleged 30 September 1733 ruling; (4) match any actual receipted transfer against the 1735–1737 original account/receipt instruments. All fourteen liability-ledger leads still have **null payment, transfer and liability fields**.


## 14 November 2026 — BnF Recueil volume-one retrieval route

Added a candidate later-compilation access route for the 24 February 1731 Company-debt decree. The BnF Compagnie des Indes collection page links the 1755–1756 *Recueil* to Gallica ARK `bpt6k1102726`; the observed thumbnail endpoint returned HTTP 403 on 14 November 2026. A secondary bibliography identifies the Gallica object as T. 1, but the volume's contents, table of contents and any reproduction of the 1731 decree remain unexamined. The lead is stored separately in `data/louisiana_decree_retrieval_leads.json`, not as a decree witness. See [the dated retrieval audit](v1-4-bnf-recuel-volume1-retrieval-audit-2026-11-14.md). No financial or liability fields changed.

## 15 November 2026: resolve the BnF Recueil's four-volume access map (catalogue only)

The [BnF's stable bibliographic notice](https://catalogue.bnf.fr/ark:/12148/cb338513279), ARK `ark:/12148/cb338513279`, notice no. `FRBNF33851327`, was opened directly. It identifies Germain Dernis's *Recueil ou collection des titres...* as a Paris, impr. Boudet publication of **1755–1756 in four volumes**. The catalogue note says **T.4 contains a “Table générale chronologique des pièces contenues dans les volumes de la collection des privilèges de la Compagnie des Indes.”**

The same notice lists four digitized parts:
- T.1 — `NUMM-110272`, Gallica ARK `bpt6k1102726`
- T.2 — `NUMM-110273`, Gallica ARK `bpt6k110273k`
- T.3 — `NUMM-110274`, Gallica ARK `bpt6k110274z`
- T.4 — `NUMM-110275`, Gallica ARK `bpt6k110275b`

It also lists four microfilm shelfmarks: `MFILM V-13992` through `MFILM V-13995`. The rendered catalogue extract does not explicitly map each shelfmark to an individual volume, so the atlas stores the sequence without asserting a per-volume mapping.

I followed each of the four BnF “Consulter en ligne” links on 15 November 2026. All four Gallica item requests returned **HTTP 403**. The catalogue record was examined; no volume image, OCR, table of contents, or printed page was examined. The decree's presence in the compilation remains **not verified**.

**Research improvement:** The next search should begin with T.4's chronological table, not assume T.1 contains the act. Request a legible T.4 scan or use the listed BnF microfilm shelfmarks; search the index for the exact act date/title and “Louisiane”/“dettes”; only then inspect the cited volume and page. Keep this later compilation as a retrieval lead, not a decree witness, until its target text is read.

No liability, debtor, creditor, Crown assumption, settlement, amount, or payment is added. This is a French institutional catalogue of colonial-company legal materials, not a record of Indigenous consent or the experiences of enslaved people. Retain Choctaw Nation-authored historical context and the Louisiana Historical Center's warning that WPA-era abstracts omit many enslaved people's and women's names.



## 16 November 2026: 1731 Superior Council reorganization cross-check (scholarly references; originals unread)

Added a second scholarly source for the post-retrocession judicial/governance change. Khalil Saadani, “Le Gouvernement de la Louisiane Française, 1731–43,” *French Colonial History* 4 (2003), pp. 117–118, describes the disappearance of the Company's *Conseil de régie* and restoration of the *Conseil supérieur* under the 1716 edict, revoking the August 1719 provisions that had allowed Company directors to sit there. Saadani's note 3 (p. 131) cites AN, Archives de la Marine A1–69 fol. 20 as letters patent dated **24 May 1731**, alongside AN Colonies A22 fols. 134–135, A23 fols. 106–107, B55 fols. 634–635 and a C13A13 fol. 260 draft. Notes 5–6 also cite royal instructions dated 15 and 22 May. The article's main text says 22 May; its note 3 lists a related letters-patent record dated 24 May.

Alexandre Ribeaux, *Conflictualité* 5 (2026), PDF pp. 7–8 n. 39, cites a copy of an edict dated **22 May 1731** at ANOM COL F3 242 fol. 190, says Company directors were excluded from the Superior Council, and notes that the cited text does not mention judges in distant places. These are scholarly references; neither F3 242 fol. 190 nor A1–69 fol. 20 was read in this pass. The 22 May and 24 May records may be related copies, distinct instruments, or a citation/date discrepancy. Do not merge them until compared. The C13A13 fol. 260 item is a draft, not automatically the promulgated text.

The atlas now classifies doc-025 as scholarly_reference_only, adds extract-010, and records both references without inventing a director roster, remote-judge status, asset transfer or liability. Saadani pp. 117–118 also makes a monetary-indemnity claim concerning Company withdrawal; it is retained as an unverified secondary lead only and has not been added to the financial-flow or liability ledgers.

The [University of Louisiana at Lafayette Collection 329 finding aid](https://library.louisiana.edu/sites/library/files/Colonial_Louisiana_Records_COLL329.pdf), printed p. 6, confirms reel 580 contains ANOM F3 242. The reel and target folio remain unexamined. A1–69 fol. 20 must be requested separately; no microfilm mapping is asserted.

Choctaw Nation's community-authored [Iti Fabvssa account](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) is retained as context for Choctaw-led diplomacy and women's roles, not as evidence of a response to the 1731 edict or Indigenous consent to French territorial administration.

**Next:** obtain and compare F3 242 fol. 190 and A1–69 fol. 20; then resume the central task of transcribing the 24 February 1731 Company-debt decree. Issue #24 remains open.


## 17 November 2026 — 23 January 1731 retrocession decree: three-page printed facsimile examined

**New primary-print witness, with reproduction limits.** The Canadian Institute for Historical Microreproductions / Institut canadien de microreproductions historiques (CIHM/ICMH) PDF of *Arrest du Conseil d'Estat du Roy, concernant la rétrocession faite à Sa Majesté par la Compagnie des Indes, de la concession de la Louisiane & du pays des Illinois* was opened and all three printed pages were visually examined. The title page dates the act **23 January 1731** and the colophon reads **Paris, Imprimerie royale, M. DCCXXXI**. The accessible file is a **1985 microfiche reproduction**, not the physical original: its technical notes state 22X reduction, identify the **Seminary of Quebec Library** as the source of the filmed copy, and flag discoloured/show-through pages. See the [microfiche facsimile PDF](https://upload.wikimedia.org/wikipedia/commons/7/7f/Arrest_du_Conseil_d%27Estat_du_roy%2C_concernant_la_retrocession_faite_%C3%A0_Sa_Majest%C3%A9_par_la_Compagnie_des_Indes_%28IA_cihm_50701%29.pdf), PDF page indices 4–6 (zero-based), corresponding to the unnumbered title/first-text page and printed pp. 2–3. The front matter is at PDF pp. 1–2.

### What the printed decree says

The first page identifies the petition as presented by the Company's directors and syndics, authorized by a Company deliberation of 22 January. On printed p. 2, the King accepts the retrocession made by the syndics and directors “pour, & au nom de ladite Compagnie” of the *propriété, Seigneurie & Justice* of Louisiana and its dependencies, together with the “pays des Sauvages Illinois”; it also lists the places, forts, buildings, artillery, arms and troops then present. The same page accepts return of the Company's exclusive-trade privilege. Printed p. 3 declares Louisiana commerce free to the King's subjects, then maintains the Company's rights against its debtors in the province, which it may exercise as it judges appropriate. The decree is signed “PHELYPEAUX” and the colophon names the Imprimerie royale.

The full French transcription is stored page by page in the source_extracts data as extract-011 and rendered in the public source-reading explorer when the retrocession1731 case is selected.

### Collation with the contemporary *Mercure de France* extract

The March 1731 *Mercure de France*, pp. 610–611, is separately available through the [Bureau du Mercure OCR transcription](https://bureaudumercure.org/mercure/term/domain?domain=186&page=2), lines 4999–5027 of the opened page. Its entry is an abridged contemporary extract headed “AUTRE du même jour.” The key retained-rights clause agrees in substance with printed p. 3 of the royal impression: the Company is maintained in its rights against its Louisiana debtors. The periodical OCR abbreviates “Sa Majesté” as “S.M.” in places, regularizes some spellings, and differs in punctuation. It is therefore a useful contemporary textual cross-check, not a word-for-word diplomatic duplicate. The Bureau du Mercure portal warns that its contents are provisional/incomplete; its page image was not examined in this milestone.

### Evidentiary distinctions

- **Directly examined:** all three printed pages of the 1731 royal decree in a 1985 microfiche facsimile; the microfiche front matter; the separate Bureau du Mercure OCR extract.
- **Not examined:** the physical 1731 copy at the Seminary of Quebec Library; ANOM COL F3 242 fol. 187; the March 1731 Mercure page image.
- **Interpretive caution:** the phrase “sans que la Compagnie en puisse estre chargée à l’avenir” follows the return of the exclusive-trade privilege and the declaration of free trade. It should not be treated as a blanket discharge of the Company's separate debts. The same decree expressly preserves Company creditor rights against Louisiana debtors. This is a contextual reading, not a transcription of the separate 24 February debt decree.
- **Still unknown:** no debtor, amount, collection, receipt, payment, settlement or Crown assumption of Company liabilities is identified by this 23 January instrument. The separate 24 February 1731 Company-debt decree remains catalogue-only and its operative clauses remain unread.

### Affected-community context

The decree's phrase “pays des Sauvages Illinois” and its language of *propriété, Seigneurie & Justice* describe the territory through French royal/Company legal categories. They do not record Indigenous consent. The [Peoria Tribe of Indians of Oklahoma's own history](https://www.peoriatribe.gov/204/History) identifies the Peoria Tribe as a sovereign nation and a confederation of Kaskaskia, Peoria, Piankashaw and Wea peoples, describes its Illinois/Illini identity and homelands, and records nineteenth-century removal. This is community-authored present-day historical context, not a direct response to the 1731 decree and not a claim to speak for every Illinois/Illini descendant nation. The decree does not identify enslaved people or prove that people were among the listed material assets; their histories require separate records and community-aware research.

**Implementation:** added source records for the CIHM/ICMH facsimile and Peoria Tribe history; upgraded doc-022 to microform_facsimile_text_examined; added extract-011 with three page-level transcription segments; updated the event and witness provenance; changed only the ledger's review label to facsimile_text. paid, transfer and liable remain null. Added a dedicated validator, integrated it into the main integrity script, updated the existing witness/liability/retrocession validators, and exposed the transcription in the public explorer. The 24 February debt-decree witnesses remain unchanged and catalogue-only.

**Next:** obtain a higher-resolution copy or inspect the physical Seminary of Quebec exemplar and ANOM COL F3 242 fol. 187; collate the Mercure page image. Above all, obtain both pages of the **24 February 1731 Company-debt decree** and transcribe its operative clauses before mapping any debtor or liability.


## 18 November 2026 — 1903/1904 exhibition-catalogue retrieval trail for the 24 February 1731 debt decree

Two catalogue page images were visually examined, not the decree itself. The Louisiana Historical Society's 1903 *Catalogue of the Colonial Exhibit and Loan Exhibit* (New Orleans, 20 Dec. 1903), printed p.17 (PDF page index 18), lists item 345 as the 24 February 1731 Company-debt decree and credits it to “Mr. Gaspar Cusachs”; the same page lists item 342, the 23 January 1731 retrocession decree, with the same Owner-column attribution. The independent *Exposition Française de la Louisiane, St. Louis 1904* catalogue, printed p.21 (PDF page index 24), Section I, “b—Législation”, item 72, lists a debt decree with the same subject and 24 February 1731 date. It supplies no item-level owner. Its preface p.2 thanks G. Cusachs for access to collections generally; that does not assign item 72 to him.

**Evidence level:** both are visually examined exhibition-catalogue pages. The 1903 item is a historical catalogue attribution in a loan exhibit, not a verified current location or chain of custody. The 1904 item is an independent catalogue listing, not a second physical copy. The catalogues do not prove that their entries refer to the same copy or to any BnF/Columbia/LLMC witness. No operative debt clause, debtor, creditor role, liability, settlement, receipt or payment is established. doc-024 remains catalogue_metadata_only; paid, transfer and liable remain null.

The new custody-lead data and validator keep 1903 item-level attribution separate from the 1904 record's null owner. Next: request the 1903 Louisiana Historical Society loan-exhibit register, accession correspondence or surviving Cusachs collection documentation for items 342 and 345, without presuming a present repository. Continue to seek both pages of the 1731 Imprimerie royale and 1733 Saugrain–Prault printings.


## 19 November 2026 — Duval succession account: index-card transcription and unresolved 1732/1736 chronology

I opened the Louisiana Historical Center's [record 1732-07-15-01](https://lacolonialdocs.org/document/2148), which the record page labels a five-page French Superior Council item dated **15 July 1732**. I opened all five browser-accessible image derivatives (asset IDs **125822, 125818, 125819, 125820 and 125821**). The first is English typed index card **#6558**; the other four are handwritten account/manuscript images. Their handwritten entries were not reliably transcribed. The derivatives are not the preservation TIFF masters. The LHC's [process note](https://www.lacolonialdocs.org/post/8/the-process) says written master scans are 600 dpi, and that initial indexing began in 2014 using WPA summaries made 1935–1942; it warns of numbering/spelling errors and significant omissions of women and enslaved people's names. The particular card's author/date and whether it is itself a WPA abstract are not established.

### Index-card transcription (English; not the original account)

> #6558 — YEAR 1732 JULY 15 — STATEMENT OF ACCOUNTS DUE FROM THE IND. CO. — Statement showing closing of account of Sr. Francois Duval, former Cashier-General of the India Company, with said Company as of 15 January 1736, showing a balance due the company by the Succession of Sr. Duval, of 101,975 livres 6 sols 2 deniers. (Signed) On July 15, 1732, by Bruslé. On January 15, 1736, by Prevost. Not printed in Louisiana Historical Quarterly.

### What is and is not established

- **Directly examined:** the LHC record page, the English index card image, and four handwritten image derivatives (visual inspection only).
- **Index-card claim:** the card's prose reports a balance of **101,975 livres 6 sols 2 deniers** due to the Company by the succession of Sr. Duval as of 15 January 1736. The card says Bruslé signed on 15 July 1732 and Prévost on 15 January 1736.
- **Internal conflict:** the card's heading says “DUE FROM THE IND. CO.”, while its prose says the balance was due the Company by the Duval succession. The 15 July 1732 record label, 15 January 1736 account date and two sign-off dates are not reconciled. We do not decide whether the item is composite, an account begun in 1732 was closed in 1736, or the card/catalogue contains an error.
- **Not established:** the handwritten account's actual entries, legal debtor/creditor classification, enforceability, collectible receivable, payment, settlement, or connection to the 24 February 1731 decree. No financial-flow entry was added; the liability ledger keeps paid, transfer and liable null.
- **Representation:** the LHC says WPA abstracts omit many women and enslaved people's names. Their absence from this English index card is not evidence of absence from the underlying pages. This is a Company accounting record and does not express Indigenous consent or the perspectives of enslaved people.

The public record remains doc-029; its review level is now index_card_transcribed_manuscript_unread. extract-012 transcribes the index card only, not the underlying handwritten account. Next: obtain the preservation TIFFs or inspect them in person; resolve the card's chronology and direction conflict; compare any named claim against court orders and a separate receipt before adding any liability or payment.


## 2026-11-20 — LHC RG3/RG377/RG1 accounting-source and decree-retrieval audit

- Examined the LSM Historical Center's RG3 (June 2013), RG377 (August 2022) and 2024 manuscript-collections finding aids. These are catalogue/finding-aid examinations, not original-text examinations.
- Added RG3 1852.30 (11 Dec 1725; four pages), a catalogue-described resolution concerning Company-furnished enslaved people who had not been paid for; and RG3 1852.36 (14 Oct 1726; two pages), an appointment of La Chaise and Perrault to audit Company accounts. No original pages or audit results were examined.
- Added RG377 record 1729021501 (15 Feb 1729; Series B43:846–864; 43 sheets), whose finding-aid summary covers active/inactive debts, payment of debts of the “old company,” silver and bills, ship expenses and slave cargoes. The “old company” is not identified in the finding aid.
- Checked the RG377 published contents list for 24 Feb 1731; no matching entry was found. The final listed item is a 28 Feb 1731 sailing instruction in Box 8. The summary says nine boxes, but no Box 9 heading appears in the published contents list. This is an unresolved inventory discrepancy, not proof the decree is absent.
- Added RG1 as a collection-level lead: 1714–1769, 108 linear feet/216 boxes plus eight oversize boxes; the 2024 LSM guide describes creditor recovery cases, successions, commercial records and petitions by enslaved people seeking manumission. No individual cases were identified.
- Added a UW-authenticated LLMC Digital route for Columbia record 1505745 / LLMC1338688796. Exact item availability in the UW instance is unconfirmed; this is not public access.
- No financial-flow record, debtor identity, amount, payment, settlement, audit result or link from these earlier records to the 24 Feb 1731 decree was added. The decree remains catalogue-only.

- Further RG377 entries identified on 20 Nov 2026: 1729081301 (13 Aug 1729; Series B43:868–869; 2 sheets), an order for four enslaved people with catalogue-described in-kind payment terms of tobacco or local produce at 1,000 livres each over three harvests after delivery; 1729083001 (30 Aug 1729; B43:871–872; 3 sheets), an order naming Sieur de Lorme to render and balance Louisiana accounts; and 1729090601 (6 Sep 1729; B43:872–877; 12 sheets), 21 procedures for de Lorme to examine accounts. These are finding-aid descriptions only: no delivery, payment, completed audit, account balance or direct connection to the 1731 decree is established. The 30 Aug/6 Sep relationship remains a hypothesis for original-text comparison.
- The 2024 LSM guide states RG3 has been microfilmed; the guide does not give a reel identifier. Request the reel number alongside RG3 accessions 1852.30 and 1852.36.


## 21 November 2026: upgrade the 1736 Guillon–Labbé receipt lead from catalogue to index-card evidence

The [Louisiana Historical Center record 1736-08-20-04](https://lacolonialdocs.org/document/2689) is dated **20 August 1736**, is attributed to the French Superior Council in New Orleans, and is categorized by the archive as **Private Documents, Receipt**. I opened the three displayed 800x0 JPEG derivatives: typed English index card **#6022** and two handwritten manuscript-page images.

The card's exact summary reads:

> Receipt to Jean Labbe for price of negro sold to Guillon, which was part of the 5845 livres for which Labe was indebted to the Company.

The card also cites *Louisiana Historical Quarterly*, vol. 8, no. 3 (July 1925), p. 489, “2nd Doc.” The Louisiana Historical Center's [journal inventory](https://static1.squarespace.com/static/58092328579fb31efea7a49e/t/5f5a551feaa9c51a0d6442de/1599755552950/LHCLHQInventory.pdf), first table, lines 34–37, independently confirms that volume 8, no. 3 is the July 1925 issue. The printed page 489 and the two handwritten pages were **not** transcribed.

### What is documented at this evidence level

- The LHC record page's date, archive category, source field and indexed names.
- The exact English index-card wording and its reported 5,845-livre indebtedness.
- Two handwritten page-image derivatives exist and were opened; their text remains unread.
- The card's bibliographic pointer to LHQ 8.3, July 1925, p.489, second document; the LHC inventory confirms the issue's existence.

### What is not established

The card does **not** verify the 5,845-livre balance, the separate sale price, payer/payee roles, the receipt's legal effect, whether money or another form of consideration was delivered, whether the price was credited to the Company's account, or whether any debt was discharged. The record date is not proven to be the sale or payment date. No link to the 24 February 1731 decree is established. No financial-flow row was created; the ledger's `paid`, `transfer` and `liable` fields remain null.

The card uses a colonial term for an unnamed person and does not preserve that person's voice. The LHC [digitization and indexing method](https://www.lacolonialdocs.org/post/8/the-process) says written preservation masters are 600 dpi TIFFs and that initial indexes used WPA synoptic summaries; it warns that those abstracts omit many enslaved people's and women's names. That warning is relevant to the archive as a whole, but this specific card is **not proven to be a WPA abstract**. The original manuscript pages, not this card, must be read before interpreting the transaction.

### Retrieval request now specified

Request the 600 dpi preservation TIFF masters for record ID `1736_08_20_04` and ask the archivist to confirm the page/side filenames under the published convention. Obtain LHQ vol. 8, no. 3 (July 1925), p. 489, second document. Compare the 1925 printed item, the original French pages and WPA Black Book 26 (1736 August) as distinct witnesses. Determine whether the original text records a receipt, a credit against the reported debt, or another legal act. Do not connect this record to the 1731 decree unless its original wording supplies an explicit cross-reference.

**Implementation:** `doc-027` now has access level `index_card_transcribed_manuscript_images_previewed_not_transcribed`; `extract-013` transcribes only the card; the ledger review level is upgraded but all payment/transfer/liability values remain null. A new retrieval lead and negative validator fixtures prevent the card from being promoted to an original transcription, a verified debt balance, a payment, or a witness to the 1731 decree.


## 22 November 2026: C 13c Company-to-Treasury memoir and 1735 half-reduction reply

The Historic New Orleans Collection's Surrey Calendar adds two separate financial-correspondence leads:

- **Item 7589:** estimated [2 September 1732], 5-page memoir, ANOM C 13c 1:41, described as concerning an amount due the French treasury by the Company of the Indies because of retrocession. The abstract's direction is Company-to-Treasury, but the memoir is unread; no amount, adjudication or payment is established.
- **Item 8981:** [20 April 1735], 19-page reply, ANOM C 13c 1:318, described as answering a Council of Louisiana memoir about a one-half reduction of the Company's outstanding Louisiana debts. The abstract does not specify whether the debts were owed by the Company or owed to it, who authored the reply, or whether a reduction was approved or executed.

A new access route is now precise: the University of Louisiana at Lafayette's Collection 329 finding aid, section II.F, printed p.4, lists **ANOM C 13c volumes 1–4 on reels 539–541**. It does not map volume 1, folios 41 or 318, to an individual reel/frame. The microforms service page describes readers and scanning/copy services, but item-level access and public-access status remain unconfirmed. Ask UAAMC to identify the correct reel/frame and request the five and nineteen pages.

Do not equate the 1735 C 13c 1:318 reply with Nancy Maria Miller Surrey's 1916 account (printed pp.122–123) of 50-percent reductions/retirement of Company paper notes in 1729–1733. Surrey cites ANOM C 13, vol.16, fols.166–177, a distinct series/volume. A relationship is a hypothesis until the C 13c original is read.

The direction audit now distinguishes: (1) the 23 January 1731 decree's Company creditor-rights clause; (2) the 1732 memo's catalogue-described Company-to-Treasury claim; and (3) the 1735 reply's unresolved debt direction. These are not a unified balance or settlement chain. Documents doc-040 and doc-041 remain catalogue-only; no amount, liability adjudication, transfer or payment was added. No financial-flow record was created, and the 24 February 1731 debt decree remains unread.


## 23 November 2026: Salmon's 14 August 1734 debt-remission letter — catalogue cross-check, not original transcription

**Repository state:** Starting `main` was `d177ff7e0b87531a10e41ae16b878177ba7a823e`; issue #24 remained open and no PRs were open. The 24 February 1731 debt decree remains catalogue-only and its two operative pages remain unread. This milestone adds a distinct 1734 correspondence record; it does not repeat the January 1731 retrocession facsimile transcription.

### Archives de la Nouvelle-France item 31196

The [Archives de la Nouvelle-France item record](https://nouvelle-france.org/fra/item/details?id=31196) identifies a French-language letter by Salmon to the minister, dated **14 August 1734**, place of writing **New Orleans**, responding to a ministerial dispatch of **16 February 1734**. It lists **10 images** and identifies the repository as the Archives nationales d'outre-mer (France), reference **COL G1 464/10p., CABAC_PIAF_6888_CABAC_PIAF_6888**.

The portal's catalogue description says the minister charged Salmon with ending disputes between the Company of the Indies and Louisiana inhabitants/concessionnaires over repayment of advances for houses, and that Salmon requested remission of half the debts because of insolvency attributed to bad years. The French catalogue phrases transcribed in `extract-014` are short metadata excerpts only; the ten images were **not** examined or transcribed. The date is the catalogue's letter date, not a date of decision, remission or payment.

### Secondary cross-check: Saadani (2008), printed pp.27–29

Khalil Saadani, *La Louisiane française dans l'impasse, 1731–1743* (Paris: Éditions L'Harmattan, 2008), accessible preview pp.27–29, describes the wider post-retrocession disputes between the Company and Louisiana inhabitants/concessionnaires. The excerpt discusses debts owed in both directions, proposals to reduce claims, the 30 March 1735 ordinance fixing prices for produce accepted against Company debts, and later collection measures. It reports that debtors were restricted from selling enslaved people or immovable property without written permission. Bibliographic details were cross-checked against [L'Harmattan's publisher record](https://www.editions-harmattan.fr/catalogue/livre/la-louisiane-francaise-dans-limpasse/49085).

This is a **secondary synthesis**, not a transcription of the 1734 letter or 1735 ordinance. The accessible excerpt does not include notes 33–46; the original folios underlying each passage were not independently checked here. Saadani's narrative is contextual corroboration of the debt-dispute setting, not proof that item 31196 is the same document as HNOC item 8981 or that a requested remission was granted.

### Claim direction and unresolved relationships

At catalogue level, item 31196 describes the Company as seeking repayment of house advances from inhabitants/concessionnaires. Salmon's request for a half remission is a request, not an approval. No amount, named debtor, decision, payment or settlement is recorded in the item metadata.

The apparent relationship to HNOC Surrey Calendar item 8981 ([20 April 1735], ANOM C 13c, 1:318), which is catalogued as a reply concerning one-half reduction of the Company's outstanding Louisiana debts, remains **unverified**. These records differ in date and archival series (COL G1 464/10p. versus C 13c, 1:318). The 30 March 1735 A 23:118 commodity ordinance is another distinct instrument. Compare them only after reading the originals and locating an explicit cross-reference.

### Human and community context

The 1734 letter is a colonial administrative/creditor perspective. It does not preserve the voices of the inhabitants, enslaved people or Indigenous nations. Saadani's account of debt-collection restrictions involving enslaved people is important context, but it must be tested against the ordinance and judicial records; it is not a reason to encode people as neutral collateral. The atlas continues to distinguish French Company correspondence from community-authored Choctaw and Peoria histories and from the Louisiana Superior Council's separate manumission-petition records. No Indigenous consent is inferred from colonial correspondence.

### Implementation and evidence gates

- Added `doc-042` as catalogue-only and `evt-1734-salmon-house-advance-letter` as unresolved/catalogue-only.
- Added `src-anom-1734-salmon-letter-catalogue` and `src-saadani-2008-louisiana-impasse`.
- Added `extract-014` with short French catalogue excerpts, explicitly not original letter text.
- Added a non-transactional claim-direction entry for Company claims to recover house advances, with no amount, named debtor or adjudicated liability.
- Added a retrieval lead for the ten images and updated negative validators.
- Added one abstract-level row to the review ledger; `paid`, `transfer` and `liable` remain null. No financial-flow record was created.
- The 24 February 1731 debt decree (`doc-024`) remains `catalogue_metadata_only`; its operative text is unread.

**Next retrieval:** obtain all ten images of COL G1 464/10p.; transcribe the original French; identify the 16 February 1734 dispatch and any attached accounts or decisions; then compare with C 13c, 1:318 and A 23:118 only if the originals supply direct documentary links. In parallel, continue the highest-priority task: obtain both pages of the 24 February 1731 debt decree through the Columbia/LLMC or BnF route and transcribe its operative clauses.


## 24 November 2026 — 24 January Company-register copy and retrocession consideration

The Louisiana Historical Center's record 1731-01-24-03 was re-examined through 24 accessible 800px image derivatives (24 of 48 image links). The internal header identifies Ministry of Marine and Colonies archives and Company of the Indies cartons; the copy's 20 September 1889 certification says the extracts conform to a collated archival copy. This is an **1889 certified copy**, not the original 1731 Company register. The LHC catalogue's "French Superior Council" label remains a provenance discrepancy.

The copied 24 January 1731 Company committee deliberation quotes a royal message dated at Marly, 22 January: the Secretary of State's 3,600,000-livre estimate was reduced by the King to 1,450,000 livres. The ten-year schedule is 200,000 in each of the first three years, 150,000 in each of the next three, and 100,000 in each of the final four. The Company assembly authorized directors to submit an undertaking to pay the 1,450,000 livres, subject to further royal order and form. This is a Company-to-Crown obligation candidate, not proof of a final implementing order or any payment. It is separate from the unread 24 February 1731 Company-debt decree.

The petition also describes a proposed alternative of retaining exclusive trade while supplying 500 enslaved people annually; this is not evidence of actual shipments. The Company's Natchez narrative is a colonial corporate perspective. The atlas now pairs it with the Natchez Nation's official self-description and NPS historical context without treating colonial descriptions of dispersal as proof that Natchez people ceased to exist.

See [the 24 November research dossier](v1-4-1731-jan24-company-register-copy-and-retrocession-consideration-audit-2026-11-24.md). The original 1731 register, royal implementing order, Treasury receipts and 24 February debt-decree text remain outstanding.


## 25 November 2026: Cusachs/LHS collection-scope audit

The 1903 catalogue's item 345 historically credits the 24 Feb 1731 debt decree to Mr. Gaspar Cusachs, but this does not establish current custody. The LSM inventory identifies RG23 Louisiana Historical Society papers, accession T025.2003.13 (6 linear feet, 1877–c.1939, correspondence/minutes) as a concrete retrieval route for 1903 exhibit registers and disposition records. The same inventory lists RG431 Gaspar Cusachs Loan (accession range 00108–7675, 1740–1925, 1.5 linear feet and one oversize box); its summary does not itemize the decree. The April 2025 RG112 Gaspar Cusachs Estate guide describes accessions 09894.2–.123 / 2017.001.06–.12.5, 1770–1904, 2 boxes/100 folders, open and digitized on request, and lists a 1763 indenture (09894.117) outside its stated date range. Therefore date ranges are not strict lower bounds and cannot prove the 1731 print absent. None of RG23/RG431/RG112 has an item-level match to doc-024 or the 1903 item 345; no current custody is verified. Request RG23 exhibit loan/disposition records, plus RG431/RG112 item-level inventories, before making a custody claim.


## 25 November 2026: RG112 item-level exhibit invitations refined

The April 2025 RG112 finding aid's contents list (PDF p.10) itemizes: folder 15 / 2017.001.07.1, a 1903 invitation to Gaspar Cusachs for the Louisiana Historical Society colonial museum opening at the Ursuline Convent; folder 17 / 2017.001.07.3, a December 1903 transfer-centennial invitation; folder 18 / 2017.001.07.4a–c, 1903 costume-ball invitation/tickets; folder 20 / 2017.001.08.2, 16 September 1904 reception invitation; and folder 21 / 2017.001.08.3, 14 September 1904 Louisiana Day invitation. These strengthen the RG112 retrieval route for exhibit context but do not link the 1731 decree item 345 to the estate/loan collection, prove it was displayed, or establish current custody. Request these folders and the RG23 1903 exhibit loan/disposition records separately.


## 27 November 2026: scope-check a separate 1744–1745 colonial-regulations compilation

**New retrieval lead, not a decree witness.** A separate two-tome colonial-regulations compilation was found as public digitized files on Wikimedia Commons. Commons metadata identifies Tome I as 1744 (218 pages) and Tome II as 1745 (373 pages), and names the Bibliothèque nationale de France as source while also carrying a John Carter Brown Library collection field. These metadata fields have not been reconciled; no physical copy, title page, or page image was examined.

- [Commons Tome I file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu)
- [Wikisource book-level contents transcription for Tome I](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu)
- [Commons Tome II file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu)
- [Wikisource book-level record for Tome II](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu)

The Tome I contents transcription (table of contents noted at printed p.211) lists colonial regulations including the Louisiana Code Noir of 1724 (p.135), a 1734 slave-trade certificate ordinance (p.188), a 1736 manumission/baptism ordinance (p.202), a 1738 declaration about enslaved people (p.156), and a 1742 exemption ordinance connected to slave-trade products (p.205). It does **not** list the 24 February 1731 Company-debt decree in the examined contents list. This is a negative check of that contents transcription only; the page image itself was not examined, and the collection is not a comprehensive list of all royal decrees.

A metadata discrepancy also requires care: Wikisource's book metadata labels the file ending I.djvu as “tome 2” and II.djvu as “tome 1”, opposite the Commons file labels. Verify both title pages before citing a volume/page. The Tome II contents have not been examined; its last Wikisource page (373) is marked not intended to be corrected and contains no transcription.

The collection's law titles include regulation of enslavement and manumission. These titles identify colonial legal subjects, not enslaved people's lived experience or Indigenous consent. They are not used to infer a debt payment, liability, or beneficiary. Existing Choctaw, Peoria, and Natchez community-authored records remain separate and are not represented by this royal-law compilation.

Repository implementation: add three provenance sources, one bounded retrieval/scope-check lead, update doc-024, and add a validator preventing this contents list from being promoted to direct text or a witness. `paid`, `transfer`, and `liable` remain null; no financial-flow record or source extract was added.


**Validation history:** CI caught five fixture issues, corrected in the branch: `printed_toc_page` was missing from the strict key schema; a test regex mismatched Arabic/Roman volume labels; a locator assertion required 'examined' where the source wording used 'examination'; a negative fixture mutated the Tome II unexamined flag without a corresponding guard; and another changed a volume year without the validation helper checking identity. The source locator now explicitly states the printed page image was not examined, and the helper checks volume identity, provenance IDs and the Tome II flag. The workflow path filter includes individual `scripts/validate-*.js` changes so future validator edits trigger research CI. Final checks are pending.
