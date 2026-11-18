(function () {
  var en = document.documentElement.lang === 'en';
  var MENU = en ? 'Menu' : 'Menu', FERMER = en ? 'Close' : 'Fermer';
  document.documentElement.classList.remove('sans-js');
  var entete = document.querySelector('.entete');
  function suivre() { entete.classList.toggle('plein', window.scrollY > 60); }
  suivre();
  window.addEventListener('scroll', suivre, { passive: true });

  var ouvrir = document.querySelector('.ouvrir'), menu = document.getElementById('menu');
  function fermer() { menu.classList.remove('ouvert'); ouvrir.textContent = MENU; ouvrir.setAttribute('aria-expanded', 'false'); }
  ouvrir.addEventListener('click', function () {
    if (menu.classList.contains('ouvert')) return fermer();
    menu.classList.add('ouvert'); ouvrir.textContent = FERMER; ouvrir.setAttribute('aria-expanded', 'true');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });

  var boutons = document.querySelectorAll('.filtres button');
  boutons.forEach(function (b) {
    b.addEventListener('click', function () {
      boutons.forEach(function (x) { x.classList.toggle('actif', x === b); x.setAttribute('aria-pressed', x === b); });
      document.querySelectorAll('.grille-projets .carte').forEach(function (c) {
        c.classList.toggle('cache', b.dataset.filtre !== 'tous' && c.dataset.type !== b.dataset.filtre);
      });
    });
  });

  var c = document.querySelectorAll('.apparait');
  if (!('IntersectionObserver' in window)) { c.forEach(function (e) { e.classList.add('vu'); }); return; }
  var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vu'); o.unobserve(e.target); } }); }, { threshold: 0.1 });
  c.forEach(function (e) { o.observe(e); });
})();
