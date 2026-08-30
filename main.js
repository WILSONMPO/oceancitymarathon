const EVENT = new Date("2026-11-14T06:00:00+03:00");

const nums = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = Date.now();
  let diff = EVENT.getTime() - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  nums.days.textContent = pad(days);
  nums.hours.textContent = pad(hours);
  nums.minutes.textContent = pad(minutes);
  nums.seconds.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

const nav = document.querySelector(".nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("solid", window.scrollY > 40);
  },
  { passive: true }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

const layers = [...document.querySelectorAll("[data-parallax]")];
let ticking = false;

function parallax() {
  const vh = window.innerHeight;
  layers.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.12;
    const rect = el.getBoundingClientRect();
    const offset = (rect.top - vh * 0.45) * speed;
    el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
  });
  ticking = false;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(parallax);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", onScroll, { passive: true });
  parallax();
}
