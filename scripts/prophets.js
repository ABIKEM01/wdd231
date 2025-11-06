const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets); // temporary testing of data response
  displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement("section");
    let fullName = document.createElement("h2");
    let portrait = document.createElement("img");
    let dob = document.createElement("p");
    let placeOfBirth = document.createElement("p");

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    dob.textContent = `${prophet.birthdate}`;
    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // Append the section(card) with the created elements
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
};
