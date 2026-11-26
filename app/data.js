// Indonesia in Numbers — the figures behind the site.
//
// Every number here is a published official statistic. Each figure carries
// its source and year in the `src` field, and the site prints that source
// next to the figure. Nothing here is invented, rounded beyond one decimal,
// or projected: where a figure is an estimate it says so.
//
// Sources used:
//   BPS — Badan Pusat Statistik (Statistics Indonesia), bps.go.id
//   BI  — Bank Indonesia, bi.go.id
//   APJII — Asosiasi Penyelenggara Jasa Internet Indonesia
//   Kemenkes / SSGI — Survei Status Gizi Indonesia 2024
//   ESDM — Kementerian Energi dan Sumber Daya Mineral
//   BPJS Kesehatan

export const SITE = {
  name: 'Indonesia in Numbers',
  tagline: 'One country, every number that matters — from the official record.',
  updated: 'Figures as published for 2024–2025. This is an independent presentation of official statistics; it is not affiliated with BPS or any government agency.',
};

// Headline figures on the overview page.
export const HEADLINES = [
  { label: 'Population', value: '281.6m', note: 'Mid-year 2024 estimate', src: 'BPS, 2024' },
  { label: 'Economy (GDP)', value: 'Rp22,139tn', note: 'US$1.40 trillion, current prices', src: 'BPS, 2024' },
  { label: 'GDP growth', value: '5.03%', note: 'Year on year, 2024', src: 'BPS, 2024' },
  { label: 'Poverty rate', value: '8.57%', note: '24.06 million people, Sep 2024', src: 'BPS, 2024' },
];

// At-a-glance facts: each with source + year.
export const GLANCE = [
  { label: 'Land area', value: '1,890,180 km²', src: 'BPS, 2024' },
  { label: 'Islands', value: '17,380', src: 'BPS, 2024' },
  { label: 'Regional languages', value: '718', src: 'BPS, 2024' },
  { label: 'Provinces', value: '38', src: 'BPS, 2024' },
  { label: 'Population density', value: '149 /km²', src: 'BPS, 2024' },
  { label: 'Share living on Java', value: '56%', src: 'BPS SUPAS, 2025' },
  { label: 'GDP per capita', value: 'US$4,960', note: 'Rp78.6 million', src: 'BPS, 2024' },
  { label: 'Human Development Index', value: '75.02', note: 'High human development', src: 'BPS, 2024' },
];

// Population, mid-year estimates (millions). 2010 and 2020 are census counts.
export const POP_SERIES = [
  { year: 2010, pop: 237.6, kind: 'Census' },
  { year: 2015, pop: 255.2, kind: 'Survey' },
  { year: 2020, pop: 270.2, kind: 'Census' },
  { year: 2022, pop: 275.8, kind: 'Estimate' },
  { year: 2023, pop: 278.7, kind: 'Estimate' },
  { year: 2024, pop: 281.6, kind: 'Estimate' },
];
export const POP_SOURCE = 'BPS — Sensus Penduduk 2010 & 2020, SUPAS 2015, mid-year estimates 2022–2024';

// Generational split of the population (SUPAS 2025) — only the two shares
// BPS published in its SUPAS 2025 release are shown with numbers.
export const GENERATIONS = [
  { group: 'Gen Z (born 1997–2012)', share: 24.93 },
  { group: 'Millennials (born 1981–1996)', share: 24.34 },
];
export const GENERATIONS_SOURCE = 'BPS SUPAS 2025 — the two largest cohorts as published. The remaining half of the population is split across Gen X, Baby Boomers and Gen Alpha.';

// Population facts for the population page.
export const POP_FACTS = [
  { label: 'Annual growth', value: '1.04%', note: '2023 → 2024', src: 'BPS, 2024' },
  { label: 'Total fertility rate', value: '2.13', note: 'Children per woman, just above replacement', src: 'BPS SUPAS, 2025' },
  { label: 'Elderly (60+)', value: '10%+', note: 'Share of population now over 60', src: 'BPS SUPAS, 2025' },
  { label: 'Speaks Bahasa Indonesia', value: '98.12%', note: 'Share of population', src: 'BPS SUPAS, 2025' },
];

// Ten largest provinces, mid-2024 estimates (millions) + share of population.
export const PROVINCES = [
  { name: 'West Java', pop: 50.35, share: 17.9 },
  { name: 'East Java', pop: 41.81, share: 14.8 },
  { name: 'Central Java', pop: 37.89, share: 13.5 },
  { name: 'North Sumatra', pop: 16.05, share: 5.7 },
  { name: 'Banten', pop: 12.43, share: 4.4 },
  { name: 'Jakarta', pop: 10.68, share: 3.8 },
  { name: 'South Sulawesi', pop: 9.53, share: 3.4 },
  { name: 'Lampung', pop: 9.41, share: 3.3 },
  { name: 'South Sumatra', pop: 8.90, share: 3.2 },
  { name: 'Riau', pop: 6.99, share: 2.5 },
];
export const PROVINCES_SOURCE = 'BPS, mid-2024 population estimates (millions, one decimal)';

// Island-group distribution of the population.
export const ISLANDS = [
  { group: 'Java', share: 56.0, note: 'Six provinces, on about 7% of the land' },
  { group: 'Sumatra', share: 21.6, note: 'Ten provinces' },
  { group: 'Sulawesi', share: 7.3, note: 'Six provinces' },
  { group: 'Kalimantan', share: 6.2, note: 'Five provinces' },
  { group: 'Bali & Nusa Tenggara', share: 5.7, note: 'Three provinces' },
  { group: 'Maluku & Papua', share: 3.2, note: 'Six provinces' },
];
export const ISLANDS_SOURCE = 'BPS, 2024 population distribution by island group';

// GDP growth, year on year (%).
export const GDP_GROWTH = [
  { year: 2020, g: -2.07 },
  { year: 2021, g: 3.70 },
  { year: 2022, g: 5.31 },
  { year: 2023, g: 5.05 },
  { year: 2024, g: 5.03 },
];
export const GDP_GROWTH_SOURCE = 'BPS, 2024';

// Inflation, December year on year (%).
export const INFLATION = [
  { year: 2020, v: 1.68 },
  { year: 2021, v: 1.87 },
  { year: 2022, v: 5.51 },
  { year: 2023, v: 2.61 },
  { year: 2024, v: 1.57 },
];
export const INFLATION_SOURCE = 'BPS, December CPI year on year';

// Poverty rate, September each year (% of population).
export const POVERTY = [
  { year: 2020, v: 10.19 },
  { year: 2021, v: 9.71 },
  { year: 2022, v: 9.57 },
  { year: 2023, v: 9.36 },
  { year: 2024, v: 8.57 },
];
export const POVERTY_SOURCE = 'BPS, September each year';

// Largest sectors, share of GDP 2024 (%).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.67 },
  { name: 'Wholesale & retail trade', share: 12.86 },
  { name: 'Agriculture, forestry & fishing', share: 12.09 },
  { name: 'Construction', share: 9.77 },
  { name: 'Mining & quarrying', share: 9.15 },
  { name: 'All other sectors', share: 37.46 },
];
export const SECTORS_SOURCE = 'BPS, 2024 — shares of GDP at current prices';

// Trade and money facts.
export const TRADE = [
  { label: 'Exports', value: 'US$264.70bn', note: 'Goods exported, 2024', src: 'BPS, 2024' },
  { label: 'Imports', value: 'US$233.66bn', note: 'Goods imported, 2024', src: 'BPS, 2024' },
  { label: 'Trade surplus', value: 'US$31.04bn', note: 'Exports minus imports, 2024', src: 'BPS, 2024' },
  { label: 'Foreign-exchange reserves', value: 'US$155.7bn', note: 'End of 2024', src: 'Bank Indonesia, 2024' },
  { label: 'Unemployment rate', value: '4.76%', note: 'Open unemployment, Feb 2025', src: 'BPS, 2025' },
  { label: 'Gini ratio', value: '0.381', note: 'Income inequality, Sep 2024', src: 'BPS, 2024' },
];

// Health facts.
export const HEALTH = [
  { label: 'Life expectancy', value: '73.8 yrs', note: 'At birth', src: 'BPS, 2024' },
  { label: 'Infant mortality', value: '14.1', note: 'Deaths per 1,000 live births', src: 'BPS SUPAS, 2025' },
  { label: 'Maternal mortality', value: '144', note: 'Deaths per 100,000 live births', src: 'BPS SUPAS, 2025' },
  { label: 'Stunting in under-5s', value: '19.8%', note: 'Share of children under five', src: 'SSGI (Kemenkes), 2024' },
  { label: 'Health insurance (JKN)', value: '98.7%', note: 'Population covered by BPJS Kesehatan', src: 'BPJS Kesehatan, 2024' },
  { label: 'Internet users', value: '221.6m', note: '79.5% of the population online', src: 'APJII, 2024' },
];
// Mortality improvement 2010 → 2025.
export const MORTALITY = [
  { label: 'Infant mortality (per 1,000 live births)', from: 26.1, to: 14.1 },
  { label: 'Maternal mortality (per 100,000 live births)', from: 346, to: 144 },
];
export const MORTALITY_SOURCE = 'BPS — 2010 figures from Sensus Penduduk 2010 / SUPAS 2015 baseline; 2025 figures from SUPAS 2025';

// Education facts.
export const EDUCATION = [
  { label: 'Mean years of schooling', value: '9.04 yrs', note: 'Population aged 25 and over', src: 'BPS, 2024' },
  { label: 'Expected years of schooling', value: '13.21 yrs', note: 'A child entering school today', src: 'BPS, 2024' },
  { label: 'Literacy rate', value: '96.50%', note: 'Population aged 15 and over', src: 'BPS, 2024' },
  { label: 'Human Development Index', value: '75.02', note: 'High human development', src: 'BPS, 2024' },
  { label: 'Electrification ratio', value: '99.76%', note: 'Households with electricity', src: 'ESDM, 2024' },
];

// Searchable indicator index: name, value, route, source.
export const INDICATORS = [
  { name: 'Population', value: '281.6 million (2024)', route: '#/population', src: 'BPS, 2024' },
  { name: 'Population growth', value: '1.04% a year (2024)', route: '#/population', src: 'BPS, 2024' },
  { name: 'Total fertility rate', value: '2.13 children per woman (2025)', route: '#/population', src: 'BPS SUPAS, 2025' },
  { name: 'Jakarta population', value: '10.68 million (2024)', route: '#/regions', src: 'BPS, 2024' },
  { name: 'West Java population', value: '50.35 million (2024)', route: '#/regions', src: 'BPS, 2024' },
  { name: 'GDP', value: 'Rp22,139 trillion (2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'GDP per capita', value: 'US$4,960 (2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'GDP growth', value: '5.03% (2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'Inflation', value: '1.57% (Dec 2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'Poverty rate', value: '8.57% (Sep 2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'Unemployment rate', value: '4.76% (Feb 2025)', route: '#/economy', src: 'BPS, 2025' },
  { name: 'Exports', value: 'US$264.70 billion (2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'Manufacturing share of GDP', value: '18.67% (2024)', route: '#/economy', src: 'BPS, 2024' },
  { name: 'Life expectancy', value: '73.8 years (2024)', route: '#/health', src: 'BPS, 2024' },
  { name: 'Infant mortality', value: '14.1 per 1,000 (2025)', route: '#/health', src: 'BPS SUPAS, 2025' },
  { name: 'Stunting', value: '19.8% of under-5s (2024)', route: '#/health', src: 'SSGI, 2024' },
  { name: 'Literacy rate', value: '96.50% (2024)', route: '#/education', src: 'BPS, 2024' },
  { name: 'Mean years of schooling', value: '9.04 years (2024)', route: '#/education', src: 'BPS, 2024' },
  { name: 'Human Development Index', value: '75.02 (2024)', route: '#/education', src: 'BPS, 2024' },
  { name: 'Internet users', value: '221.6 million (2024)', route: '#/health', src: 'APJII, 2024' },
];
