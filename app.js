import { collection } from './collection.js';

const $ = (selector) => document.querySelector(selector);
const items = $('#items');
const search = $('#search');
const dialog = $('#detail');
const categoryNames = { manga: 'Manga', 'light-novels': 'Light novel', figurines: 'Figurine', 'vtuber-merch': 'VTuber merch', misc: 'Misc' };
const isBook = item => ['manga', 'light-novels'].includes(item.category);
const statusNames = { owned: 'Owned', wishlist: 'Wishlist' };
let activeCategory = 'all';
let activeStatus = 'all';
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const coverURL = item => item.image ? new URL(`./assets/covers/${item.image}`, import.meta.url).href : item.placeholderArt === 'artoria' ? new URL('./assets/artoria-reading.webp', import.meta.url).href : null;
const belongsTo = (item, category) => category === 'all' || item.category === category || item.categories?.includes(category);
const inCategory = item => belongsTo(item, activeCategory);
const inStatus = item => activeStatus === 'all' || item.status === activeStatus;
const languageFlags = { French: '🇫🇷', English: '🇬🇧', Japanese: '🇯🇵' };
const flag = item => item.language ? `<span class="language-flag" role="img" aria-label="${escapeHTML(item.language)} edition" title="${escapeHTML(item.language)} edition">${languageFlags[item.language] || escapeHTML(item.language)}</span>` : '';
const sampleMode = collection.length > 0 && collection.every(item => item.sample);
const ownedBooks = collection.reduce((sum, item) => sum + (isBook(item) && item.status === 'owned' ? item.ownedVolumes || 0 : 0), 0);
$('#inventory-summary').textContent = `${collection.length} ${sampleMode ? 'sample entries' : 'entries'}${!sampleMode && ownedBooks ? ` · ${ownedBooks} books` : ''}`;
$('#data-note').textContent = sampleMode ? 'Sample data' : '';

function updateCounts() {
  document.querySelectorAll('[data-category]').forEach(button => {
    button.querySelector('span').textContent = collection.filter(item => inStatus(item) && belongsTo(item, button.dataset.category)).length;
  });
  document.querySelectorAll('.status-filters [data-status]').forEach(button => {
    button.querySelector('.count').textContent = collection.filter(item => inCategory(item) && (button.dataset.status === 'all' || item.status === button.dataset.status)).length;
  });
}

function render() {
  $('#mobile-status').value = activeStatus;
  document.querySelectorAll('.status-filters [data-status]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.status === activeStatus)));
  updateCounts();
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = collection.filter(item => inCategory(item) && inStatus(item) && `${item.title} ${item.originalTitle || ''} ${categoryNames[item.category]} ${item.format} ${item.manufacturer || ''} ${item.language || ''} ${item.talent || ''} ${item.edition || ''} ${item.setName || ''} ${item.signature || ''} ${item.message || ''}`.toLocaleLowerCase().includes(query));
  const sort = $('#sort').value;
  if (sort === 'default') filtered.sort((a, b) => ['manga', 'light-novels', 'figurines', 'vtuber-merch', 'misc'].indexOf(a.category) - ['manga', 'light-novels', 'figurines', 'vtuber-merch', 'misc'].indexOf(b.category));
  if (sort !== 'default') filtered.sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  $('#results').textContent = `${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}`;
  items.innerHTML = filtered.map(item => {
    const progress = item.contents || (item.ownedVolumes == null ? '' : item.totalVolumes ? `${item.ownedVolumes} / ${item.totalVolumes} volumes` : `${item.ownedVolumes} volumes owned`);
    return `<button class="item" data-id="${item.id}" data-kind="${isBook(item) ? 'book' : 'object'}" data-status="${item.status}" aria-label="View ${escapeHTML(item.title)}"><span class="cover ${item.image ? '' : 'placeholder'}">${coverURL(item) ? `<img src="${coverURL(item)}" alt="" width="160" height="240" loading="lazy" decoding="async">` : '<span class="missing-photo" aria-hidden="true">◇</span>'}<span class="media-type">${item.image ? item.categories?.length > 1 ? 'Manga + novel' : categoryNames[item.category] : 'Photo pending'}</span>${flag(item)}${item.quantity > 1 ? `<span class="quantity-badge" aria-hidden="true">×${item.quantity}</span>` : ''}</span><span class="item-copy"><span class="item-title">${escapeHTML(item.title)}</span><span class="item-subtitle">${escapeHTML(item.format)}${item.scale ? ` · ${escapeHTML(item.scale)}` : ''}</span></span><span class="item-status"><span class="status-dot" aria-hidden="true"></span>${item.status === 'owned' && item.totalVolumes != null ? item.ownedVolumes === item.totalVolumes ? 'Complete' : 'Owned' : statusNames[item.status]}</span>${progress ? `<span class="item-progress">${escapeHTML(progress)}${item.totalVolumes > 0 ? `<span class="volume-track" aria-hidden="true" style="--owned:${Math.min(100, Math.max(0, item.ownedVolumes / item.totalVolumes * 100))}%"></span>` : ''}</span>` : ''}</button>`;
  }).join('');
  $('#empty').hidden = filtered.length !== 0;
  if (!filtered.length) $('#empty-description').textContent = query ? 'No titles match your search.' : `No ${activeCategory === 'all' ? 'items' : categoryNames[activeCategory].toLowerCase() + ' entries'} ${activeStatus === 'wishlist' ? 'on the wishlist' : activeStatus === 'owned' ? 'marked as owned' : 'in this view'}.`;
}

for (const kind of ['category', 'status']) {
  document.querySelectorAll(`${kind === 'status' ? '.status-filters ' : '.filters '}[data-${kind}]`).forEach(button => button.addEventListener('click', () => {
    if (kind === 'category') activeCategory = button.dataset.category;
    else activeStatus = button.dataset.status;
    document.querySelectorAll(`${kind === 'status' ? '.status-filters ' : '.filters '}button[data-${kind}]`).forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    render();
  }));
}
$('#mobile-status').addEventListener('change', event => { activeStatus = event.target.value; render(); });
search.addEventListener('input', render);
$('#sort').addEventListener('change', render);
$('#reset').addEventListener('click', () => {
  search.value = '';
  activeCategory = 'all'; activeStatus = 'all';
  for (const kind of ['category', 'status']) document.querySelectorAll(`${kind === 'status' ? '.status-filters ' : '.filters '}button[data-${kind}]`).forEach(button => button.setAttribute('aria-pressed', String(button.dataset[kind] === 'all')));
  render();
  search.focus();
});
for (const mode of ['grid', 'list']) {
  $(`#${mode}-view`).addEventListener('click', () => {
    items.classList.toggle('list', mode === 'list');
    $('#grid-view').setAttribute('aria-pressed', String(mode === 'grid'));
    $('#list-view').setAttribute('aria-pressed', String(mode === 'list'));
  });
}
function detailFields(entries) {
  const fields = entries.filter(([, value]) => value != null && value !== '');
  return fields.length ? `<dl class="detail-fields">${fields.map(([label, value]) => `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl>` : '';
}

items.addEventListener('click', event => {
  const button = event.target.closest('[data-id]');
  if (!button) return;
  const item = collection.find(item => item.id === button.dataset.id);
  const badges = [];
  if (/limited/i.test(item.edition || '')) badges.push('Limited edition');
  if (item.signature) badges.push(item.signature);
  if (item.condition) badges.push(item.condition);
  if (item.status !== 'owned') badges.push(statusNames[item.status]);
  const subtitle = item.setName || item.edition;
  const facts = [['Format', item.format]];
  if (item.quantity > 1) facts.push(['Quantity owned', `${item.quantity}`]);
  if (isBook(item)) {
    if (item.contents) facts.push(['Contents', item.contents]);
    else if (item.ownedVolumes != null) facts.push(['Volumes owned', item.ownedRange ? `Vol. ${item.ownedRange}` : `${item.ownedVolumes}`]);
    if (item.totalVolumes && !item.contents) facts.push(['Series length', `${item.totalVolumes} volumes`]);
    if (item.language) facts.push(['Edition language', `${languageFlags[item.language] || ''} ${item.language}`]);
    facts.push(['Publisher', item.publisher]);
  } else {
    facts.push(['Maker', item.manufacturer], ['Scale', item.scale], ['Talent', item.talent], ['Variant', item.variant], ['Size', item.size]);
  }
  const finishing = [['Message', item.message], ['Technique', item.technique]];
  if (item.setName && item.edition && !/limited/i.test(item.edition)) finishing.push(['Edition', item.edition]);
  const url = coverURL(item);
  $('#detail-content').innerHTML = `<div class="detail-layout">
    <div class="detail-artwork">${url ? `<button class="artwork-button" aria-label="Enlarge image"><img class="detail-cover" src="${url}" alt="${escapeHTML(item.title)}"><span class="enlarge-hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg>View image</span></button>` : '<div class="detail-photo-pending"><span aria-hidden="true">◇</span><span>Photo pending</span></div>'}</div>
    <div class="detail-copy"><span class="detail-category">${item.categories?.length > 1 ? 'Manga + novel' : categoryNames[item.category]}</span>
      <h2 id="detail-title">${escapeHTML(item.title)}</h2>
      ${subtitle ? `<p class="detail-edition">${escapeHTML(subtitle)}</p>` : ''}
      ${badges.length ? `<div class="detail-badges">${badges.map(badge => `<span>${escapeHTML(badge)}</span>`).join('')}</div>` : ''}
      ${detailFields(facts)}${detailFields(finishing)}
      ${item.note ? `<p class="personal-note">${escapeHTML(item.note)}</p>` : ''}
      ${item.href ? `<a class="catalog-link" href="${escapeHTML(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.linkLabel || 'Catalogue details')} <span aria-hidden="true">↗</span></a>` : ''}
    </div></div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
});

const imageViewer = $('#image-viewer');
$('#detail-content').addEventListener('click', event => {
  if (!event.target.closest('.artwork-button')) return;
  const cover = $('.detail-cover');
  const image = $('#enlarged-image');
  image.src = cover.src;
  image.alt = cover.alt;
  imageViewer.showModal();
});
$('#close-image').addEventListener('click', () => imageViewer.close());
$('#detail .close').addEventListener('click', () => dialog.close());
for (const modal of [dialog, imageViewer]) {
  modal.addEventListener('click', event => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });
}
dialog.addEventListener('close', () => {
  if (imageViewer.open) imageViewer.close();
  document.body.style.overflow = '';
});
imageViewer.addEventListener('close', () => $('#enlarged-image').removeAttribute('src'));
document.addEventListener('keydown', event => {
  if (event.key === '/' && !dialog.open && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); search.focus(); }
  if (event.key === 'Escape' && document.activeElement === search) { search.value = ''; render(); search.blur(); }
});
function updateTheme() {
  const dark = document.documentElement.dataset.theme !== 'light';
  $('#theme').setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#111110' : '#fdfdfc';
  $('#theme').innerHTML = dark ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/></svg>';
}
$('#theme').addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('collection-theme', theme); } catch {}
  updateTheme();
});
const remarks = ['oh, hello.', 'There’s room for one more Saber.', 'I live here too.'];
let remarkIndex = 0;
let remarkTimeout;
$('#companion').addEventListener('click', () => {
  const bubble = $('#companion-remark');
  bubble.textContent = remarks[remarkIndex++ % remarks.length];
  bubble.hidden = false;
  clearTimeout(remarkTimeout);
  remarkTimeout = setTimeout(() => { bubble.hidden = true; }, 3500);
});
updateTheme();
render();
