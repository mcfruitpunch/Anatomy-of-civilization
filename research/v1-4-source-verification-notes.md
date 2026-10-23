# V1.4: Louisiana liabilities, 1731–1732

Six dated documentary leads are catalogued in `data/louisiana_liability_ledger.json`. The original debt decree clauses and Diron judgment remain unread. No named legal debtor or actual payment has been verified.

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
