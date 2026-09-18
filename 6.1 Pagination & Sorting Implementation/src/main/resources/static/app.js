const state = { page: 0, size: 6, sort: 'publishedOn,desc' };
const grid = document.querySelector('#articleGrid');
const sizeSelect = document.querySelector('#sizeSelect');
const sortSelect = document.querySelector('#sortSelect');

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}
function formatViews(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
}
function renderCards(articles) {
  grid.innerHTML = articles.map((article, index) => `
    <article class="article" style="animation-delay:${index * 45}ms">
      <span class="article-category">${article.category}</span>
      <h3>${article.title}</h3>
      <div class="article-footer"><span>${article.author} · ${article.readTime} min</span><span>${formatViews(article.views)} reads</span></div>
      <small class="article-date">Published ${formatDate(article.publishedOn)}</small>
    </article>`).join('');
}
function renderPages(data) {
  const pages = document.querySelector('#pageButtons');
  pages.innerHTML = '';
  const start = Math.max(0, Math.min(Math.max(0, data.totalPages - 3), state.page - 1));
  const end = Math.min(data.totalPages, start + 3);
  for (let page = start; page < end; page += 1) {
    const button = document.createElement('button');
    button.className = `page-button${page === state.page ? ' active' : ''}`;
    button.textContent = page + 1;
    button.onclick = () => { state.page = page; loadArticles(); };
    pages.appendChild(button);
  }
  document.querySelector('#prevButton').disabled = data.first;
  document.querySelector('#nextButton').disabled = data.last;
}
async function loadArticles() {
  const started = performance.now();
  grid.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';
  const query = new URLSearchParams({ page: state.page, size: state.size, sort: state.sort });
  try {
    const response = await fetch(`/api/articles?${query}`);
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    renderCards(data.content);
    document.querySelector('#totalMetric').textContent = data.totalElements;
    const firstResult = data.totalElements === 0 ? 0 : data.number * data.size + 1;
    const lastResult = Math.min((data.number + 1) * data.size, data.totalElements);
    document.querySelector('#resultSummary').textContent = `Showing ${firstResult}-${lastResult} of ${data.totalElements} articles`;
    document.querySelector('#latency').textContent = `${Math.round(performance.now() - started)} ms response`;
    document.querySelector('#codeUrl').textContent = `/api/articles?page=${state.page}&size=${state.size}&sort=${state.sort}`;
    renderPages(data);
  } catch (error) {
    document.querySelector('#resultSummary').textContent = 'Unable to load articles';
    document.querySelector('#latency').textContent = 'request failed';
    grid.innerHTML = '<div class="empty">The API is unavailable. Start the Spring Boot server to load the catalogue.</div>';
  }
}
sizeSelect.addEventListener('change', event => { state.size = Number(event.target.value); state.page = 0; loadArticles(); });
sortSelect.addEventListener('change', event => { state.sort = event.target.value; state.page = 0; loadArticles(); });
document.querySelector('#prevButton').addEventListener('click', () => { if (state.page > 0) { state.page -= 1; loadArticles(); } });
document.querySelector('#nextButton').addEventListener('click', () => { state.page += 1; loadArticles(); });
document.querySelector('#resetButton').addEventListener('click', () => { state.page = 0; state.size = 6; state.sort = 'publishedOn,desc'; sizeSelect.value = '6'; sortSelect.value = 'publishedOn,desc'; loadArticles(); });
loadArticles();
