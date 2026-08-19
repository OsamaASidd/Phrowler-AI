(function () {
  "use strict";

  // Nav scroll state
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  navToggle.addEventListener("click", function () {
    navMobile.classList.toggle("open");
  });
  navMobile.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { navMobile.classList.remove("open"); });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // Animated stat counters
  var statEls = document.querySelectorAll(".stat-number");
  var statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  statEls.forEach(function (el) { statObserver.observe(el); });

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(eased * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Token usage bar
  var tokenBar = document.getElementById("tokenBar");
  var tokenPercent = document.getElementById("tokenPercent");
  if (tokenBar) {
    var tokenObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var target = parseInt(tokenBar.getAttribute("data-target"), 10) || 0;
          tokenBar.style.width = target + "%";
          tokenPercent.textContent = target + "%";
          tokenObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    tokenObserver.observe(tokenBar);
  }
})();
