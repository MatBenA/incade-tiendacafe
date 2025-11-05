const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");
const navLinks = nav.querySelectorAll("a");

function toggleMenu() {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
  overlay.classList.toggle("active");

  // Prevenir scroll cuando el menú está abierto
  if (nav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  hamburger.classList.remove("active");
  nav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Toggle menu al hacer clic en hamburguesa
hamburger.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic en overlay
overlay.addEventListener("click", closeMenu);

// Cerrar menú al hacer clic en un link
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Cerrar menú al presionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("active")) {
    closeMenu();
  }
});
