/* =========================================================
   カレッジ文化祭 2026「まぜまぜ。」
   ヘッダー / モバイルメニュー / スクロール演出 / カウントダウン
   ========================================================= */
(function () {
  'use strict';

  /* ---- 開催初日（カウントダウンの基準日） ---- */
  var FESTIVAL_START = '2026-11-14T10:00:00+09:00';

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     ヘッダー：スクロールで背景を出す
     --------------------------------------------------------- */
  var header = document.getElementById('siteHeader');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------------------------------------------------------
     モバイルメニュー
     --------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('is-open', !open);
      navToggle.setAttribute('aria-expanded', String(!open));
    });

    // メニュー内リンクを押したら閉じる
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    // Esc で閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // 画面幅が戻ったら状態をリセット
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) closeNav();
    });
  }

  /* ---------------------------------------------------------
     スクロールで要素をふわっと表示
     --------------------------------------------------------- */
  var revealTargets = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    Array.prototype.forEach.call(revealTargets, function (el, i) {
      // 同じグリッド内の要素を少しずつ遅らせる
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------
     ページ内の別ページ切り替え
     GitHub Pages で別ファイルを増やさずに、ハッシュに応じて
     トップと各専用ページを入れ替えます。
     URL をそのまま共有すれば、その専用ページが開きます。
     ページを増やすときは SUBPAGES に1行足してください。
     --------------------------------------------------------- */
  var SUBPAGES = {
    '#sponsor':   { id: 'sponsor',   title: '協賛企業・店舗さま募集のご案内' },
    '#supporter': { id: 'supporter', title: '個人応援（クラウドファンディング）のご案内' }
  };

  var viewHome = document.getElementById('view-home');
  var BASE_TITLE = document.title;

  // #supporter-apply のような専用ページ内のアンカーでも、
  // その専用ページを開いたままにするため、対象要素の所属を調べる
  function subpageForHash(hash) {
    if (SUBPAGES[hash]) return SUBPAGES[hash];
    if (hash.length < 2) return null;

    var target = document.getElementById(hash.slice(1));
    if (!target) return null;

    for (var key in SUBPAGES) {
      var el = document.getElementById(SUBPAGES[key].id);
      if (el && el.contains(target)) return SUBPAGES[key];
    }
    return null;
  }

  function syncView() {
    if (!viewHome) return;

    var current = subpageForHash(location.hash);
    var isSub = false;

    for (var key in SUBPAGES) {
      var el = document.getElementById(SUBPAGES[key].id);
      if (!el) continue;
      var active = !!current && SUBPAGES[key].id === current.id;
      el.hidden = !active;
      if (active) isSub = true;
    }

    viewHome.hidden = isSub;
    document.body.classList.toggle('is-subpage', isSub);
    document.title = isSub
      ? current.title + '｜第6回カレッジ文化祭〜まぜまぜ。〜'
      : BASE_TITLE;

    closeNav();

    // 表示を切り替えたあとで、改めて目的の位置へ移動する。
    // ハッシュが変わった時点では対象がまだ hidden なので、
    // ブラウザの自動スクロールが効かないため。
    var hashId = location.hash.length > 1 ? location.hash.slice(1) : '';
    var isViewRoot = hashId === '' || hashId === 'top'
      || hashId === 'sponsor' || hashId === 'supporter';
    var target = isViewRoot ? null : document.getElementById(hashId);

    if (target) {
      // scrollIntoView は scroll-padding-top を見てくれるので、
      // 固定ヘッダーに隠れずに済む
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  if (viewHome) {
    window.addEventListener('hashchange', syncView);
    syncView();
  }

  /* ---------------------------------------------------------
     カウントダウン（開幕まであと何日）
     --------------------------------------------------------- */
  var countdown = document.getElementById('countdown');
  var countdownNum = document.getElementById('countdownNum');

  if (countdown && countdownNum) {
    var start = new Date(FESTIVAL_START).getTime();
    var diff = start - Date.now();

    if (!isNaN(start) && diff > 0) {
      countdownNum.textContent = String(Math.ceil(diff / 86400000));
      countdown.hidden = false;
    }
  }
})();
