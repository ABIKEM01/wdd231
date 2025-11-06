const container = document.getElementById("directory-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership Level: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  container.classList.remove("list");
  container.classList.add("grid");
  document
    .querySelectorAll(".card img")
    .forEach((img) => (img.style.display = "block"));
});

listBtn.addEventListener("click", () => {
  container.classList.remove("grid");
  container.classList.add("list");
  document
    .querySelectorAll(".card img")
    .forEach((img) => (img.style.display = "none"));
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

getMembers();
