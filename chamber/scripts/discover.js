import { places } from "../data/discover.mjs";

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// BUILD CARDS
const grid = document.querySelector(".discover-grid");

places.forEach((place, index) => {
  const card = document.createElement("section");
  card.classList.add("discover-card");
  card.style.gridArea = `item${index + 1}`;

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-btn">Learn More</button>
  `;

  grid.appendChild(card);
});

/* ===== LAST VISIT MESSAGE ===== */
const visitMsg = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    visitMsg.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitMsg.textContent = "You last visited 1 day ago.";
  } else {
    visitMsg.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
