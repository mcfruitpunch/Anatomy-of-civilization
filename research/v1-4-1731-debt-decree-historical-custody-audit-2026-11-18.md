# V1.4 — 1903/1904 historical catalogue leads for the 24 February 1731 debt decree

**Research date:** 18 November 2026  
**Target:** doc-024, the royal Company-of-Indies Louisiana debt decree dated 24 February 1731, with separately catalogued 1731 and 1733 printings.  
**Result:** two exhibition catalogues provide a stronger historical retrieval trail, but neither supplies the decree's operative text or present-day custody.

## 1. 1903 Louisiana Historical Society loan-exhibit catalogue

I visually examined the page image for printed page 17 (PDF page index 18, zero-based) of [A Catalogue of the Colonial Exhibit of the Louisiana Historical Society and Loan Exhibit of Members and Friends](https://upload.wikimedia.org/wikipedia/commons/5/54/A_catalogue_of_the_colonial_exhibit_of_the_Louisiana_historical_society_and_loan_exhibit_of_members_and_friends_%28IA_catalogueofcolon00loui%29.pdf).

The page lists:

- **Item 342:** the 23 January 1731 royal retrocession decree; the Owner column says “Mr. Gaspar Cusachs”.
- **Item 345:** the 24 February 1731 Company-debt decree; the Owner column also says “Mr. Gaspar Cusachs”.

The catalogue title page dates the exhibition to New Orleans, 20 December 1903. The catalogue is explicitly a loan exhibit of members and friends. The entry therefore supports a narrow statement: the 1903 catalogue reported the two printed acts as items attributed to Mr. Gaspar Cusachs in the loan exhibit.

It does **not** establish where either physical copy went after the exhibition, whether either is the same copy later described by BnF or Columbia, whether the debt decree's wording matches the later printings, or whether any debt was paid.

## 2. Independent 1904 catalogue

I visually examined printed page 21 (PDF page index 24, zero-based), Section I, “b—Législation”, item 72, in [Exposition Française de la Louisiane, St. Louis 1904](https://upload.wikimedia.org/wikipedia/commons/b/b4/Exposition_fran%C3%A7aise_de_la_Louisiane%2C_St._Louis%2C_1904_%28IA_expositionfran00newo%29.pdf).

Item 72 lists:

> “Arrêt du Conseil d'Etat du Roy concernant le paiement des dettes de la Compagnie de Indes à la Louisiane—Paris, 24 Février, 1731.”

This is an independent catalogue-level attestation of the title and act date. It is not a transcription of the legal provisions. The catalogue does not provide an item-level owner for item 72.

Its printed p.2 preface thanks “M. G. Cusachs” for allowing the committee broad access to his collections. That general acknowledgement does not assign item 72 to him; the repository therefore records a null item-level owner for the 1904 entry. No identity between “G. Cusachs” in the preface and “Mr. Gaspar Cusachs” in the 1903 catalogue is required for this conclusion.

## 3. Evidentiary assessment

**Documented catalogue facts**
- 1903 printed p.17, item 345: the debt decree is attributed to Mr. Gaspar Cusachs in the Owner column.
- 1903 printed p.17, item 342: the retrocession decree is attributed to the same catalogue-named owner.
- 1904 printed p.21, item 72: the debt decree title and 24 February 1731 date are listed; no item-level owner is supplied.

**Scholarly interpretation**
- These records make the Louisiana Historical Society's 1903 loan-exhibit documentation and associated Cusachs collection records a promising historical retrieval route. They do not prove that the exhibited item survives in that collection or identify its current repository.

**Unresolved**
- Whether the 1903 and 1904 entries describe the same physical copy.
- Whether the 1903 copy was retained, sold, donated, dispersed or transferred after the exhibition.
- Whether either exhibition copy corresponds to the 1731 Imprimerie royale or 1733 Saugrain–Prault witness now catalogued by BnF/Columbia.
- The operative legal provisions, legal debtor/creditor roles, deadlines, valuation, enforcement, Crown assumption (if any), and any actual payments.

## 4. Affected-community and interpretive limits

These are French/Creole historical collecting catalogues, not Indigenous or enslaved people's accounts. Their silence cannot be used as evidence of Indigenous consent to French territorial claims or as a complete account of people subjected to enslavement, dispossession or colonial coercion. The existing community-authored Peoria and Choctaw context records remain distinct from this catalogue provenance trail. No new human identities, populations or financial flows are inferred.

## 5. Repository implementation

- Added src-exposition-francaise-1904-catalogue with exact page/item locator.
- Refined the 1903 Louisiana Historical Society source locator to the visually examined p.17 image.
- Added data/louisiana_decree_custody_leads.json with separate 1903 and 1904 catalogue records.
- Added a regression validator that prevents a historical catalogue attribution from becoming a current-owner, decree-text, liability or payment claim.
- Updated doc-024 and the V1.4 source-verification notes.

The debt decree remains catalogue_metadata_only; the separate 1731 and 1733 printings remain unread. The financial ledger is unchanged: paid, transfer and liable remain null.

## 6. Next retrieval action

Request the Louisiana Historical Society's 1903 loan-exhibit register, accession correspondence or surviving Cusachs collection documentation, asking specifically for items 342 and 345. Ask the current custodial institution to identify any later disposition only if its records support one. In parallel, continue to request both pages of the 1731 Imprimerie royale and 1733 Saugrain–Prault printings through BnF/Columbia/LLMC. Do not name a present repository until an accession, shelfmark or verified catalogue record is located.
