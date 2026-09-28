window.lucide?.createIcons({ attrs: { 'stroke-width': 2, 'aria-hidden': 'true' } });
const search = document.querySelector('[data-example-search]');
search?.addEventListener('input', () => {
  const items = [...document.querySelectorAll('[data-search-results] li')];
  items.forEach((item) => {
    item.hidden = !item.textContent.toLowerCase().includes(search.value.trim().toLowerCase());
  });
  document.querySelector('[data-search-status]').textContent =
    items.filter((item) => !item.hidden).length + ' resultados';
});
const form = document.querySelector('[data-example-form]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('[data-form-result]').textContent =
    'Campos obrigatorios validados. Nenhum dado foi enviado.';
});
document.querySelectorAll('.nav-demo a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-demo a').forEach((item) => {
      item.classList.toggle('active', item === link);
      if (item === link) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  });
});
