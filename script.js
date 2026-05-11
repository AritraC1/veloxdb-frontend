// ── MOBILE MENU ──
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger bar animations
        entry.target.querySelectorAll('.bench-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        // Trigger counter animations
        entry.target.querySelectorAll('[data-target]').forEach(el => {
          animateCounter(el);
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Also observe stats bar separately
  document.querySelectorAll('[data-target]').forEach(el => {
    observer.observe(el.closest('.reveal') || el);
  });

  // ── COUNTER ANIMATION ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      if (target > 1000) {
        el.textContent = current.toLocaleString() + suffix;
      } else {
        el.textContent = current + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── COMMANDS SWITCHER ──
  function showCmd(id, el) {
    document.querySelectorAll('.cmd-detail').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.cmd-list-item').forEach(i => i.classList.remove('active'));
    document.getElementById('cmd-' + id).classList.add('active');
    el.classList.add('active');
  }

  // ── COPY BUTTON ──
  function copyCode(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'copied!';
      btn.style.color = '#28C840';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = '';
      }, 1500);
    });
  }

  // ── NAVBAR SCROLL ──
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      nav.style.borderBottomColor = 'var(--border)';
    }
  });

  // ── CLOSE MENU ON OUTSIDE CLICK ──
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove('open');
    }
  });