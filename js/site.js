(function () {
  var langue = document.documentElement.lang;
  var MENU = { ar: 'القائمة' }[langue] || 'Menu', FERMER = { en: 'Close', ar: 'إغلاق' }[langue] || 'Fermer';
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
        var f = b.dataset.filtre, garde = f === 'tous' || (f === 'realise' ? c.dataset.realise === '1' : c.dataset.type === f);
        c.classList.toggle('cache', !garde);
      });
      // Filtrée, la mosaïque perd son motif : on passe en deux colonnes égales
      document.querySelectorAll('.grille-projets').forEach(function (g) { g.classList.toggle('filtree', b.dataset.filtre !== 'tous'); });
    });
  });

  // Formulaire de contact : sujet transmis par l'adresse (maisons à vendre) et message d'erreur au retour
  var params = new URLSearchParams(location.search), sujet = document.getElementById('sujet');
  if (sujet && params.get('sujet')) {
    sujet.value = params.get('sujet').slice(0, 80);
    var choix = document.querySelector('#type [data-sujet="maison"]');
    if (choix && sujet.value.indexOf('maison') > -1) choix.selected = true;
  }
  var erreur = document.getElementById('erreur');
  if (erreur && params.get('erreur')) erreur.hidden = false;

  var c = document.querySelectorAll('.apparait');
  if (!('IntersectionObserver' in window)) { c.forEach(function (e) { e.classList.add('vu'); }); return; }
  var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vu'); o.unobserve(e.target); } }); }, { threshold: 0.1 });
  c.forEach(function (e) { o.observe(e); });
})();
