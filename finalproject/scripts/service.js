import { fetchServices } from "./data.js";
const select = document.getElementById("filter");
const container = document.getElementById("services-list");

async function loadAndRender(filter = "all") {
  try {
    const data = await fetchServices();
    let list = data;
    if (filter !== "all") {
      list = data.filter(
        (s) => s.category.toLowerCase() === filter.toLowerCase()
      );
    }

    localStorage.setItem("servver_services", JSON.stringify(data));
    container.innerHTML = list
      .map((s) => {
        return `
            <article class="card" data-id="${
              s.id
            }" tabindex="0" aria-labelledby="svc-${s.id}-title">
              <img src="images/${
                s.image ? s.image.split("/").pop() : "placeholder.jpg"
              }" alt="${s.name} image" loading="lazy" />
              <h3 id="svc-${s.id}-title">${s.name}</h3>
              <p class="meta">${s.category} • ₦${s.price.toLocaleString()} • ${
          s.duration
        }</p>
              <p class="desc">${s.description}</p>
              <div class="card-actions">
                <button class="btn details" data-id="${s.id}">Details</button>
                <button class="btn ghost fav" data-id="${
                  s.id
                }" aria-pressed="false">♡ Save</button>
              </div>
            </article>`;
      })
      .join("");
    // attach events after rendering (reuse handlers from main.js)
    document.querySelectorAll(".card .details").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.currentTarget.dataset.id);
        // trigger main.js modal open using global function (populated in main.js)
        window.dispatchEvent(
          new CustomEvent("open-service-modal", { detail: { id } })
        );
      });
    });
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load services.</p>';
  }
}

select.addEventListener("change", (e) => loadAndRender(e.target.value));
// initial load
loadAndRender();
