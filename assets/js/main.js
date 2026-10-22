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
     GitHub Pages で別ファイルを増やさずに、#sponsor のときだけ
     協賛ページを表示します。URL をそのまま共有すれば協賛ページが開きます。
     --------------------------------------------------------- */
  var viewHome = document.getElementById('view-home');
  var viewSponsor = document.getElementById('sponsor');
  var BASE_TITLE = document.title;
  var SPONSOR_TITLE = '協賛企業・店舗さま募集のご案内｜第6回カレッジ文化祭〜まぜまぜ。〜';

  function syncView() {
    if (!viewHome || !viewSponsor) return;

    var isSponsor = location.hash === '#sponsor';
    viewHome.hidden = isSponsor;
    viewSponsor.hidden = !isSponsor;
    document.body.classList.toggle('is-subpage', isSponsor);
    document.title = isSponsor ? SPONSOR_TITLE : BASE_TITLE;

    // 別ページに移った感覚になるよう、先頭から読み始められるようにする
    if (isSponsor) window.scrollTo(0, 0);
    closeNav();
  }

  if (viewHome && viewSponsor) {
    // ハッシュが空、または #top のときはトップの先頭へ戻す
    window.addEventListener('hashchange', function () {
      var wasSponsor = !viewSponsor.hidden;
      syncView();
      if (wasSponsor && (location.hash === '' || location.hash === '#top')) {
        window.scrollTo(0, 0);
      }
    });
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
