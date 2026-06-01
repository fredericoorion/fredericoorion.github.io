/* ==============================
   script.js — Frederico Orion Portfolio
   Functions:
     initNav()              — scroll blur, hamburger, active link tracking
     initTypewriter()       — cycling typewriter effect
     initScrollAnimations() — IntersectionObserver fade-in + stagger
     initContactForm()      — client-side validation + success state
   ============================== */

/* ==============================
   PROJECTS DATA
   To add a project: copy one object and fill in the fields.
   badge options: "In Progress" | "Case Study" | "Live"
   badgeClass options: "badge-in-progress" | "badge-case-study" | "badge-live"
   ============================== */
var PROJECTS = [
  {
    title: "SA Road Safety Analysis",
    badge: "Data Analysis",
    badgeClass: "badge-case-study",
    image: "assets/sa-road-data.jpg",
    imageAlt: "SA road safety dashboard screenshot",
    description:
      "A public dashboard analysing five years of SA Government road crash data. Built with React and Recharts, it maps crash patterns across time, location, and conditions — and links every finding to a specific recommendation.",
    tags: ["React", "Recharts", "Data Analysis", "Python"],

    link: "https://sa-road-data.vercel.app/",
    linkLabel: "View Site →",
  },
  {
    title: "Student Email Engagement Analysis",
    badge: "Case Study",
    badgeClass: "badge-case-study",
    image: "assets/preview-email.jpg",
    imageAlt: "Student Email Engagement Analysis screenshot",
    description:
      "During my internship at Kaplan Business School, I helped the communications team understand why some students weren't engaging with their emails. I built a Power BI dashboard using DAX across 192 students that made the answer clear. High achievers were clicking three times more than at-risk students, and the team finally had data they could act on.",
    tags: ["Python", "Power BI", "Data Analysis"],
    link: "https://drive.google.com/file/d/1uHXTQBNQZl7uFmBQIGbvP7iYDbg4I2Xp/view?usp=sharing",
    linkLabel: "View Slide →",
  },
  {
    title: "Login & Register App",
    badge: "Live",
    badgeClass: "badge-live",
    image: "assets/login-page.jpg",
    imgStyle: "object-position: contain",
    imageAlt: "Login & Register App screenshot",
    description:
      "A simple authentication UI built with React. Users can create an account and log in, with client-side validation and localStorage persistence.",
    tags: ["React", "React Hook Form", "Tailwind CSS"],
    link: "https://login-screen-ruddy.vercel.app/",
    linkLabel: "View Site →",
  },
  // {
  //   title: "Portfolio Website",
  //   badge: "Live",
  //   badgeClass: "badge-live",
  //   image: "assets/preview-portfolio.jpg",
  //   imageAlt: "Portfolio Website screenshot",
  //   description:
  //     "Personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript.",
  //   tags: ["HTML", "CSS", "JavaScript"],
  //   link: "#",
  //   linkLabel: "View Site →",
  // },
  {
    title: "Café Management REST API",
    badge: "Back-end",
    badgeClass: "badge-in-progress",
    image: "assets/preview-cafe-api.jpg",
    imageAlt: "Café Management REST API screenshot",
    description:
      "Built to solve a real operational problem: managing a café's menu, orders, and staff access through a clean backend system. Designed with security and maintainability in mind, because software that works in the real world needs both.",
    tags: ["FastAPI", "PostgreSQL", "Docker", "JWT Auth"],
    link: "https://github.com/fredericoorion",
    linkLabel: "GitHub →",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  initProjects();
  initNav();
  initTypewriter();
  initScrollAnimations();
  initContactForm();
});

/* ==============================
   initProjects
   - Reads PROJECTS array and renders one card per entry into #projects-grid
   ============================== */
function initProjects() {
  var grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(function (p, index) {
    var tags = p.tags
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");

    var isFeatured = index === 0;
    var cardClass =
      "project-card" +
      (isFeatured ? " featured" : "") +
      " section-animate-child";

    var imageBlock =
      '<a href="' +
      p.link +
      '" class="card-preview" target="_blank" rel="noopener noreferrer" aria-label="Open ' +
      p.title +
      '">' +
      '<img src="' +
      p.image +
      '" alt="' +
      p.imageAlt +
      '" class="card-img" style="' +
      (p.imgStyle || "") +
      '" />' +
      '<div class="card-preview-overlay" aria-hidden="true"></div>' +
      "</a>";

    var contentBlock =
      '<div class="card-header">' +
      '<span class="card-badge ' +
      p.badgeClass +
      '">' +
      p.badge +
      "</span>" +
      "</div>" +
      '<h3 class="card-title">' +
      p.title +
      "</h3>" +
      '<p class="card-description">' +
      p.description +
      "</p>" +
      '<div class="card-tags">' +
      tags +
      "</div>" +
      '<a href="' +
      p.link +
      '" class="btn btn-sm" target="_blank" rel="noopener noreferrer">' +
      p.linkLabel +
      "</a>";

    return (
      '<article class="' +
      cardClass +
      '">' +
      imageBlock +
      (isFeatured
        ? '<div class="card-body">' + contentBlock + "</div>"
        : contentBlock) +
      "</article>"
    );
  }).join("");
}

/* ==============================
   initNav
   - Adds .scrolled class to #nav after 20px scroll (triggers blur)
   - Toggles mobile hamburger menu open/close
   - Tracks active section via IntersectionObserver and highlights nav link
   ============================== */
function initNav() {
  var nav = document.getElementById("nav");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var links = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll("section[id]");

  /* ── Scroll blur ── */
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true },
  );

  /* ── Hamburger toggle ── */
  toggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* Close mobile menu when any nav link is clicked */
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ── Active link tracking ──
     rootMargin: top 40% dead zone + bottom 55% dead zone means a section
     must cross the middle band of the viewport to trigger "active". */
  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          links.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

/* ==============================
   initTypewriter
   - Types each word in `words` letter by letter
   - Pauses 1.5 s when word is complete, then deletes
   - Moves to the next word and loops indefinitely
   ============================== */
function initTypewriter() {
  var words = [
    "Tech Professional",
    "Data Analysis",
    "Problem Solver",
    "IT Undergraduate",
  ];
  var el = document.getElementById("typewriter");
  if (!el) return;

  /* Respect OS-level reduced motion preference — skip animation */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = words[0];
    return;
  }

  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function tick() {
    var current = words[wordIndex];

    /* Update displayed text */
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    el.textContent = current.substring(0, charIndex);

    /* Determine next delay */
    var delay = isDeleting ? 55 : 100;

    if (!isDeleting && charIndex === current.length) {
      /* Word fully typed — pause before deleting */
      delay = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      /* Word fully deleted — move to next word */
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350; /* brief pause before typing the next word */
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ==============================
   initScrollAnimations
   - Sets --delay CSS custom property on child items for stagger effect
   - Uses IntersectionObserver to add .visible class when elements enter view
   - Observes .section-animate elements; also triggers their .section-animate-child descendants
   ============================== */
function initScrollAnimations() {
  /* If user prefers reduced motion, reveal everything immediately */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document
      .querySelectorAll(".section-animate, .section-animate-child")
      .forEach(function (el) {
        el.classList.add("visible");
      });
    return;
  }

  /* Assign stagger delays to child items inside grids */
  var grids = document.querySelectorAll(".projects-grid, .tools-grid");
  grids.forEach(function (grid) {
    var children = grid.querySelectorAll(".section-animate-child");
    children.forEach(function (child, index) {
      child.style.setProperty("--delay", index * 80 + "ms");
    });
  });

  /* Observer: fire when 10% of the element is visible */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        /* Reveal the section itself */
        entry.target.classList.add("visible");

        /* Reveal its staggered children */
        var children = entry.target.querySelectorAll(".section-animate-child");
        children.forEach(function (child) {
          child.classList.add("visible");
        });

        /* Stop observing once revealed — animation is one-time */
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  /* Observe all animated sections */
  document.querySelectorAll(".section-animate").forEach(function (el) {
    observer.observe(el);
  });
}

/* ==============================
   initContactForm
   - Validates: name (≥2 chars), email (regex), message (≥10 chars)
   - Shows inline error messages beneath each field on failed submit
   - On success: hides form, shows #form-success thank-you block
   ============================== */
function initContactForm() {
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  if (!form || !success) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    /* Grab inputs */
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    /* Grab error spans */
    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var messageError = document.getElementById("message-error");

    /* Reset previous errors */
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);

    var isValid = true;

    /* Validate name — required, ≥ 2 characters */
    if (nameInput.value.trim().length < 2) {
      showError(
        nameInput,
        nameError,
        "Please enter your name (at least 2 characters).",
      );
      isValid = false;
    }

    /* Validate email — required, must match email pattern */
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    }

    /* Validate message — required, ≥ 10 characters */
    if (messageInput.value.trim().length < 10) {
      showError(
        messageInput,
        messageError,
        "Your message must be at least 10 characters.",
      );
      isValid = false;
    }

    /* All good — submit to Formspree via fetch, then show thank-you */
    if (isValid) {
      var data = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            var contactInfo = document.querySelector(".contact-info");
            if (contactInfo) contactInfo.hidden = true;
            form.hidden = true;
            success.hidden = false;
          } else {
            alert(
              "Something went wrong. Please try again or reach out on LinkedIn.",
            );
          }
        })
        .catch(function () {
          alert("Network error. Please check your connection and try again.");
        });
    }
  });

  /* ── Helpers ── */

  function showError(input, errorEl, message) {
    input.classList.add("error");
    errorEl.textContent = message;
  }

  function clearError(input, errorEl) {
    input.classList.remove("error");
    errorEl.textContent = "";
  }
}
