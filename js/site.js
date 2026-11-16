(function () {
  // Mobile navbar toggle
  document.querySelectorAll('.w-nav').forEach(function (nav) {
    var btn = nav.querySelector('.w-nav-button');
    var menu = nav.querySelector('.w-nav-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('w--open');
      btn.classList.toggle('w--open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) { menu.classList.remove('w--open'); btn.classList.remove('w--open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  });

  // Early-access modal
  var modal = document.querySelector('.modal-wrapper');
  function openModal(e) { if (e) e.preventDefault(); if (modal) { modal.style.display = 'flex'; modal.classList.remove('is-open'); void modal.offsetWidth; modal.classList.add('is-open'); var f = modal.querySelector('input'); if (f) f.focus(); } }
  function closeModal() { if (modal) modal.style.display = 'none'; }
  document.querySelectorAll('[data-open-modal]').forEach(function (el) { el.addEventListener('click', openModal); });
  if (modal) {
    modal.querySelectorAll('.close-area, .close-icon').forEach(function (el) { el.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  // Forms: no backend on a static host, so show the success state on submit
  document.querySelectorAll('form[data-static-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var wrap = form.parentElement;
      form.style.display = 'none';
      var done = wrap.querySelector('.w-form-done');
      if (done) done.style.display = 'block';
    });
  });

  // Testimonial slider
  document.querySelectorAll('.w-slider').forEach(function (slider) {
    var track = slider.querySelector('.w-slider-track');
    var slides = slider.querySelectorAll('.w-slide');
    var prev = slider.querySelector('.w-slider-arrow-left');
    var next = slider.querySelector('.w-slider-arrow-right');
    var i = 0;
    function step() {
      var s = slides[0];
      return s.getBoundingClientRect().width + parseFloat(getComputedStyle(s).marginRight || 0);
    }
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-i * step()) + 'px)';
    }
    if (prev) prev.addEventListener('click', function () { go(i - 1); });
    if (next) next.addEventListener('click', function () { go(i + 1); });
    window.addEventListener('resize', function () { go(i); });
    var x0 = null;
    slider.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  });

  // Scroll-in animations: play once when the element's top reaches the middle of the screen
  var anim = document.querySelectorAll('.task-card, .calendar-card');
  if (anim.length && document.documentElement.classList.contains('js-motion')) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -50% 0px' });
      anim.forEach(function (el) { io.observe(el); });
    } else {
      anim.forEach(function (el) { el.classList.add('is-in'); });
    }
  }
})();
