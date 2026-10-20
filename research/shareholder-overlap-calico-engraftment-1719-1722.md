# V0.7 — Investor overlap, calico protections, and the unexecuted rescue of 1721

**Coverage:** Original Bank subscriptions of 1694, reconstructed Bank and East India Company share accounts of 1719–1721, and East India Company/Bank/South Sea Company negotiations of 1720–1722.

## Main discoveries

### 1. There really were hundreds of overlapping accounts, but a stock account is not automatically a verified person

Mays and Shea's 2011 research working paper, *East India Company and Bank of England Shareholders during the South Sea Bubble*, examined archival ledgers for Bank of England and East India Company equities. On printed p.22 (PDF page 23) they estimate **about 700 account owners appearing in both companies' records in 1719** and **about 760 in 1721**. They further observe that accounts held in both companies tended to correspond to larger stockholders than average.

The original research uses East India Company stock ledger **IOR/L/AG/14/5/4** and Bank of England transfer and stock records, including **AC27/1539–1558**, **AC27/430–437** and **AC27/6439–6450** (Appendix A, pp.58–60). Some accounts represented trusts or joint interests. Our atlas therefore does **not** convert a dataset of 760 overlapping accounts into 760 named individuals or family-dynasty accusations.

The Bank also offers an original **1694 subscriber index** and annual **director lists**. These are useful, distinct records. We have not matched the 1694 founding subscribers against 1720 holdings and must not imply continuity between them. Source IDs: `src-mays-shea-2011`, `src-boe-bank-stock-index-1694`, `src-boe-directors-list`, `src-boe-stock-ledger-382`.

### 2. The 1720–1721 negotiations were real; the proposed 1721 engraftment was not carried out

Abigail L. Swingen's 2024 peer-reviewed *Journal of British Studies* article, *Calico Madams and South Sea Cheats*, draws on parliamentary records, Company minutes, contemporary essays and letters.

Swingen documents an East India Company committee appointed to meet Bank and South Sea Company representatives in September 1720 and Robert Walpole's attempts to distribute South Sea obligations. **Both the Calico Act and Engraftment Act received royal assent on 23 March 1721.** However, the Engraftment Act lacked a mechanism to compel participating companies, and **neither the Bank nor East India Company actually engrafted the contemplated South Sea debts**. A distinct 1722 Bank–South Sea stock-purchase agreement appears in archives, and must be researched independently.

This distinction has three separate states:

- **Negotiated:** financial and political actors discussed mechanisms.
- **Authorized:** law permitted a proposed arrangement.
- **Executed:** the precise transfer occurred and is proven in transaction records.

For the 1721 engraftment plan, the first two are documented; the last did **not** happen according to the consulted scholarship. This is now encoded as `fin-009` with `flow_state: authorized_no_transfer`, no amount, and a source.

### 3. Global textiles, labor protest and gender-based violence intersected with financial rescue

East India Company calico imports from South Asia competed with wool and silk industries in Britain. Protesters organized petitions and demonstrations from 1719 to 1721, and **some mobs assaulted women wearing calico**. Economic grievances and violence against women must be described separately; the violence was not a necessary or justified policy tool.

The 23 March 1721 Calico Act restricted Indian cotton imports and use in Britain. In June 1721, Parliament strengthened controls on foreign-routed Asian textiles reaching Britain's American colonies, affecting Company trade privileges. The Board of Trade considered numerous potential compensatory concessions; an extreme proposal concerning slavery in Madagascar was **not** enacted. Indian producers' viewpoints and economic impacts remain a necessary research gap.

Swingen's argument that calico politics and the Bubble were mutually shaping is a sourced scholarly interpretation, not a universal causal law.

## What remains unproven

- Which, if any, **1694 founding subscribers** survived as identifiable dual shareholders in 1719/21.
- Names, ownership percentages, changes and dates for the published 700–760 overlapping accounts.
- Evidence that shared investment portfolios entailed coordinated political control or wrongdoing.
- That 1721 planned South Sea engraftment ever generated Bank/EIC debt transfers—it **did not**, per Swingen.
- Exact personal benefits, political commissions or criminal conduct by individuals absent named primary records.
- How South Asian textile workers, women who used imported garments, and disenfranchised communities experienced policy outcomes.

## Method and source integrity

- `data/ownership_overlap.json` includes only aggregate, source-linked published counts and a boolean explicitly saying distinct shareholders have not been verified.
- `data/events.json`, `data/relationships.json` and `data/dominoes.json` trace public acts, institutional contacts and context without inferring decisions from kinship or coincidence.
- `data/financial_flows.json` records the **absence** of an executed 1721 transfer.
- Source types distinguish the Bank's original archival index/catalogue from a scholarly ledger reconstruction and from an interpretation of political causes.
- The site's ownership section is visible alongside Financial Traces. Neither graph edges nor aggregate metrics are proof of a secret coordinated family network.

## Next archival assignment

Obtain the actual Mays–Shea account linkage dataset if publicly archived, or request access to Bank ledger images and relevant British Library folios. Match archival accounts across 1694 and 1719–1721 with identity fields and provenance. If identities cannot be confirmed, publish a negative or inconclusive result instead of speculative matches. The Bank explicitly states many historical stock ledgers are available for in-person study rather than digitized publication.

**References**

1. Mays, Andrew, and Gary S. Shea (2011). [*East India Company and Bank of England Shareholders during the South Sea Bubble*](https://www.st-andrews.ac.uk/~wwwecon/CDMA/papers/wp1109.pdf). CDMA Working Paper 11/09, University of St Andrews. Printed pp.22 and 58–60.
2. Swingen, Abigail L. (2024). [*Calico Madams and South Sea Cheats*](https://www.cambridge.org/core/journals/journal-of-british-studies/article/calico-madams-and-south-sea-cheats-global-trade-finance-and-popular-protest-in-early-hanoverian-england/A42541469AC2D07D56DB379D6B34EFAA). *Journal of British Studies* 63(1):114–138. Especially the South Sea Bubble section and discussion of March and June 1721 acts.
3. [Bank of England, original stock subscribers index](https://www.bankofengland.co.uk/archive/index-to-original-subscribers-to-bank-stock-1694).
4. [Bank of England, annual directors lists](https://www.bankofengland.co.uk/archive/directors-annual-lists-1694-1950).
5. [Bank of England, AC27/382 capital subscription stock ledger](https://www.bankofengland.co.uk/CalmView/Record.aspx?id=AC27%2F382&src=CalmView.Catalog).

This document is a research brief subject to further archival verification.
