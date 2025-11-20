document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const summary = document.getElementById("submission-summary");
  if (!summary) return;

  const params = new URLSearchParams(window.location.search);

  const firstName = params.get("firstName") || "";
  const lastName = params.get("lastName") || "";
  const email = params.get("email") || "";
  const phone = params.get("phone") || "";
  const organization = params.get("organization") || "";
  const timestamp = params.get("timestamp") || "";

  let timestampText = "";
  if (timestamp) {
    try {
      const d = new Date(timestamp);
      timestampText = d.toLocaleString();
    } catch (err) {
      timestampText = timestamp;
    }
  }

  summary.innerHTML = `
    <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
    <p><strong>Last name:</strong> ${escapeHtml(lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Business / Organization:</strong> ${escapeHtml(organization)}</p>
    <p><strong>Form loaded timestamp:</strong> ${escapeHtml(timestampText)}</p>
  `;

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }
});
