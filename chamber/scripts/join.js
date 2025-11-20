document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const ts = new Date();
  const tsInput = document.getElementById("timestamp");
  if (tsInput) tsInput.value = ts.toISOString();

  const openButtons = document.querySelectorAll(".view-btn");
  const closeButtons = document.querySelectorAll(".close-btn");
  const backdrops = document.querySelectorAll(".modal-backdrop");

  let lastFocused = null;

  function openModal(id, triggerButton) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = triggerButton || document.activeElement;
    modal.setAttribute("aria-hidden", "false");

    const closeBtn = modal.querySelector(".close-btn");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", handleKeydown);
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    document.removeEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      document
        .querySelectorAll('.modal-backdrop[aria-hidden="false"]')
        .forEach((m) => {
          m.setAttribute("aria-hidden", "true");
        });
      document.removeEventListener("keydown", handleKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-modal");
      openModal(id, btn);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-close");

      if (id) closeModal(id);
      else {
        const backdrop = btn.closest(".modal-backdrop");
        if (backdrop) closeModal(backdrop.id);
      }
    });
  });

  backdrops.forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });
});
