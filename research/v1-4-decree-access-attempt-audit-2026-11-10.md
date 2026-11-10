# V1.4 — 10 November 2026: debt-decree catalogue cross-check and access-attempt audit

Related: [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This milestone improves retrieval provenance; **it does not transcribe either edition or assign a liability**.

## Repository state checked first

- Default branch: `main`, latest commit before this work: `ab94fda98d1dff75992d6868cc636595ceef81e7` (PR #39 merge).
- No open pull requests were returned by the repository-scoped PR search.
- [PR #39](https://github.com/mcfruitpunch/Anatomy-of-civilization/pull/39) is merged. Its head commit's GitHub Actions run #61 completed successfully; the merged commit itself exposes no separate combined status in the connector.
- [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24) remains open. Its operative-clause request is still the highest-priority uncompleted source task.

## New institutional catalogue cross-check

The Bibliothèque nationale de France's *Patrimoines Partagés — France-Amériques*, “Compagnie des Indes” collection page:

https://heritage.bnf.fr/france-ameriques/en/compagnie-indes

was opened on 10 November 2026. Its collection list separately presents:

1. the **1731** Council of State act concerning retrocession of the Louisiana and Illinois concession;
2. the **1733** item titled as concerning payment of the Company's Louisiana debts; and
3. a **1755–1756** compilation of Company titles and regulations.

Clicking the 1733 debt item resolves to the Gallica identifier:

https://gallica.bnf.fr/ark:/12148/btv1b8602624n

This is a verified institutional navigation path and catalogue association. The existence of the 1755–1756 compilation is **not** evidence that it reproduces the 1731 debt decree; no such contents claim is made here.

## Dated access attempts recorded

| Date | Institution / record | Result | What was actually examined |
| --- | --- | --- | --- |
| 10 Nov 2026 | BnF Catalogue général, filtered France / Conseil d'État result 39 | The result identifies `[Acte. 1731-02-24. Versailles]`, *Arrest du Conseil… concernant le payement des dettes de la compagnie des Indes à la Louisiane*, Imprimerie royale, publication year 1731. No stable item-level permalink was resolved. | Search-result catalogue metadata only. No printed page. |
| 10 Nov 2026 | BnF Patrimoines Partagés collection page | The 1733 debt item links to Gallica ark `btv1b8602624n`. | Curated collection page only. |
| 10 Nov 2026 | BnF Gallica, ark `btv1b8602624n` | Direct item request returned **HTTP 403 Forbidden** in this research environment. | No image or operative text. |
| 10 Nov 2026 | Columbia Law Library record 1505745 | Search result exposed the bibliographic record; direct page open returned **HTTP 502 Bad Gateway**. | Catalogue metadata only: 1733 Paris Saugrain–Prault imprint, two pages, title dated 24 February 1731, LLMC1338688796, OCLC 27416388, Wroth & Annan no. 1214. |

The Columbia record is:

https://pegasus.law.columbia.edu/record/1505745

## What can and cannot be said

**Documented bibliographic facts:** the BnF search result describes a 1731 Imprimerie royale printing for an act dated 24 February 1731; Columbia's catalogue describes a separate 1733 Saugrain–Prault, two-page printing whose title also dates the act to 24 February 1731. BnF's curated portal links the 1733 item to the Gallica ARK above.

**Scholarly / catalogue interpretation:** these are two catalogue-level witnesses associated with the same dated legal act. Their substantive textual equivalence, completeness, and any variant clauses have **not** been established by collation.

**Unresolved:** the operative debtor and creditor definitions; whether any obligations were retained by the Company, assumed by the Crown, or assigned to another party; eligible claims; valuation; deadlines; enforcement; and whether any later account or receipt records actual performance. The word *payement* in the title does not prove a payment.

No financial-ledger field, liability relationship, amount, payer, payee, settlement or transfer was changed.

## Human and community context

Catherine Desbarats's BnF scholarly overview explains that early-modern French commercial companies could combine legal personality, property ownership, borrowing, litigation and state-backed colonial powers; it also places the Company within imperial circuits involving African captives and forced labor. This is contextual scholarship, **not** a reading of the 1731 decree:

https://heritage.bnf.fr/france-ameriques/en/commercial-companies

The Choctaw Nation of Oklahoma's community-authored *Iti Fabvssa*, “Fort Tombecbe and Early Choctaw Treaties” (3 April 2023), describes Choctaw diplomacy as active negotiation, including the 1729 trade-post treaty and the role of Choctaw women. It distinguishes the 1736 Fort Tombecbe from earlier trading posts. This perspective restores Choctaw agency but does **not** identify a debtor or establish consent to French jurisdiction:

https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/

The Louisiana Historical Center's own account of its digitization process states that WPA summaries (1935–1942) can contain numbering errors, inconsistent spellings and significant omissions of enslaved people's and women's names. Therefore absence from an index cannot be treated as absence from the event:

https://www.lacolonialdocs.org/post/8/the-process

The decree is a French royal legal instrument. It does not represent the voices, consent or lived experience of Indigenous nations or enslaved people.

## Next source-verification action

Request from BnF or Columbia/LLMC a legible reproduction of **every page** of either the 1731 Imprimerie royale printing or the two-page 1733 Saugrain–Prault printing. Record the stable item identifier, edition, page sequence and image provenance. Transcribe the original French clauses with page-specific locators, keep literal translation separate from legal interpretation, and collate the two printings before claiming identical rules. Only then map the roles of claimant, legally obligated party, decision-maker and authorized performer; check actual payment separately against original receipts or ledger postings.

Until an original page is examined, `doc-024` and both debt-decree witnesses remain catalogue-level, and Issue #24 remains open.
