// Consentement (RGPD / CNIL) + Google Analytics 4 en mode « Consent Mode v2 ».
// - Mode « avancé » : tout est refusé par défaut, mais le script Google se charge et n'envoie que des signaux anonymes SANS cookie tant que tu n'as pas accepté.
// - Le choix est gardé 6 mois (localStorage), modifiable à tout moment via « Gérer les cookies ».
// - Seule la mesure d'audience est proposée : publicité et personnalisation restent toujours refusées.
(function () {
  var GA = 'G-25JGGYVD72', KEY = 'gl_consent_v1', MAX_MS = 180 * 24 * 3600e3;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
    functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);

  var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 33696000 });
  function apply(ok) {
    gtag('consent', 'update', { analytics_storage: ok ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    if (!ok) { // retrait du consentement : on efface les cookies de mesure déjà posés
      var d = location.hostname.split('.').slice(-2).join('.');
      document.cookie.split(';').forEach(function (c) {
        var n = c.split('=')[0].trim();
        if (n === '_ga' || n.indexOf('_ga_') === 0) { document.cookie = n + '=; Max-Age=0; path=/; domain=.' + d; document.cookie = n + '=; Max-Age=0; path=/'; }
      });
    }
  }
  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && typeof v.a === 'boolean' && Date.now() - v.t < MAX_MS) return v; } catch (e) { /* ignoré */ }
    return null;
  }
  function save(ok) { try { localStorage.setItem(KEY, JSON.stringify({ a: ok, t: Date.now() })); } catch (e) { /* ignoré */ } }

  function css() {
    if (document.getElementById('glc-css')) return;
    var st = document.createElement('style'); st.id = 'glc-css';
    st.textContent = '#glc{position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;max-width:560px;margin:0 auto;background:var(--surface,#fff);color:var(--ink,#0d2a1f);border:1px solid var(--line,#e2ded2);border-radius:16px;padding:14px 16px;box-shadow:0 12px 40px rgba(0,0,0,.3);font:400 15px/1.45 var(--font-body,system-ui,sans-serif);display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px}' +
      '#glc p{margin:0;flex:1 1 240px}#glc a{color:inherit;text-underline-offset:3px;white-space:nowrap}#glc .r{display:flex;gap:8px;flex:0 0 auto}' +
      '#glc button{min-width:96px;min-height:44px;border:1.5px solid var(--ink,#0d2a1f);border-radius:999px;padding:8px 18px;font:600 15px var(--font-body,system-ui,sans-serif);cursor:pointer;background:var(--surface,#fff);color:var(--ink,#0d2a1f)}#glc button:hover{background:var(--bg,#f6f4ee)}#glc button:focus-visible{outline:2px solid var(--ink,#0d2a1f);outline-offset:2px}';
    document.head.appendChild(st);
  }
  function close() { var b = document.getElementById('glc'); if (b) b.remove(); }
  function open() {
    if (document.getElementById('glc')) return;
    css();
    var b = document.createElement('div'); b.id = 'glc'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookies');
    b.innerHTML = '<p>On mesure les visites avec Google Analytics. Tu choisis. <a href="/privacy#cookies">En savoir plus</a></p>' +
      '<div class="r"><button type="button" class="n">Refuser</button><button type="button" class="y">Accepter</button></div>';
    b.querySelector('.y').onclick = function () { save(true); apply(true); close(); };
    b.querySelector('.n').onclick = function () { save(false); apply(false); close(); };
    document.body.appendChild(b);
  }

  window.glConsent = { open: open };
  // Événements de mesure : sans cookie tant que le consentement n'est pas donné. Aucune donnée personnelle ni nom d'entreprise.
  window.glTrack = function (name, params) { gtag('event', name, params || {}); };

  var c = read();
  if (c) apply(c.a);
  function ready() {
    if (!c) open();
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest && e.target.closest('[data-cookies]');
      if (t) { e.preventDefault(); var old = document.getElementById('glc'); if (old) old.remove(); open(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
