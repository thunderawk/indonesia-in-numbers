// Router and interactions for Indonesia in Numbers.
//
// Hash routes: #/ (overview), #/population, #/economy, #/health,
// #/education, #/regions. After each render the page wires up the
// controls that view carries: economy tabs, the GDP-per-capita toggle,
// the province table sort + filter, and the indicator search.

import { INDICATORS } from './data.js';
import * as V from './views.js';

const ROUTES = {
  '': V.viewOverview,
  'population': V.viewPopulation,
  'economy': V.viewEconomy,
  'health': V.viewHealth,
  'education': V.viewEducation,
  'regions': V.viewRegions,
};

const app = document.getElementById('app');

function routeName() {
  const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
  return ROUTES[hash] ? hash : '';
}

function render() {
  const name = routeName();
  app.innerHTML = (ROUTES[name] || V.viewOverview)();
  document.querySelectorAll('.main-nav a').forEach((a) => {
    const on = (a.getAttribute('data-route') || '') === (name || 'overview');
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wirePage(name);
  window.scrollTo(0, 0);
}

function wirePage(name) {
  if (name === 'economy') wireEconomy();
  if (name === 'regions') wireRegions();
}

// Economy tabs: one panel visible at a time.
function wireEconomy() {
  const tabs = app.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      app.querySelectorAll('.tab-panel').forEach((p) => p.classList.add('hidden'));
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.remove('hidden');
    });
  });
  // GDP per capita: switch the headline between rupiah and dollars.
  const toggle = document.getElementById('gdp-pc-toggle');
  const value = document.getElementById('gdp-pc');
  if (toggle && value) {
    let inUsd = false;
    toggle.addEventListener('click', () => {
      inUsd = !inUsd;
      value.textContent = inUsd ? 'US$4,960' : 'Rp78.6m';
      toggle.textContent = inUsd ? 'Show in rupiah' : 'Show in US$';
    });
  }
}

// Province table: click a heading to sort, type to filter.
function wireRegions() {
  const table = document.getElementById('prov-table');
  const filter = document.getElementById('prov-filter');
  const count = document.getElementById('prov-count');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  let sortKey = -1;
  let sortAsc = true;

  function applyFilter() {
    const q = (filter ? filter.value : '').trim().toLowerCase();
    let shown = 0;
    tbody.querySelectorAll('tr').forEach((tr) => {
      const hit = !q || tr.cells[0].textContent.toLowerCase().includes(q);
      tr.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    });
    if (count) count.textContent = `Showing ${shown} of 10 provinces.`;
  }

  table.querySelectorAll('.sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = Number(btn.dataset.key);
      sortAsc = (sortKey === key) ? !sortAsc : true;
      sortKey = key;
      const rows = [...tbody.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const av = a.cells[key].dataset.v ?? a.cells[key].textContent;
        const bv = b.cells[key].dataset.v ?? b.cells[key].textContent;
        const an = parseFloat(av), bn = parseFloat(bv);
        const cmp = Number.isNaN(an) || Number.isNaN(bn)
          ? String(av).localeCompare(String(bv))
          : an - bn;
        return sortAsc ? cmp : -cmp;
      });
      rows.forEach((r) => tbody.appendChild(r));
      table.querySelectorAll('.sort').forEach((b) => b.removeAttribute('data-dir'));
      btn.setAttribute('data-dir', sortAsc ? 'asc' : 'desc');
    });
  });

  if (filter) filter.addEventListener('input', applyFilter);
}

// Indicator search in the header: filters the index, Enter picks the
// first match, clicking a result navigates to its section.
const search = document.getElementById('search');
const results = document.getElementById('search-results');

function closeSearch() {
  results.innerHTML = '';
  results.classList.remove('open');
  search.setAttribute('aria-expanded', 'false');
}

function runSearch() {
  const q = search.value.trim().toLowerCase();
  if (q.length < 2) { closeSearch(); return; }
  const hits = INDICATORS.filter((i) => i.name.toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) {
    results.innerHTML = `<li class="no-hit">No indicator matches “${search.value.trim()}”.</li>`;
  } else {
    results.innerHTML = hits.map((h, i) =>
      `<li role="option" data-route="${h.route}" data-i="${i}"><strong>${h.name}</strong><span>${h.value} · ${h.src}</span></li>`).join('');
  }
  results.classList.add('open');
  search.setAttribute('aria-expanded', 'true');
}

search.addEventListener('input', runSearch);
search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const first = results.querySelector('li[data-route]');
    if (first) {
      location.hash = first.dataset.route;
      closeSearch();
      search.value = '';
    }
  } else if (e.key === 'Escape') {
    closeSearch();
  }
});
results.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-route]');
  if (!li) return;
  location.hash = li.dataset.route;
  closeSearch();
  search.value = '';
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box')) closeSearch();
});

window.addEventListener('hashchange', render);
render();
