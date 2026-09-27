if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      'stroke-width': 2,
    },
  });
}

const navLinks = document.querySelectorAll(".side-nav a[href^='#']");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = () => {
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= 120);
  if (!current) return;

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
