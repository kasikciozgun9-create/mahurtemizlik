/* =========================================================
   MAHUR TEMİZLİK — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      var isOpen = mainNav.classList.contains("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Nav dropdown (Bölgeler) ---------- */
  document.querySelectorAll(".dropdown-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var parent = btn.closest(".has-dropdown");
      var isOpen = parent.classList.contains("open");
      document.querySelectorAll(".has-dropdown.open").forEach(function (el) {
        if (el !== parent) {
          el.classList.remove("open");
          el.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
        }
      });
      parent.classList.toggle("open", !isOpen);
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll(".has-dropdown.open").forEach(function (el) {
      el.classList.remove("open");
      el.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Header shrink / shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
  }
  document.addEventListener("scroll", onScroll);
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Active nav link based on current page ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Contact form (client-side only for now) ---------- */
  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var statusBox = contactForm.querySelector(".form-status");
      var requiredFields = contactForm.querySelectorAll("[required]");
      var allFilled = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) allFilled = false;
      });

      if (!statusBox) return;

      if (!allFilled) {
        statusBox.textContent = "Lütfen zorunlu alanları eksiksiz doldurun.";
        statusBox.className = "form-status show error";
        return;
      }

      /*
        NOT: Bu form şu an herhangi bir sunucuya bağlı değildir.
        Formu gerçekten e-posta olarak iletmek için bir form
        servisi (ör. Formspree, Web3Forms) ya da kendi backend
        uç noktanız buraya bağlanmalıdır.
      */
      statusBox.textContent = "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.";
      statusBox.className = "form-status show success";
      contactForm.reset();
    });
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll(".current-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
