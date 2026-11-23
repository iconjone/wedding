/**
 * Ashley & Jonathan — Wedding Website Interactivity
 */
(function () {
  "use strict";

  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // ---------------------------------------------------------------------------
  // 1. Hydrate DOM from single-source WEDDING_CONFIG
  // ---------------------------------------------------------------------------
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) {
      el.textContent = value;
    }
  }

  function hydrateContent() {
    setText("partner-one", cfg.couple.partnerOne);
    setText("partner-two", cfg.couple.partnerTwo);
    setText("hero-date-label", cfg.date.displayLabel);
    setText("hero-location-label", cfg.location.shortLabel);
    setText(
      "countdown-caption",
      cfg.date.confirmed ? cfg.date.confirmedCountdownCaption : cfg.date.countdownCaption
    );

    setText("glance-date", cfg.date.displayLabel);
    setText("glance-location", cfg.location.regionLabel);
    setText("glance-attire", cfg.location.attire);

    setText("schedule-footnote", cfg.scheduleNote);

    setText("venue-status", cfg.location.venueStatus);
    setText("venue-name", cfg.location.venueName);
    setText("venue-address", cfg.location.venueAddress);
    setText("venue-description", cfg.location.venueDescription);
    setText("venue-airport", cfg.location.nearestAirport);

    setText(
      "footer-meta",
      `${cfg.couple.partnerOne} & ${cfg.couple.partnerTwo} · ${cfg.date.displayLabel} · ${cfg.location.shortLabel}`
    );

    // Contact button email
    const contactBtn = document.getElementById("contact-couple-btn");
    if (contactBtn && cfg.couple.email) {
      contactBtn.href = `mailto:${cfg.couple.email}?subject=${encodeURIComponent(
        `${cfg.couple.partnerOne} & ${cfg.couple.partnerTwo} Wedding`
      )}`;
    }

    // Activate Google Maps button automatically once venueMapUrl is provided
    const mapBtn = document.getElementById("venue-map-btn");
    if (mapBtn && cfg.location.venueMapUrl) {
      mapBtn.href = cfg.location.venueMapUrl;
      mapBtn.textContent = "Open in Google Maps";
      mapBtn.removeAttribute("aria-disabled");
    }

    // Render schedule items dynamically from config
    const timeline = document.getElementById("schedule-timeline");
    if (timeline && Array.isArray(cfg.schedule) && cfg.schedule.length > 0) {
      timeline.innerHTML = "";
      cfg.schedule.forEach((item) => {
        const article = document.createElement("article");
        article.className = "schedule-item reveal";
        article.setAttribute("role", "listitem");

        article.innerHTML = `
          <div class="schedule-timing">
            <span class="schedule-day"></span>
            <span class="schedule-time"></span>
          </div>
          <span class="schedule-node" aria-hidden="true"></span>
          <div class="schedule-card">
            <h3 class="schedule-title"></h3>
            <p class="schedule-location"></p>
            <p class="schedule-desc"></p>
          </div>
        `;

        article.querySelector(".schedule-day").textContent = item.day;
        article.querySelector(".schedule-time").textContent = item.time;
        article.querySelector(".schedule-title").textContent = item.title;
        article.querySelector(".schedule-location").textContent = item.location;
        article.querySelector(".schedule-desc").textContent = item.description;

        timeline.appendChild(article);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Live Countdown Timer
  // ---------------------------------------------------------------------------
  function startCountdown() {
    const targetMs = new Date(cfg.date.countdownTargetISO).getTime();
    if (Number.isNaN(targetMs)) return;

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function tick() {
      const now = Date.now();
      const diff = Math.max(0, targetMs - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);
    }

    tick();
    window.setInterval(tick, 1000);
  }

  // ---------------------------------------------------------------------------
  // 3. Toast Notification Helper
  // ---------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  // ---------------------------------------------------------------------------
  // 4. Downloadable Save-the-Date Calendar File (.ics)
  // ---------------------------------------------------------------------------
  function downloadCalendarInvite() {
    const summary = `${cfg.couple.partnerOne} & ${cfg.couple.partnerTwo}'s Wedding`;
    const location = cfg.location.venueMapUrl
      ? `${cfg.location.venueName}, ${cfg.location.venueAddress}`
      : cfg.location.regionLabel;
    const description = `Save the Date for ${cfg.couple.partnerOne} & ${cfg.couple.partnerTwo}'s wedding celebration in ${cfg.location.regionLabel}. Details and updates at ${cfg.couple.domain}`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ashley and Jonathan Wedding//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:wedding-save-the-date@ashleyandjonathan.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${cfg.date.icsStartUTC}`,
      `DTEND:${cfg.date.icsEndUTC}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      `URL:${cfg.couple.domain}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ashley-and-jonathan-save-the-date.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("Save-the-Date calendar invite downloaded");
  }

  // ---------------------------------------------------------------------------
  // 5. Sticky Header, Mobile Drawer & Scroll Reveal
  // ---------------------------------------------------------------------------
  function initNavigation() {
    const header = document.getElementById("site-header");
    const openBtn = document.getElementById("mobile-menu-open");
    const closeBtn = document.getElementById("mobile-menu-close");
    const drawer = document.getElementById("mobile-drawer");

    function updateHeader() {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 48);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    function setDrawer(open) {
      if (!drawer || !openBtn) return;
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      openBtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    if (openBtn) openBtn.addEventListener("click", () => setDrawer(true));
    if (closeBtn) closeBtn.addEventListener("click", () => setDrawer(false));

    document.querySelectorAll(".drawer-link").forEach((link) => {
      link.addEventListener("click", () => setDrawer(false));
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) {
        setDrawer(false);
      }
    });

    const waxBtn = document.getElementById("hero-wax-seal");
    if (waxBtn) {
      waxBtn.addEventListener("click", () => {
        const details = document.getElementById("details");
        if (details) details.scrollIntoView({ behavior: "smooth" });
      });
    }

    ["nav-calendar-btn", "hero-calendar-cta", "venue-calendar-btn", "drawer-calendar-btn"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("click", () => {
            setDrawer(false);
            downloadCalendarInvite();
          });
        }
      }
    );

    const copyBtn = document.getElementById("copy-link-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const linkToCopy = cfg.couple.domain || window.location.href;
        try {
          await navigator.clipboard.writeText(linkToCopy);
          showToast("Copied ashleyandjonathan.com to clipboard");
        } catch {
          showToast(linkToCopy);
        }
      });
    }
  }

  function initRevealAnimations() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  // Initialize everything
  hydrateContent();
  startCountdown();
  initNavigation();
  initRevealAnimations();
})();
