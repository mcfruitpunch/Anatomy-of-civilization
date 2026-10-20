# V0.5 — Following the Tea Act money: a source-led inquiry

**Case:** `finance1773` · **Period:** 1766–1773 · **Research updated:** 2026-10-19

## Documented money, proposed benefits, and historical narration are different

The idea of "following the money" means recording **what the source establishes**, rather than inferring that money moved whenever an appointment or political benefit occurred.

| Record | Evidence establishes | What is *not* established |
|---|---|---|
| Bank of England, 20 Mar 1766 | Archival catalogue mentions a note to Henry Crabb Boulton on prolongation of a £50,000 East India Company loan | That £50,000 was advanced anew on that date |
| Parliament, 1773 | Government loan/regulatory action related to the Company's crisis; a 1813 Commons retrospective references £1.4 million | Full disbursement schedule, individual MPs' financial gains |
| Governor Hutchinson's sons, 1773 | Thomas Jr. and Elisha were named Boston tea consignees, with a reported 6% sales commission | That a 6% commission was paid, or that their father received it |
| Joshua Winslow, 18 Nov 1773 | His letter describes an anticipated commission, without a number | Payment of any specific amount or rate |

The 6% figure is a **conditional rate attached to sales**, not the share of the entire cargo or an established payment. A potential financial incentive can be important to research without being evidence of wrongdoing.

## Named relationships now recorded

- **Family:** Governor Thomas Hutchinson was father of consignees Thomas Hutchinson Jr. and Elisha Hutchinson.
- **Employment and business:** East India Company selected tea consignees; Richard Clarke & Sons and Joshua Winslow/Benjamin Faneuil Jr. were among them.
- **Recommendations:** Massachusetts Commonwealth Museum credits London merchant Brook Watson with recommending Winslow and Faneuil; this does **not** establish an illicit payment.
- **Contemporary testimony:** Joshua Winslow wrote privately to Jotham Gay on November 18, 1773 about the Company's commercial plan and prospects for a commission.
- **Finance and governance:** UK Parliament's histories identify Company distress, 1773 financial legislation and regulatory intervention; an 1813 Commons narrative preserves a £1.4m loan figure.
- **Scrutiny, not merely assistance:** The UK Parliament also records Robert Clive defending his India administration during a May 1773 investigation led by MP John Burgoyne.

## Sources inspected

- [Massachusetts Commonwealth Museum, *The Consignees*](https://www.sec.state.ma.us/divisions/commonwealth-museum/exhibits/online/the_boston_tea_party/the_boston_tea_party_5.htm)
- [Colonial Society of Massachusetts, Hutchinson correspondence (vol. 5)](https://www.colonialsociety.org/publications/4959/boston-tea-party)
- [Colonial Society of Massachusetts editorial records of petitioners](https://www.colonialsociety.org/node/194)
- [Hingham Historical Society account reproducing Winslow's letter](https://outofthearchives.org/tag/boston-tea-party/)
- [UK Parliament: Parliament and the East India Company](https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-empire/parliament-and-the-american-colonies-before-1765/parliament-and-the-east-india-company/)
- [UK Parliament: East India Company and public opinion](https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-empire/parliament-and-the-american-colonies-before-1765/the-east-india-company-and-public-opinion/)
- [Hansard 1813: Commons account of 1773 loan](https://hansard.parliament.uk/commons/1813-05-31/debates/30d76ed5-51da-48b9-9500-1867135975cd/EastIndiaCompanySAffairs%E2%80%94)
- [Bank of England archive, Item 13A84/11/48](https://www.bankofengland.co.uk/CalmView/Record.aspx?id=13A84%2F11%2F48&src=calmview.catalog)

## Limits / questions

1. **Prospective vs paid:** Do Company account books or surviving consignee ledgers show an actual commission paid to these specific people?
2. **Loan accounting:** What were the original 1773 statutory terms and ledger entries, not just a retrospective parliamentary summary?
3. **Company elections:** Can shareholder registers, proxy voting and minutes identify the directors who supported specific negotiations?
4. **Patronage and influence:** Who nominated each consignee, and what evidence ties the recommendation to decisions rather than simply friendship or kinship?
5. **Colonial business losses:** What became of these expected commissions amid the protests and boycott? Don't equate expected revenue with realized profits.
6. **Comparative perspectives:** What economic and political consequences did this fiscal regime have for Bengali communities, Indigenous nations and enslaved people, beyond British and colonial merchant interests?

## Data model

`data/financial_flows.json` tracks: `from`, `to`, `value`, `unit`, `kind`, `flow_state`, `date`, `sources`, `case`, and `verification`. The `flow_state` is semantically decisive:
- `existing_credit_extension` — extension of existing borrowing, not a new loan payment.
- `historical_account_not_transaction_ledger` — described in later historical accounting, but originals not checked.
- `prospective_not_documented_paid` — contract expectation or potential commission; no proof of funds changing hands.

Further money movements must be entered as distinct records only when documentary proof supports them. Financial trace arrows are not allegations or evidence of conspiratorial intent.
