/* ==========================================================
   EmpyreTek — main.js
   ========================================================== */

/* ── THEME TOGGLE ─────────────────────────────────────────── */
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// Apply saved theme on load
const savedTheme = localStorage.getItem("et-theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("et-theme", next);
});

/* ── CUSTOM CURSOR ────────────────────────────────────────── */
const cur = document.getElementById("cur");
const curRing = document.getElementById("curRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});

(function lerp() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curRing.style.left = rx + "px";
  curRing.style.top = ry + "px";
  requestAnimationFrame(lerp);
})();

document
  .querySelectorAll("a, button, .a-card, .s-card, .gal-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.transform = "translate(-50%,-50%) scale(2)";
      curRing.style.transform = "translate(-50%,-50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.transform = "translate(-50%,-50%) scale(1)";
      curRing.style.transform = "translate(-50%,-50%) scale(1)";
    });
  });

/* ── HAMBURGER + SIDE DRAWER ──────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const sideDrawer = document.getElementById("sideDrawer");
const drawerClose = document.getElementById("drawerClose");
const drawerBackdrop = document.getElementById("drawerBackdrop");

function openDrawer() {
  sideDrawer.classList.add("is-open");
  drawerBackdrop.classList.add("show");
  hamburger.classList.add("is-open");
  hamburger.setAttribute("aria-expanded", "true");
  sideDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeDrawer() {
  sideDrawer.classList.remove("is-open");
  drawerBackdrop.classList.remove("show");
  hamburger.classList.remove("is-open");
  hamburger.setAttribute("aria-expanded", "false");
  sideDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  sideDrawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
});

drawerClose.addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);

// Close drawer when any link inside it is clicked
sideDrawer
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeDrawer));

// Close drawer on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

/* ── NAV SCROLL SHADOW ────────────────────────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 80);
});

/* ── FLOATING PARTICLES ───────────────────────────────────── */
(function spawnParticles() {
  const bg = document.getElementById("bgCanvas");
  const colors = ["#00f0ff", "#bf00ff", "#ff006e"];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() < 0.5 ? 2 : 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${color}`,
      `animation-duration:${Math.random() * 12 + 10}s`,
      `animation-delay:${Math.random() * 8}s`,
    ].join(";");
    bg.appendChild(p);
  }
})();

/* ── SCROLL REVEAL ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = (target / duration) * 16;
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".counter")
  .forEach((el) => counterObserver.observe(el));

/* ── CODE RAIN (About section bg) ────────────────────────── */
(function buildCodeRain() {
  const container = document.getElementById("codeRain");
  if (!container) return;
  const snippets = [
    "const empire = build()",
    "import { React }",
    "function launch() {",
    ".style { color:#00f0ff }",
    "npm run deploy",
    "git push origin main",
    "async/await success",
    "return dominate();",
    "border-radius:20px",
    "flex-direction:col",
    "> innovation.exe",
    "webpack --build",
    "port:3000 ✓",
  ];
  for (let i = 0; i < 8; i++) {
    const col = document.createElement("div");
    col.style.cssText = [
      "flex:0 0 auto",
      "writing-mode:vertical-rl",
      `animation:p-rise ${12 + Math.random() * 10}s ${Math.random() * 6}s linear infinite`,
      "opacity:0",
    ].join(";");
    const lines = [];
    for (let j = 0; j < 6; j++)
      lines.push(snippets[Math.floor(Math.random() * snippets.length)]);
    col.textContent = lines.join("\n\n");
    container.appendChild(col);
  }
})();

/* ── EMAILJS CONTACT FORM ─────────────────────────────────── */
(function () {
  emailjs.init("g64K8ESSaAtIO5e44");
})();

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const btn = e.target.querySelector('button[type="submit"]');

  btn.textContent = "Sending…";
  btn.disabled = true;

  emailjs
    .send("service_b7euula", "template_4jniva6", {
      from_name: fd.get("name"),
      from_email: fd.get("email"),
      company: fd.get("company") || "Not specified",
      message: fd.get("message"),
      time: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      current_year: new Date().getFullYear(),
      to_email: "agboolagbolahan14@gmail.com",
    })
    .then(() => {
      alert("Empire launched! 🚀 We'll be in touch within 24 hours.");
      e.target.reset();
    })
    .catch((err) => {
      alert(
        "Something went wrong. Please email us directly at agboolagbolahan14@gmail.com",
      );
      console.error("EmailJS error:", err);
    })
    .finally(() => {
      btn.textContent = "🚀 Launch Your Empire";
      btn.disabled = false;
    });
});
