import { fetchServices } from "./data.js";

// NAV - hamburger + wayfinding and accessible toggling
function initNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });

  // Wayfinding: highlight current link
  document.querySelectorAll(".main-nav a").forEach((a) => {
    if (
      a.href === location.href ||
      location.pathname.endsWith(a.getAttribute("href"))
    ) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}

// Render services on services.html
async function renderServices() {
  const container = document.getElementById("services-list");
  if (!container) return;

  try {
    const services = await fetchServices();
    localStorage.setItem("servver_services", JSON.stringify(services));

    // Use array methods to slice/sort/filter
    const ordered = services.slice().sort((a, b) => b.rating - a.rating);

    // show at least 15 items
    container.innerHTML = ordered.map((s) => serviceCardTemplate(s)).join("");
    attachCardHandlers();
  } catch (err) {
    container.innerHTML = `<p class="error">Unable to load services. Please try again later.</p>`;
  }
}

// template literal for a service card (≥4 properties displayed)
function serviceCardTemplate(s) {
  return `
  <article class="card" data-id="${s.id}" tabindex="0" aria-labelledby="svc-${
    s.id
  }-title">
    <img src="${s.image}" alt="${
    s.name
  } image" loading="lazy" width="320" height="180" />
    <h3 id="svc-${s.id}-title">${s.name}</h3>
    <p class="meta">${s.category} • ₦${s.price.toLocaleString()} • ${
    s.duration
  }</p>
    <p class="desc">${s.description}</p>
    <div class="card-actions">
      <button class="btn details" data-id="${s.id}">Details</button>
      <button class="btn fav" data-id="${
        s.id
      }" aria-pressed="false">♡ Save</button>
    </div>
  </article>`;
}

// attach handlers to detail and favorite buttons
function attachCardHandlers() {
  document.querySelectorAll(".card .details").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      openModalForId(Number(e.currentTarget.dataset.id))
    );
  });
  document.querySelectorAll(".card .fav").forEach((btn) => {
    btn.addEventListener("click", toggleFavorite);
    // restore aria-pressed state if favorite exists
    const id = btn.dataset.id;
    const favs = getFavorites();
    if (favs.includes(Number(id))) {
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "♥ Saved";
    }
  });
}

// Local Storage favorites
function getFavorites() {
  const raw = localStorage.getItem("servver_favorites");
  return raw ? JSON.parse(raw) : [];
}
function toggleFavorite(e) {
  const id = Number(e.currentTarget.dataset.id);
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
    e.currentTarget.setAttribute("aria-pressed", "true");
    e.currentTarget.textContent = "♥ Saved";
  } else {
    favs.splice(idx, 1);
    e.currentTarget.setAttribute("aria-pressed", "false");
    e.currentTarget.textContent = "♡ Save";
  }
  localStorage.setItem("servver_favorites", JSON.stringify(favs));
}

// Modal implementation (accessible)
function initModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.querySelector(".close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

function openModalForId(id) {
  // find service from localStorage first (fast), fallback to fetch
  const raw = localStorage.getItem("servver_services");
  const services = raw ? JSON.parse(raw) : null;

  let s = services ? services.find((x) => x.id === id) : null;
  if (s) {
    populateModal(s);
    return;
  }
  // fallback: fetch and open
  fetch("./data/services.json")
    .then((r) => r.json())
    .then((data) => {
      const item = data.find((x) => x.id === id);
      if (item) populateModal(item);
    })
    .catch((err) => console.error(err));
}

function populateModal(s) {
  const modal = document.getElementById("detail-modal");
  modal.querySelector(".modal-title").textContent = s.name;
  modal.querySelector(".modal-body").innerHTML = `
    <img src="${s.image}" alt="${
    s.name
  } image" loading="lazy" width="480" height="260">
    <p><strong>Category:</strong> ${s.category}</p>
    <p><strong>Price:</strong> ₦${s.price.toLocaleString()}</p>
    <p><strong>Estimated time:</strong> ${s.duration}</p>
    <p><strong>Rating:</strong> ${s.rating}</p>
    <p>${s.description}</p>
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  // move focus into modal for accessibility
  modal.querySelector(".close").focus();
}

function closeModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Form action — called on form submission (page navigates to form-action.html), so no code here required

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initModal();
  renderServices();
});
