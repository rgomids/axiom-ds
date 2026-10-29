const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const label = (pt, en) => `<span data-en="${escape(en)}">${escape(pt)}</span>`;
function link(href, pt, en, attributes = '') {
  const external = href.startsWith('https://');
  return `<a href="${escape(href)}" ${external ? 'target="_blank" rel="noopener"' : ''} ${attributes}>${label(pt, en)}</a>`;
}
function icon(type) {
  const paths = {
    code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16"/>',
    human: '<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M8 16l3 3 5-6"/>',
    agents: '<path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2Z"/>',
    globe:
      '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    github:
      '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-7a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8s-1.2-.4-4 1.5a13.7 13.7 0 0 0-7.4 0C4.5.5 3.3.9 3.3.9a5 5 0 0 0-.1 3.8A5.4 5.4 0 0 0 1.7 8.5c0 5.5 3.2 6.7 6.2 7A3.4 3.4 0 0 0 7 18.1V22" transform="translate(1 0) scale(.93)"/>',
  };
  return `<svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths[type]}</svg>`;
}
export function footerMarkup(config, year = 2026) {
  const repo = config.repository;
  const chip = (type, href, pt, en) =>
    link(href, pt, en, 'class="footer-chip"').replace('><span', `>${icon(type)}<span`);
  const privacy = config.privacyUrl
    ? link(config.privacyUrl, 'Política de privacidade', 'Privacy policy')
    : `<span class="footer-unavailable" role="link" aria-disabled="true">${label('Política de privacidade', 'Privacy policy')}<span class="footer-sr-only" data-en=" — unavailable"> — indisponível</span></span>`;
  return `<footer class="site-footer" id="rodape">
  <div class="footer-inner"><div class="footer-main">
    <div class="footer-intro">
      <a class="brand footer-brand" href="#inicio" aria-label="Axiom início" data-en-aria="Axiom home"><svg class="brand-original" viewBox="320 240 620 480" width="48" height="48" aria-hidden="true" focusable="false"><image href="assets/axiom-logo.png" width="1254" height="1254"/></svg></a>
      <p class="footer-tagline" data-en="Intent. Decisions. Code. Evidence.">Intenção. Decisões. Código. Evidências.</p>
      <div class="footer-chips">
        ${chip('code', config.termsUrl, 'Open source', 'Open source')}
        ${chip('human', repo + '/blob/main/docs/product/constitution.md', 'Controle humano', 'Human control')}
        ${chip('agents', repo + '/blob/main/docs/commands.md#first-run-and-runtime-integrations', 'Codex e Claude', 'Codex and Claude')}
      </div>
    </div>
    ${config.columns.map((column, index) => `<nav class="footer-column" aria-labelledby="footer-column-${index}"><h2 id="footer-column-${index}" data-en="${escape(column.en)}">${escape(column.pt)}</h2><ul>${column.items.map((item) => `<li>${link(item.href, item.pt, item.en)}</li>`).join('')}</ul></nav>`).join('')}
  </div>
  <div class="footer-bottom">
    <p class="footer-copyright">© ${year} Axiom. ${label('Todos os direitos reservados.', 'All rights reserved.')}</p>
    <div class="footer-legal">${link(config.termsUrl, 'Licença e termos de uso', 'License and terms of use', 'title="Apache 2.0"')}${privacy}</div>
    <div class="footer-tools"><label class="footer-language" data-footer-language hidden>${icon('globe')}<span class="footer-sr-only" data-en="Language">Idioma</span><select id="footer-language"><option value="pt">Português (Brasil)</option><option value="en">English</option></select></label><a class="footer-social" href="${escape(repo)}" target="_blank" rel="noopener" aria-label="Axiom no GitHub" data-en-aria="Axiom on GitHub">${icon('github')}</a></div>
  </div></div>
  </footer>`;
}
