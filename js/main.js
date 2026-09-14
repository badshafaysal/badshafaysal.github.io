// Theme toggle
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.theme === 'light') {
  html.classList.remove('dark');
} else {
  html.classList.add('dark');
}

themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
});

// Mobile menu
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => observer.observe(el));

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category.includes(filter);
      card.style.display = show ? '' : 'none';
    });
  });
});

// Video: autoplay muted when in view
const video = document.querySelector('.video-wrap video');
if (video) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.4 });
  videoObserver.observe(video);
}
