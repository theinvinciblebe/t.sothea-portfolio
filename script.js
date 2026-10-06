// ==========================================================================
// TAILWIND-STYLE THEME SWITCHER (SYSTEM, LIGHT, DARK)
// ==========================================================================
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (themeSetting) => {
  let resolvedTheme = themeSetting;
  
  if (themeSetting === "system" || !themeSetting) {
    resolvedTheme = mediaQuery.matches ? "dark" : "light";
  }

  document.documentElement.setAttribute("data-theme", resolvedTheme);

  // Update active pill button state
  document.querySelectorAll(".theme-pill-btn").forEach((btn) => {
    const val = btn.getAttribute("data-theme-val");
    if (val === themeSetting) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

const setTheme = (setting) => {
  localStorage.setItem("theme-preference", setting);
  applyTheme(setting);
};

// Listen for system theme changes if set to system
mediaQuery.addEventListener("change", (e) => {
  const currentPref = localStorage.getItem("theme-preference") || "system";
  if (currentPref === "system") {
    applyTheme("system");
  }
});

// Bind event listeners to all theme pill buttons
document.addEventListener("DOMContentLoaded", () => {
  const currentPref = localStorage.getItem("theme-preference") || "system";
  applyTheme(currentPref);

  document.querySelectorAll(".theme-pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-theme-val");
      setTheme(selected);
    });
  });
});

// Initial run
const initialPref = localStorage.getItem("theme-preference") || "system";
applyTheme(initialPref);

// Mobile menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close mobile menu when clicking outside or on a link
document.addEventListener("click", (e) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && menu.classList.contains("open")) {
    if (!menu.contains(e.target) && !icon.contains(e.target)) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    }
  }
});

// Scroll Progress & Navbar shadow & Scroll to top/down buttons
window.addEventListener("scroll", () => {
  const scrollUp = document.getElementById("scrollUp");
  const scrollDown = document.getElementById("scrollDown");
  const nav = document.querySelector("nav");
  const progressBar = document.getElementById("scroll-progress");

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Update progress bar width
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }

  // Navbar glass blur background on scroll
  if (scrollTop > 50) {
    nav?.classList.add("scrolled");
  } else {
    nav?.classList.remove("scrolled");
  }

  // Scroll Up button visibility
  if (scrollTop > 300) {
    if (scrollUp) scrollUp.style.display = "flex";
  } else {
    if (scrollUp) scrollUp.style.display = "none";
  }

  // Scroll Down button hide near bottom
  if (scrollPercent > 92) {
    if (scrollDown) scrollDown.style.display = "none";
  } else {
    if (scrollDown) scrollDown.style.display = "flex";
  }

  // Active navigation highlight
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Scroll to Top
document.getElementById("scrollUp")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll to Bottom
document.getElementById("scrollDown")?.addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});

// Initialize Swiper with Enhanced Touch & Coverflow Style
const swiper = new Swiper(".projectSwiper", {
  loop: true,
  spaceBetween: 30,
  speed: 800,
  grabCursor: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

// Typewriter Animation for Hero Section Subtitle
const roles = [
  "Full Stack Web Developer",
  "Laravel & PHP Specialist",
  "React & JavaScript Enthusiast",
  "UI/UX Minded Creator"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");

function typeRole() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end of text
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next word
  }

  setTimeout(typeRole, typeSpeed);
}

// Interactive Scroll Reveal (Intersection Observer)
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    "section, .details-container, .text-container, .contact-info-card, .swiper-slide, .experience-sub-title"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ==========================================================================
// INTERACTIVE MOUSE SUITE (CUSTOM CURSOR, CARD SPOTLIGHT, 3D TILT, RIPPLES)
// ==========================================================================
function initMouseInteractions() {
  // Check if pointer is coarse (touch device)
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return;
  }

  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");
  const cursorGlow = document.getElementById("cursorGlowFollower");

  if (!cursorDot || !cursorOutline) return;

  let mouseX = -100;
  let mouseY = -100;
  let outlineX = -100;
  let outlineY = -100;
  let glowX = -100;
  let glowY = -100;
  let isCursorVisible = false;

  // Track mouse coordinates
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isCursorVisible) {
      isCursorVisible = true;
      cursorDot.classList.remove("cursor-hidden");
      cursorOutline.classList.remove("cursor-hidden");
      if (cursorGlow) cursorGlow.style.opacity = "1";
    }

    // Direct update for the fast precision dot
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Hide cursor on mouse leave
  document.addEventListener("mouseleave", () => {
    isCursorVisible = false;
    cursorDot.classList.add("cursor-hidden");
    cursorOutline.classList.add("cursor-hidden");
    if (cursorGlow) cursorGlow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    isCursorVisible = true;
    cursorDot.classList.remove("cursor-hidden");
    cursorOutline.classList.remove("cursor-hidden");
    if (cursorGlow) cursorGlow.style.opacity = "1";
  });

  // Smooth lerp loop for the outline ring and glow
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover state handlers for interactive elements
  const interactiveSelectors = [
    "a",
    "button",
    ".btn",
    ".nav-link",
    ".theme-pill-btn",
    ".social-icon-btn",
    ".scroll-btn",
    ".details-container",
    ".contact-info-card",
    ".swiper-button-next",
    ".swiper-button-prev",
    ".swiper-pagination-bullet",
    ".mouse-scroll-indicator",
    ".hamburger-icon",
    "input",
    "textarea"
  ].join(",");

  function attachHoverListeners() {
    const interactives = document.querySelectorAll(interactiveSelectors);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.classList.add("cursor-hover");
        cursorDot.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-hover");
        cursorDot.classList.remove("cursor-hover");
      });
    });
  }
  attachHoverListeners();

  // Click active states
  window.addEventListener("mousedown", () => {
    cursorOutline.classList.add("cursor-active");
    cursorDot.classList.add("cursor-active");
  });

  window.addEventListener("mouseup", () => {
    cursorOutline.classList.remove("cursor-active");
    cursorDot.classList.remove("cursor-active");
  });

  // Click Ripple Effect
  window.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "mouse-click-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });

  // Card Dynamic Spotlight & 3D Tilt Effect
  const cards = document.querySelectorAll(".details-container, .contact-info-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.setProperty("--mouse-x", `-500px`);
      card.style.setProperty("--mouse-y", `-500px`);
    });
  });

  // Magnetic Pull Effect on Social Icons & Floating Buttons
  const magneticElements = document.querySelectorAll(".social-icon-btn, .scroll-btn, .theme-pill-btn");
  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.1)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

// Run animations once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  typeRole();
  initScrollReveal();
  initMouseInteractions();
});
