# weeb.zerotistic.blog

Personal manga, light novel, figurine, VTuber merch, and miscellaneous inventory. A compact static collection browser with dark mode by default, ownership and category filters, search, sorting, grid/list layouts, and accessible item details.

## Local development

```sh
npm install
npm run dev -- --port 4173
```

Open http://localhost:4173. `npm run build` checks the production bundle; `npm run preview` serves it.

The root HTML, CSS, JavaScript and assets also work directly with GitHub Pages **main / (root)**; there is no build requirement for branch deployment. Keep the custom domain set to `weeb.zerotistic.blog` in Pages settings. DNS is currently managed at Namecheap.

## Collection data

Edit `collection.js` and add images to `assets/covers/`. The real inventory contains 60 entries (59 owned, one wishlist) and 72 books. Details, title translations, catalogue sources and the few unresolved edition fields are documented in [data/README.md](data/README.md).

Each entry has a category (`manga`, `light-novels`, `figurines`, `vtuber-merch`, `misc`) and ownership status (`owned`, `wishlist`). Optional `categories` adds cross-category membership without duplicating the entry; The Garden of Words box contains a manga and a novel. Language flags identify the owned edition, while titles display in English. Original titles remain searchable.

Volume ranges, collection totals, language, editions, condition, scale and manufacturer are stored as data. Unknown series lengths remain unset. Product links have per-entry labels, and missing photos use neutral placeholders. Owned items and wishlist entries are kept separate; the earlier demo entries have been removed.

## Design

A collection-first layout with the main blog’s exact Sand colour tokens (steel-blue accent in dark mode, clay in light), Avalon landscape background, book-spine shading, small volume indicators, and an interactive Artoria companion: slim navigation, ownership sidebar, category tabs, searchable cover grid, volume progress, and metadata dialogs. No hero, footer, or promotional copy. Books retain their cover proportions; object photos use an uncropped display. A personal `note` field appears in item details when provided. IBM Plex typography connects it to the main blog. Dark mode is the default; an explicit light-mode preference persists. Responsive layouts support phones, and motion respects reduced-motion preferences. Search has a `/` shortcut; dialogs support Escape and focus return.

References reviewed:

- [The blog's About page](https://zerotistic.blog/about/): shared typography and existing cover artwork.
- [DesEngs](https://desengs.com/): browsable collections and careful typography.
- [The Component Gallery](https://component.gallery/): consistent search, button and dialog patterns.
- [Jakub's interface details](https://jakub.kr/writing/details-that-make-interfaces-feel-better): balanced headings, tabular counts, layered shadows and interruptible transitions.
- [Detail](https://detail.design/): quiet interaction feedback.
- [WebHaptics](https://haptics.lochie.me/) and [userinterface.wiki](https://www.userinterface.wiki/): reference sites consulted; web extraction exposed little content. Haptics are not required for any interaction.
- [Lenny's design article](https://www.lennysnewsletter.com/p/how-to-turn-your-ai-into-a-world): define a specific emotional direction, then review actual rendered layouts and refine them.

## Browser checks

```sh
npx playwright install chromium
npx playwright test
```

Artwork provenance is documented in `assets/README.md`.

Item details use a two-column artwork and metadata layout, subtle edition/signature badges, and a mobile stacked layout. The image opens in an accessible nested dialog; Escape returns to details, then to the selected collection item.
