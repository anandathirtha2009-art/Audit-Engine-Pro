/* Audit Engine Pro — site interactions. No dependencies. */
(function(){
  "use strict";

  // ---- configurable contact (owner edits these two lines) ----
  var CONTACT_EMAIL = "anandathirtha2009@gmail.com";            // e.g. "hello@example.com" — leave "" to show placeholder
  var CONTACT_SUBJECT = "Audit Engine Pro — Inquiry";

  var emailEl = document.getElementById("contactEmail");
  if (CONTACT_EMAIL) {
    if (emailEl){ emailEl.textContent = CONTACT_EMAIL; }
    var mk = function(label){
      return "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(CONTACT_SUBJECT + " (" + label + ")");
    };
    var d = document.getElementById("demoBtn");   if (d) d.setAttribute("href", mk("Demo"));
    var l = document.getElementById("licenseBtn");if (l) l.setAttribute("href", mk("Licensing"));
  }

  // ---- mobile nav ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("navlinks");
  if (toggle && links){
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ links.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); });
    });
  }

  // ---- lightbox ----
  var lb = document.getElementById("lightbox");
  var lbImg = lb ? lb.querySelector("img") : null;
  document.querySelectorAll(".shot[data-full]").forEach(function(fig){
    fig.addEventListener("click", function(){
      if(!lb) return;
      lbImg.src = fig.getAttribute("data-full");
      lbImg.alt = (fig.querySelector("img")||{}).alt || "";
      lb.classList.add("open"); lb.setAttribute("aria-hidden","false");
    });
  });
  if (lb){
    lb.addEventListener("click", function(){ lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); lbImg.src=""; });
    document.addEventListener("keydown", function(e){ if(e.key==="Escape" && lb.classList.contains("open")){ lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); lbImg.src=""; } });
  }

  // ---- scroll reveal ----
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)){
    reveals.forEach(function(r){ r.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {rootMargin:"0px 0px -8% 0px", threshold:0.06});
    reveals.forEach(function(r){ io.observe(r); });
  }
})();
