const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");

navbutton.addEventListener("click", () => {
  navbutton.classList.toggle("show");
  navlinks.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;
const courses = [
  {
    code: "CSE 110",
    name: "Intro to Programming",
    credits: 2,
    category: "CSE",
    completed: true,
  },
  {
    code: "WDD 130",
    name: "Web Fundamentals",
    credits: 2,
    category: "WDD",
    completed: true,
  },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 2,
    category: "WDD",
    completed: false,
  },
  {
    code: "WDD 231",
    name: "Frontend Web Development I",
    credits: 3,
    category: "WDD",
    completed: false,
  },
];

const container = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(courseList) {
  container.innerHTML = "";
  let total = 0;

  courseList.forEach((course) => {
    const div = document.createElement("div");
    div.className = course.completed ? "course completed" : "course";
    div.textContent = `${course.code} - ${course.name}`;
    container.appendChild(div);
    total += course.credits;
  });

  totalCredits.textContent = `Total credits for these courses: ${total}`;
}

document
  .getElementById("allBtn")
  .addEventListener("click", () => displayCourses(courses));
document
  .getElementById("cseBtn")
  .addEventListener("click", () =>
    displayCourses(courses.filter((c) => c.category === "CSE"))
  );
document
  .getElementById("wddBtn")
  .addEventListener("click", () =>
    displayCourses(courses.filter((c) => c.category === "WDD"))
  );

// default display
displayCourses(courses);
