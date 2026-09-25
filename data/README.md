# Inventory and catalogue metadata

Ownership and edition information were supplied directly by the owner on 2026-09-25. There are 60 inventory entries (59 owned and one wishlist item) and 72 physical books (including both books in The Garden of Words box).

- 17 manga entries from the original manga list, plus The Garden of Words box.
- 2 English novel entries, plus the French novel in The Garden of Words box.
- 4 owned figures and 2 miscellaneous items.
- The Garden of Words is one owned box set shown in both book categories; category counts overlap intentionally. It is counted only once in the overall entry total.
- All manga are French except Yotsuba&! (Japanese). The two separately listed novels are English, as confirmed by the owner. Flags describe the **owned edition**, independently of the display title or the language printed on catalogue artwork.
- Ownership, sealed condition and volume ranges are never inferred from a retailer's stock status.

## Titles and series totals

English titles and completed-series totals were checked against AniList's public catalogue. The exact records and downloaded cover sources are recorded in `catalog-sources.json`. `originalTitle` retains the supplied French/Japanese title for search. Runtime browsing never contacts external catalogues.

For completed series, `totalVolumes` describes the completed original series, not the latest number released in French. Ongoing series have no denominator or completion percentage. The owner explicitly confirmed Bloom Into You: Regarding Saeki Sayaka volumes 1–3 as complete. The one-volume works are represented as one owned volume.

Some titles do not have a confirmed licensed English title. These use established translated catalogue names, with a `titleNote` in the data:

- The Skirt Sings at the Landing — Légères sur le dancefloor; [catalogue title](https://www.animeclick.it/manga/37797/odoriba-ni-skirt-ga-naru).
- My Sister’s Best Friend, My Lover. — Le Poids du silence; [publisher catalogue](https://www.phoenixnext.com/series/anenoshinyuu).
- An Easy Introduction to Love Triangles (To Pass the Exam!) — Introduction au théorème du triangle amoureux; [AniList synonyms](https://anilist.co/manga/114970).
- There Is No Love Wishing Upon a Star — Constellations cruelles; [English catalogue alias](https://www.goodreads.com/series/404092-kono-koi-wo-hoshi-ni-wa-negawanai), [French publisher](https://www.akata.fr/series/constellations-cruelles).

## Specific editions

- [The Garden of Words limited box](https://www.manga-news.com/index.php/manga/Garden-of-words-Coffret): manga + novel, Kazé, ISBN 9782820318817; contents confirmed by owner. Exact box catalogue image retrieved from ePagine by ISBN; source recorded in `catalog-sources.json`.
- [The Divine Comedy](https://www.planetebd.com/manga/soleil/la-divine-comedie/-/47200.html): Soleil Manga / Variety Artworks adaptation, ISBN 9782302064300. Publisher confirmed by owner; do not confuse it with Go Nagai's version.
- [I Had That Same Dream Again](https://www.penguinrandomhouse.com/books/701487/i-had-that-same-dream-again-light-novel-by-yoru-sumino/): original novel, not the manga adaptation. English cover ISBN 9781645054399.
- [Saber — Last Episode](https://www.goodsmile.info/en/product/4809): WING, painted 1/8 scale.
- [Saber — Garden of Avalon](https://www.goodsmile.com/en/product/57700): Good Smile Company, painted 1/7 scale; exact owner-supplied product.
- [Winter Night](https://www.orzgk.com/product/quietart-studio-artoria-pendragon-winter-night-fate-stay-night/): owner-supplied product. Retailer's page could not be fetched; [matching Figuretopia listing](https://figuretopia.com/product/1-6-scale-saber-artoria-pendragon-winter-night-fate-stay-night-resin-statue-quietart-studio/) supplied the product photograph and 1/6 scale.

## Owner-provided identifications and remaining details

- Pajamas figure: WING 1/7, now identified by the owner’s Figurememo link; product photo recorded in `catalog-sources.json`.
- Artoria artwork: identified by the owner’s Ukiyoework link as a framed, hand-carved and hand-printed ukiyo-e woodblock print. The edition size is **300 copies**, not an assertion that this copy is serial number 1/300.
- Fate 15th Anniversary game box: exact language and platform remain unset. Photo from the owner-supplied Mercari listing, with surrounding background cropped; it is not a photo of the owner’s copy. Sealed condition and anniversary edition are owner-supplied.
- Book binding/edition is only specified when supplied or identified. Catalogue thumbnails identify the work; they are not photos of the owner's copies and may show a different language or edition.

## VTuber merch

11 owner-supplied Geek Jack product links and three older Nakiri Ayame cards/letters are under `vtuber-merch`. Each of the four sets is expanded into four physical merchandise entries and its bonus card (20 entries). Combined with seven standalone items and three older cards/letters, this makes 30 VTuber merch entries before the additional kindergarten puppet plush. Parent sets are not counted again. The Asura & Rakshasa sword guards remain one paired product. Digital voice packs are not physical inventory entries. Each component retains the set name and limited-edition ownership source. The 72-book total is unchanged. Product photos and selected Shopify variant IDs are recorded in `catalog-sources.json`.

The supplied variants identify Nakiri Ayame for friends to Go and the AyaFubuMi acrylic stand, and size L for the colored pixel-art T-shirt. The hoodie is the one-size re-released edition. Limited sets retain their handwritten autograph bonus; foil-stamped messages are distinguished from handwriting.

The older postcards and separate letter are identified in the owner-photograph notes below. `owned` follows the owner's inventory statement and does not assert delivery dates (some products may still be on order).

## Wishlist

Saber’s Gift plush from Fate/stay night Heaven’s Feel is wishlisted under Misc. The photo, maker and approximate seated height come from Gift’s official product page (`nui547`); the English retail title matches the owner’s request. It is not included in owned counts.

## Owner photographs

Six owner photographs replaced catalogue previews or empty artwork. IMG_1340 is the 7th Anniversary card; IMG_1342 is the 3rd Anniversary (2021) postcard; IMG_1343 is the separate 2nd Anniversary (2020) bonus letter; IMG_1345 is the Birthday 2020 postcard; IMG_1346 is the Birthday 2024 card; IMG_1347 is the Birthday 2025 postcard. The letter was added as a separate owned item, bringing VTuber merchandise to 30 entries.

Official identification sources: [3rd Anniversary](https://hololive.booth.pm/items/3314916), [2nd Anniversary](https://hololive.booth.pm/items/2309046), [Birthday 2020](https://hololive.booth.pm/items/2586180). The letter is a printed reproduction, as specified by the official listing. The two older postcards had both handwritten and foil-stamped signature variants; artwork identification does not authenticate the signature variant.

Photos were conservatively cropped, resized to at most 1600 pixels and saved as WebP without embedded metadata. Signatures, messages and colors were not retouched. Original filenames, SHA-256 hashes and crop bounds are retained in catalog-sources.json; the temporary photo inbox is removed after verification.

The Girly Outfit hololive friends with u plush has quantity 2, confirmed by the owner. It remains one catalogue entry, with the quantity shown on its card and in details.

Added one FuRyu Nakiri Ayame Kindergarten Uniform Puppet Plush (2024, approx. 25 cm), matching the owner’s outfit description and the retailer’s specific variant image. The seller title mentioning two types describes the lineup; only the kindergarten version is recorded as owned. VTuber merchandise now has 31 catalogue entries.

## Owner photographs, second batch

Ten photos imported with their original framing retained. IMG_1348: Girly Outfit plush (quantity remains two); IMG_1349: friends to Go keychain; IMG_1350: Birthday 2024 Shrine Maiden plush keychain; IMG_1351: friends with u standard plush; IMG_1352: FuRyu kindergarten puppet; IMG_1353: AyaFubuMi Laid-Back New Year panel; IMG_1354: Birthday 2024 holographic panel; IMG_1355: ONIKAWAII Project in animate acrylic stand; IMG_1356: Situation hololive A Fun Day Out! vol. 3 acrylic stand; IMG_1357: AyaFubuMi New Song Release acrylic stand.

The two previously unlisted stands were visually matched against [Animate’s official product lineup](https://www.animate.co.jp/onlyshop/35581/) and [hololive’s official listing](https://shop.hololivepro.com/en/products/situationhololive_afundayout_vol3). These additions bring the inventory to 60 entries (59 owned, one wishlist), including 33 VTuber merchandise entries. Original hashes are recorded in catalog-sources.json.
