// The six pages of the site. Each view is a function returning HTML.
// Every figure is printed with its source and year, from data.js.

import * as D from './data.js';
import { barChart, lineChart, donut, shareBars } from './charts.js';

function srcLine(text) {
  return `<p class="src">Source: ${text}</p>`;
}

function statCard(f) {
  return `<article class="card stat"><p class="stat-label">${f.label}</p><p class="stat-value">${f.value}</p><p class="stat-note">${f.note || ''}</p><p class="stat-src">Source: ${f.src}</p></article>`;
}

function pageHead(title, intro) {
  return `<h1>${title}</h1><p class="lede">${intro}</p>`;
}

// ---------------------------------------------------------------- overview
export function viewOverview() {
  const headlines = D.HEADLINES.map(statCard).join('');
  const glance = D.GLANCE.map((g) =>
    `<li><span class="g-label">${g.label}</span><strong>${g.value}</strong><span class="g-src">${g.note ? g.note + ' · ' : ''}Source: ${g.src}</span></li>`).join('');
  return `
  ${pageHead('Indonesia in Numbers', 'The country at a glance — population, economy, health and education, each figure taken from the official record and dated. Pick a section below, or search for any indicator above.')}
  <section class="grid-4" aria-label="Headline figures">${headlines}</section>
  <section class="panel">
    <h2>Population, 2010–2024</h2>
    <p class="panel-sub">Millions of people at mid-year. 2010 and 2020 are census counts; the rest are BPS estimates.</p>
    ${barChart(D.POP_SERIES.map((r) => ({ label: String(r.year), value: r.pop })), { fmt: (v) => v.toFixed(1) + 'm', aria: 'Bar chart of Indonesia population 2010 to 2024' })}
    ${srcLine(D.POP_SOURCE)}
    <p class="more"><a href="#/population">Population in detail &rarr;</a></p>
  </section>
  <section class="panel">
    <h2>At a glance</h2>
    <ul class="glance">${glance}</ul>
    <p class="more"><a href="#/economy">The economy in detail &rarr;</a> &nbsp;·&nbsp; <a href="#/regions">Provinces &amp; islands &rarr;</a></p>
  </section>
  <section class="panel">
    <h2>How to read this site</h2>
    <p>Every figure shows its source and year. Figures come from Badan Pusat Statistik (BPS), Bank Indonesia, APJII, the Ministry of Health’s SSGI survey, the Ministry of Energy and Mineral Resources (ESDM) and BPJS Kesehatan. Where a number is an estimate or a survey result, the text says so. This site is an independent presentation of official statistics and is not affiliated with BPS or any government agency.</p>
    <p class="more"><a href="#/population">Start with population &rarr;</a></p>
  </section>`;
}

// -------------------------------------------------------------- population
export function viewPopulation() {
  const facts = D.POP_FACTS.map(statCard).join('');
  return `
  ${pageHead('Population', '281.6 million people at mid-2024 — the world’s fourth-largest population — growing by 1.04% a year, and getting older and more urban.')}
  <section class="grid-4" aria-label="Population facts">${facts}</section>
  <section class="panel">
    <h2>How the population grew</h2>
    <p class="panel-sub">Millions at mid-year. Census counts in 2010 and 2020; survey in 2015; estimates after.</p>
    ${barChart(D.POP_SERIES.map((r) => ({ label: String(r.year) + (r.kind === 'Census' ? ' *' : ''), value: r.pop })), { fmt: (v) => v.toFixed(1) + 'm', aria: 'Bar chart of population growth 2010 to 2024' })}
    ${srcLine(D.POP_SOURCE)}
    <p class="fine">* Census year.</p>
  </section>
  <section class="panel">
    <h2>A young country, slowly ageing</h2>
    <p class="panel-sub">The two largest generations dominate the population — and more than one in ten Indonesians is now over 60.</p>
    ${shareBars(D.GENERATIONS.map((g) => ({ label: g.group, value: g.share })), { fmt: (v) => v.toFixed(2) + '%' })}
    ${srcLine(D.GENERATIONS_SOURCE)}
  </section>
  <section class="panel">
    <h2>Where people live</h2>
    <p>56% of Indonesians live on Java, an island with about 7% of the country’s land. The ten largest provinces hold 72.5% of the population.</p>
    <p class="more"><a href="#/regions">Provincial tables &rarr;</a></p>
  </section>`;
}

// ----------------------------------------------------------------- economy
export function viewEconomy() {
  return `
  ${pageHead('Economy', 'Southeast Asia’s largest economy: Rp22,139 trillion of GDP in 2024, growing 5.03% a year, with inflation down to 1.57% and poverty at its lowest on record.')}
  <section class="grid-4" aria-label="Economy headline figures">
    ${statCard({ label: 'GDP, 2024', value: 'Rp22,139tn', note: 'US$1.40 trillion at current prices', src: 'BPS, 2024' })}
    <article class="card stat"><p class="stat-label">GDP per capita, 2024</p><p class="stat-value" id="gdp-pc">Rp78.6m</p><p class="stat-note">US$4,960 per person</p><p class="stat-src">Source: BPS, 2024</p><p><button class="btn" id="gdp-pc-toggle" type="button">Show in US$</button></p></article>
    ${statCard({ label: 'GDP growth, 2024', value: '5.03%', note: 'Year on year', src: 'BPS, 2024' })}
    ${statCard({ label: 'Inflation, Dec 2024', value: '1.57%', note: 'Year on year, CPI', src: 'BPS, 2024' })}
  </section>
  <section class="panel">
    <div class="tabs" role="tablist" aria-label="Economy charts">
      <button class="tab active" data-tab="growth" role="tab" aria-selected="true" type="button">Growth</button>
      <button class="tab" data-tab="prices" role="tab" aria-selected="false" type="button">Prices &amp; poverty</button>
      <button class="tab" data-tab="trade" role="tab" aria-selected="false" type="button">Trade</button>
    </div>
    <div class="tab-panel" id="tab-growth">
      <h2>Growth held at about 5%</h2>
      <p class="panel-sub">Real GDP growth, year on year. The 2020 contraction was the pandemic year; growth has sat just above 5% since 2022.</p>
      ${barChart(D.GDP_GROWTH.map((r) => ({ label: String(r.year), value: r.g })), { fmt: (v) => v.toFixed(2) + '%', color: '#0f766e', aria: 'Bar chart of GDP growth 2020 to 2024' })}
      ${srcLine(D.GDP_GROWTH_SOURCE)}
    </div>
    <div class="tab-panel hidden" id="tab-prices">
      <h2>Prices cooled, poverty fell</h2>
      <p class="panel-sub">Inflation is December year on year; poverty is the September rate.</p>
      ${lineChart(D.INFLATION.map((r) => ({ label: String(r.year), value: r.v })), { fmt: (v) => v.toFixed(2) + '%', color: '#b45309', aria: 'Line chart of inflation 2020 to 2024' })}
      ${srcLine(D.INFLATION_SOURCE)}
      ${lineChart(D.POVERTY.map((r) => ({ label: String(r.year), value: r.v })), { fmt: (v) => v.toFixed(2) + '%', color: '#0f766e', aria: 'Line chart of poverty rate 2020 to 2024' })}
      ${srcLine(D.POVERTY_SOURCE)}
      <p>Poverty fell to 8.57% in September 2024 — 24.06 million people — the lowest rate BPS has recorded.</p>
    </div>
    <div class="tab-panel hidden" id="tab-trade">
      <h2>Trade and money</h2>
      <div class="grid-3">${D.TRADE.map(statCard).join('')}</div>
      <p>Exports of US$264.70 billion against imports of US$233.66 billion left a surplus of US$31.04 billion in 2024, the fifth straight yearly surplus.</p>
    </div>
  </section>
  <section class="panel">
    <h2>What the economy is made of</h2>
    <p class="panel-sub">Share of GDP at current prices, 2024. Manufacturing is the largest single sector; services and trade together are bigger still.</p>
    ${donut(D.SECTORS, { centre: '18.67%', centreSub: 'manufacturing', aria: 'Donut chart of GDP by sector 2024' })}
    ${srcLine(D.SECTORS_SOURCE)}
  </section>`;
}

// ------------------------------------------------------------------ health
export function viewHealth() {
  const cards = D.HEALTH.map(statCard).join('');
  return `
  ${pageHead('Health', 'People live longer and fewer mothers and babies die than a decade ago — but one in five children under five is still stunted.')}
  <section class="grid-3" aria-label="Health figures">${cards}</section>
  <section class="panel">
    <h2>Mortality fell sharply in fifteen years</h2>
    <p class="panel-sub">Infant deaths per 1,000 live births and maternal deaths per 100,000 live births, 2010 vs 2025.</p>
    <div class="compare">
      ${D.MORTALITY.map((m) => `
        <div class="compare-row">
          <p class="compare-label">${m.label}</p>
          <div class="compare-bars">
            <div class="compare-bar"><span>2010</span><span class="track"><span class="fill" style="width:100%;background:#c25e3a"></span></span><strong>${m.from}</strong></div>
            <div class="compare-bar"><span>2025</span><span class="track"><span class="fill" style="width:${(m.to / m.from * 100).toFixed(1)}%;background:#0f766e"></span></span><strong>${m.to}</strong></div>
          </div>
        </div>`).join('')}
    </div>
    ${srcLine(D.MORTALITY_SOURCE)}
    <p>Infant mortality nearly halved and maternal mortality fell by more than half between 2010 and 2025.</p>
  </section>
  <section class="panel">
    <h2>Coverage and connection</h2>
    <p>Nearly everyone — 98.7% of the population — is covered by the national health insurance scheme JKN (BPJS Kesehatan, 2024). And 221.6 million Indonesians are online (APJII, 2024), which is how most people now reach health information and services.</p>
  </section>`;
}

// --------------------------------------------------------------- education
export function viewEducation() {
  const cards = D.EDUCATION.map(statCard).join('');
  return `
  ${pageHead('Education', 'Nearly everyone can read, children stay in school for 13 years on average, and human development reached 75.02 in 2024 — but the average adult still left school after about nine years.')}
  <section class="grid-3" aria-label="Education figures">${cards}</section>
  <section class="panel">
    <h2>Schooling, in years</h2>
    <p class="panel-sub">Mean years of schooling (adults 25+) and expected years (a child starting school today), BPS 2024.</p>
    ${shareBars([
      { label: 'Mean years of schooling — adults', value: 9.04 },
      { label: 'Expected years of schooling — children', value: 13.21 },
    ], { fmt: (v) => v.toFixed(2) + ' yrs', color: '#b45309' })}
    ${srcLine('BPS, 2024')}
    <p>The four-year gap between the two is the story of the last generation: children today stay in school much longer than their parents did.</p>
  </section>
  <section class="panel">
    <h2>Human development</h2>
    <p>Indonesia’s Human Development Index reached <strong>75.02</strong> in 2024 (BPS), in the “high human development” band. The index combines health (life expectancy 73.8 years), education (mean 9.04 and expected 13.21 years of schooling) and living standards (GDP per capita US$4,960).</p>
  </section>`;
}

// ----------------------------------------------------------------- regions
export function viewRegions() {
  const rows = D.PROVINCES.map((p) => `
    <tr><td>${p.name}</td><td data-v="${p.pop}">${p.pop.toFixed(2)}</td><td data-v="${p.share}">${p.share.toFixed(1)}%</td></tr>`).join('');
  return `
  ${pageHead('Provinces & islands', 'Where 281.6 million people live: ten provinces hold nearly three-quarters of the country, and Java alone holds 56%.')}
  <section class="panel">
    <h2>Ten largest provinces</h2>
    <p class="panel-sub">Population at mid-2024, millions. Click a column heading to sort; type in the box to filter.</p>
    <p><label class="filter-label" for="prov-filter">Filter provinces <input id="prov-filter" type="search" placeholder="Type a province name…" autocomplete="off"></label></p>
    <div class="table-wrap">
    <table id="prov-table">
      <thead><tr>
        <th><button class="sort" data-key="0" type="button">Province</button></th>
        <th><button class="sort" data-key="1" type="button">Population (m)</button></th>
        <th><button class="sort" data-key="2" type="button">Share</button></th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>
    ${srcLine(D.PROVINCES_SOURCE)}
    <p class="fine" id="prov-count">Showing 10 of 10 provinces.</p>
  </section>
  <section class="panel">
    <h2>By island group</h2>
    <p class="panel-sub">Share of the national population. Java’s weight is the country’s central fact of geography.</p>
    ${shareBars(D.ISLANDS.map((i) => ({ label: i.group, value: i.share })), { fmt: (v) => v.toFixed(1) + '%' })}
    ${srcLine(D.ISLANDS_SOURCE)}
  </section>
  <section class="panel">
    <h2>Density</h2>
    <p>National density is 149 people per km² (BPS, 2024) — but the average hides the spread: Jakarta packs more than 16,000 people into each km², while the Papuan provinces average fewer than 20.</p>
  </section>`;
}
