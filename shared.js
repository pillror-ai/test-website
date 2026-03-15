// ═══════════════════════════════════════════════
//  FIREBASE CONFIG — replace with your own values
// ═══════════════════════════════════════════════
const firebaseConfig = {
  apiKey: "AIzaSyD0rrBsvf1fwyHXijzvx-72nPI-zd_zlOU",
  authDomain: "ipl-fantasy-d1d22.firebaseapp.com",
  projectId: "ipl-fantasy-d1d22",
  storageBucket: "ipl-fantasy-d1d22.firebasestorage.app",
  messagingSenderId: "452057425780",
  appId: "1:452057425780:web:15922897cb9483af506e21",
  measurementId: "G-PBGPWWLJHT",
};

// Initialize Firebase (called by each page)
function initFirebase() {
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore();
}

// ═══════════════════════════════════════════════
//  STARFIELD
// ═══════════════════════════════════════════════
function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const STAR_COUNT = 220;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    alpha: Math.random(),
    dAlpha: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    color:
      Math.random() < 0.15
        ? "#e8b4c8"
        : Math.random() < 0.2
          ? "#c4a8e8"
          : "#ffffff",
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.alpha += s.dAlpha;
      if (s.alpha > 1 || s.alpha < 0) s.dAlpha *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

// ═══════════════════════════════════════════════
//  FLOATING HEARTS
// ═══════════════════════════════════════════════
function initFloatingHearts() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;

  const symbols = ["♥", "✦", "✧", "❀", "♡"];

  function spawnHeart() {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const colors = ["#e8b4c8", "#c4a8e8", "#d4789a", "#9b6dca", "#f5e0ec"];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 14 + 8 + "px";
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    const dur = Math.random() * 18 + 12;
    el.style.animationDuration = dur + "s";
    el.style.animationDelay = Math.random() * 8 + "s";
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 9) * 1000);
  }

  // Initial batch
  for (let i = 0; i < 8; i++) spawnHeart();
  setInterval(spawnHeart, 2800);
}

// ═══════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

// ═══════════════════════════════════════════════
//  MARK ACTIVE NAV LINK
// ═══════════════════════════════════════════════
function markActiveNav() {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    if (
      link.href === window.location.href ||
      window.location.pathname.endsWith(link.getAttribute("href"))
    ) {
      link.classList.add("active");
    }
  });
}

// ═══════════════════════════════════════════════
//  SHARED INIT
// ═══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  initFloatingHearts();
  markActiveNav();
});
