// Read URLSearchParams and show values with validation checks
const params = new URLSearchParams(location.search);
const requiredFields = ["fullname", "email", "service"];
const result = document.getElementById("result");
const missing = requiredFields.filter((f) => !params.get(f));

if (missing.length) {
  result.innerHTML =
    '<p class="error">Required fields missing: ' + missing.join(", ") + "</p>";
} else {
  result.innerHTML = `
        <p><strong>Full name:</strong> ${params.get("fullname")}</p>
        <p><strong>Email:</strong> ${params.get("email")}</p>
        <p><strong>Service:</strong> ${params.get("service")}</p>
        <p><strong>Message:</strong> ${
          params.get("message") || "(no message provided)"
        }</p>
        <p>Thank you! We will contact you soon about your request.</p>
      `;
}
