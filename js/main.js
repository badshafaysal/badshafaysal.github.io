/* =========================================================
   Badsha Faysal Portfolio — Main JS
   Theme · Nav · Filters · Lightbox · Animations · Video
   ========================================================= */

(function () {
  "use strict";

  const html = document.documentElement;
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scroll-progress");
  const backTop = document.getElementById("back-top");
  const themeToggle = document.getElementById("theme-toggle");
  const mobileBtn = document.getElementById("mobile-btn");
  const mobileClose = document.getElementById("mobile-close");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileDrawer = document.getElementById("mobile-drawer");

  /* ---------- Theme ---------- */
  function applyTheme(isDark) {
    html.classList.toggle("dark", isDark);
    localStorage.theme = isDark ? "dark" : "light";
    const sun = themeToggle?.querySelector(".icon-sun");
    const moon = themeToggle?.querySelector(".icon-moon");
    if (sun && moon) {
      sun.style.display = isDark ? "block" : "none";
      moon.style.display = isDark ? "none" : "block";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#070b14" : "#f6f5f1");
  }

  const stored = localStorage.theme;
  if (stored === "light") applyTheme(false);
  else if (stored === "dark") applyTheme(true);
  else applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

  themeToggle?.addEventListener("click", () => {
    applyTheme(!html.classList.contains("dark"));
  });

  /* ---------- Mobile drawer ---------- */
  function openDrawer() {
    mobileDrawer.hidden = false;
    mobileOverlay.hidden = false;
    requestAnimationFrame(() => {
      mobileDrawer.classList.add("open");
      mobileOverlay.classList.add("open");
    });
    mobileBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    mobileOverlay.classList.remove("open");
    mobileBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!mobileDrawer.classList.contains("open")) {
        mobileDrawer.hidden = true;
        mobileOverlay.hidden = true;
      }
    }, 350);
  }

  mobileBtn?.addEventListener("click", openDrawer);
  mobileClose?.addEventListener("click", closeDrawer);
  mobileOverlay?.addEventListener("click", closeDrawer);
  mobileDrawer?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeLightbox();
    }
  });

  /* ---------- Scroll: progress, nav, back-top, active section ---------- */
  const sections = ["home", "services", "projects", "process", "about", "contact"];
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-drawer a[data-section]");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (y / docH) * 100 : 0;

    if (progress) progress.style.width = pct + "%";
    nav?.classList.toggle("scrolled", y > 24);
    backTop?.classList.toggle("visible", y > 480);

    let current = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    }
    navLinks.forEach((a) => {
      const sec = a.getAttribute("data-section") || (a.getAttribute("href") || "").slice(1);
      a.classList.toggle("active", sec === current);
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const show = filter === "all" || (card.dataset.category || "").includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxTags = document.getElementById("lightbox-tags");
  const lightboxCloseBtn = document.getElementById("lightbox-close");

  function openLightbox(card) {
    const img = card.querySelector("img");
    if (!img || !lightbox) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightboxTitle.textContent = card.dataset.title || "";
    lightboxDesc.textContent = card.dataset.desc || "";
    const tags = card.dataset.tags || "";
    lightboxTags.innerHTML = tags
      .split("·")
      .map((t, i) => (i === 0 ? `<span class="cat">${t.trim()}</span>` : ` · ${t.trim()}`))
      .join("");
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("open"));
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!lightbox.classList.contains("open")) lightbox.hidden = true;
    }, 300);
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(card);
      }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });

  lightboxCloseBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- Video ---------- */
  const video = document.getElementById("hero-video");
  const playBtn = document.getElementById("video-play");
  const muteBtn = document.getElementById("video-mute");

  if (video) {
    const playIcon = playBtn?.querySelector(".play-icon");
    const pauseIcon = playBtn?.querySelector(".pause-icon");

    function syncPlayUI() {
      const playing = !video.paused;
      if (playIcon) playIcon.style.display = playing ? "none" : "block";
      if (pauseIcon) pauseIcon.style.display = playing ? "block" : "none";
    }

    playBtn?.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
      syncPlayUI();
    });

    muteBtn?.addEventListener("click", () => {
      video.muted = !video.muted;
      muteBtn.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
    });

    video.addEventListener("play", syncPlayUI);
    video.addEventListener("pause", syncPlayUI);

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
          syncPlayUI();
        });
      },
      { threshold: 0.35 }
    );
    videoObserver.observe(video);
  }

  /* ---------- Stats counter ---------- */
  const stats = document.querySelectorAll(".stat strong[data-count]");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isFloat = target % 1 !== 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = target * eased;
          el.textContent = isFloat ? val.toFixed(1) + "+" : Math.round(val) + "+";
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statsObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((s) => statsObserver.observe(s));

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value?.trim() || "";
    const email = document.getElementById("email")?.value?.trim() || "";
    const msg = document.getElementById("msg")?.value?.trim() || "";
    if (!name || !email || !msg) return;
    const subject = encodeURIComponent("Project Enquiry from " + name);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${msg}`
    );
    window.location.href = `mailto:badshafaysal55@gmail.com?subject=${subject}&body=${body}`;
  });

  /* ---------- Responsive mobile btn ---------- */
  function handleResize() {
    if (window.innerWidth >= 1024) {
      closeDrawer();
      if (mobileBtn) mobileBtn.style.display = "none";
    } else if (mobileBtn) {
      mobileBtn.style.display = "flex";
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize, { passive: true });
})();
