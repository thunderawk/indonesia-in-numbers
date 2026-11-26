# indonesia-in-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/thunderawk/indonesia-in-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/thunderawk/indonesia-in-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in Numbers — a national statistics site for Indonesia: population, economy, health, education and provinces, with every figure sourced and dated from the official record (BPS, Bank Indonesia, APJII, SSGI, ESDM, BPJS Kesehatan). Static files, no build step, no network requests: it runs from its own files on a desktop and on a phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. Or serve `app/` with any static server — `app/index.html` is the entry point.

## What is inside

- `app/index.html` — the shell: header, search, navigation, footer
- `app/main.js` — hash router, economy tabs, GDP toggle, table sort/filter, indicator search
- `app/views.js` — the six pages: overview, population, economy, health, education, regions
- `app/charts.js` — hand-rolled SVG bar, line, donut and share-bar charts
- `app/data.js` — every figure with its source and year
- `app/style.css` — the whole look, system fonts only
- `main.ts` — hands the site in: copies `app/` + `screenshots/` to `/output` and writes `dossier.json`
- `screenshots/` — four real renders of the site

## Sources

Every figure names its source and year next to the number. Figures come from Badan Pusat Statistik (BPS), Bank Indonesia, APJII, the Ministry of Health's SSGI survey, the Ministry of Energy and Mineral Resources (ESDM) and BPJS Kesehatan. This is an independent presentation of official statistics, not affiliated with BPS or any government agency.

---

<sub>Entered on [make.fun](https://make.fun/?ref=thunderawk&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
