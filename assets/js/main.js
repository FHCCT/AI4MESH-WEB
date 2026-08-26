(() => {
  document.documentElement.classList.add("js-enabled");

  const siteHeader = document.querySelector("[data-site-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const homeBrand = document.querySelector("[data-home-brand]");
  const searchForm = document.querySelector("[data-site-search]");
  const searchInput = document.querySelector("[data-site-search-input]");
  const searchStatus = document.querySelector("[data-site-search-status]");
  const navGroups = Array.from(document.querySelectorAll("[data-nav-group]"));
  const navGroupToggles = Array.from(document.querySelectorAll("[data-nav-group-toggle]"));
  const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
  const desktopNavigation = window.matchMedia("(min-width: 821px)");
  let requestedSectionId = null;
  let requestedSectionTimer = null;

  const finalizeRequestedSection = () => {
    if (!requestedSectionId) return;
    const sectionId = requestedSectionId;
    requestedSectionId = null;
    window.clearTimeout(requestedSectionTimer);
    setActiveSection(sectionId);
  };

  const closeNavGroup = (group) => {
    group?.classList.remove("is-open");
    group?.querySelector("[data-nav-group-toggle]")?.setAttribute("aria-expanded", "false");
  };

  const closeNavGroups = (except = null) => {
    navGroups.forEach((group) => {
      if (group !== except) closeNavGroup(group);
    });
  };

  const setMobileNavigation = (isOpen) => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    const icon = navToggle.querySelector(".nav-toggle-icon");
    if (icon) icon.textContent = isOpen ? "✕" : "☰";
    if (!isOpen) closeNavGroups();
  };

  navToggle?.addEventListener("click", () => {
    setMobileNavigation(navToggle.getAttribute("aria-expanded") !== "true");
  });

  homeBrand?.addEventListener("click", () => {
    requestedSectionId = null;
    setActiveSection(null);
    setMobileNavigation(false);
    closeNavGroups();
  });

  navGroupToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest("[data-nav-group]");
      if (!group) return;
      const willOpen = !group.classList.contains("is-open");
      closeNavGroups(group);
      group.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      requestedSectionId = link.hash.slice(1);
      window.clearTimeout(requestedSectionTimer);
      requestedSectionTimer = window.setTimeout(finalizeRequestedSection, 1500);
      setActiveSection(requestedSectionId);
      setMobileNavigation(false);
      closeNavGroups();
    });
  });

  document.addEventListener("click", (event) => {
    if (siteHeader?.contains(event.target)) return;
    setMobileNavigation(false);
    closeNavGroups();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const openGroup = navGroups.find((group) => group.classList.contains("is-open"));
    if (openGroup) {
      const button = openGroup.querySelector("[data-nav-group-toggle]");
      closeNavGroup(openGroup);
      button?.focus();
      return;
    }

    if (navToggle?.getAttribute("aria-expanded") === "true") {
      setMobileNavigation(false);
      navToggle.focus();
    }
  });

  const syncNavigationViewport = () => {
    setMobileNavigation(false);
  };

  if (typeof desktopNavigation.addEventListener === "function") {
    desktopNavigation.addEventListener("change", syncNavigationViewport);
  } else {
    desktopNavigation.addListener(syncNavigationViewport);
  }

  const sectionTargets = sectionLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter((section, index, sections) => section && sections.indexOf(section) === index)
    .sort((first, second) => first.offsetTop - second.offsetTop);

  const setActiveSection = (sectionId) => {
    sectionLinks.forEach((link) => {
      const isActive = link.hash === `#${sectionId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    navGroups.forEach((group) => {
      group.classList.toggle("has-active-child", Boolean(group.querySelector("a.is-active")));
    });
  };

  const updateActiveSection = () => {
    if (sectionTargets.length === 0) return;
    if (requestedSectionId) {
      setActiveSection(requestedSectionId);
      return;
    }
    const marker = window.scrollY + (siteHeader?.offsetHeight || 0) + 28;
    let currentSection = null;

    sectionTargets.forEach((section) => {
      if (section.offsetTop <= marker) currentSection = section;
    });

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      currentSection = sectionTargets[sectionTargets.length - 1];
    }

    setActiveSection(currentSection?.id || null);
  };

  let navigationFrame = null;
  const requestNavigationUpdate = () => {
    if (navigationFrame !== null) return;
    navigationFrame = window.requestAnimationFrame(() => {
      navigationFrame = null;
      updateActiveSection();
    });
  };

  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  document.addEventListener("scrollend", finalizeRequestedSection);
  window.addEventListener("resize", requestNavigationUpdate);
  window.addEventListener("hashchange", requestNavigationUpdate);
  updateActiveSection();

  const backToTopButton = document.querySelector("[data-back-to-top]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let searchHighlightTimer = null;

  const updateBackToTopButton = () => {
    if (!backToTopButton) return;
    const isVisible = window.scrollY > Math.max(420, window.innerHeight * 0.55);
    backToTopButton.classList.toggle("is-visible", isVisible);
    backToTopButton.setAttribute("aria-hidden", String(!isVisible));
    backToTopButton.tabIndex = isVisible ? 0 : -1;
  };

  backToTopButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  });

  window.addEventListener("scroll", updateBackToTopButton, { passive: true });
  window.addEventListener("resize", updateBackToTopButton);
  updateBackToTopButton();

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput?.value.trim().toLocaleLowerCase() || "";

    document.querySelector(".search-result-highlight")?.classList.remove("search-result-highlight");
    window.clearTimeout(searchHighlightTimer);

    if (!query) {
      if (searchStatus) searchStatus.textContent = "Enter a search term.";
      searchInput?.focus();
      return;
    }

    const searchTargets = Array.from(document.querySelectorAll(
      "main h1, main h2, main h3, main p, main li, main dt, main dd, main td, main th"
    ));
    const match = searchTargets.find((target) => (
      target.getClientRects().length > 0
      && target.textContent.replace(/\s+/g, " ").trim().toLocaleLowerCase().includes(query)
    ));

    if (!match) {
      searchInput?.setAttribute("aria-invalid", "true");
      if (searchStatus) searchStatus.textContent = `No results for “${searchInput.value.trim()}”.`;
      return;
    }

    searchInput?.removeAttribute("aria-invalid");
    if (searchStatus) searchStatus.textContent = `Showing the first result for “${searchInput.value.trim()}”.`;
    setMobileNavigation(false);
    closeNavGroups();
    match.classList.add("search-result-highlight");

    const headerOffset = (siteHeader?.offsetHeight || 0) + 24;
    const matchTop = match.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top: Math.max(0, matchTop),
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });

    searchHighlightTimer = window.setTimeout(() => {
      match.classList.remove("search-result-highlight");
    }, 2600);
  });

  searchInput?.addEventListener("input", () => {
    searchInput.removeAttribute("aria-invalid");
    if (searchStatus) searchStatus.textContent = "";
  });

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    if (!track || slides.length < 2) return;

    let currentIndex = 0;

    const render = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

      slides.forEach((slide, index) => {
        const isCurrent = index === currentIndex;
        slide.classList.toggle("is-active", isCurrent);
        slide.setAttribute("aria-hidden", String(!isCurrent));
      });

      dots.forEach((dot, index) => {
        const isCurrent = index === currentIndex;
        dot.classList.toggle("is-active", isCurrent);
        dot.tabIndex = isCurrent ? 0 : -1;
        if (isCurrent) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        render(index);
      });

      dot.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (currentIndex + direction + dots.length) % dots.length;
        render(nextIndex);
        dots[nextIndex].focus();
      });
    });

    previousButton?.addEventListener("click", () => render(currentIndex - 1));
    nextButton?.addEventListener("click", () => render(currentIndex + 1));

    render(0);
  });
})();
