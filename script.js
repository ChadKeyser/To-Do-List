// DOM elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskCategory = document.getElementById("taskCategory");
const taskContainer = document.getElementById("taskContainer");

const bottomNav = document.getElementById("bottomNav");
const markCompleteBtn = document.getElementById("markCompleteBtn");
const markIncompleteBtn = document.getElementById("markIncompleteBtn");
const deleteBtn = document.getElementById("deleteBtn");

const addCategoryBtn = document.getElementById("addCategoryBtn");
const removeCategoryBtn = document.getElementById("removeCategoryBtn");
const categoryModal = document.getElementById("categoryModal");
const saveCategoryBtn = document.getElementById("saveCategoryBtn");
const closeCategoryModalBtn = document.getElementById("closeCategoryModalBtn");
const categoryName = document.getElementById("categoryName");

// Initial categories
let categories = ["General"];

// Populate category select dropdown
function populateCategoryDropdown() {
  taskCategory.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");
}

// Add a new task
addTaskBtn.addEventListener("click", () => {
  taskTitle.value = "";
  taskDesc.value = "";
  populateCategoryDropdown();
  taskModal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden");
});

// Save task
saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const category = taskCategory.value;

  if (!title || !category) return;

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
  card.dataset.category = category;

  card.addEventListener("click", function (e) {
    e.stopPropagation();

    // Deselect all other cards
    document.querySelectorAll(".card.selected").forEach(c => {
      if (c !== card) c.classList.remove("selected");
    });

    // Toggle selection of the clicked card
    card.classList.toggle("selected");

    // Show/hide bottom nav based on selection
    const selected = document.querySelectorAll(".card.selected").length > 0;
    bottomNav.classList.toggle("hidden", !selected);
  });

  let section = document.querySelector(
    `.category-section[data-category="${category}"]`
  );

  if (!section) {
    section = document.createElement("div");
    section.className = "category-section";
    section.dataset.category = category;
    section.innerHTML = `<div class="category-title">${category}</div>`;
    taskContainer.appendChild(section);
  }

  section.appendChild(card);
  taskModal.classList.add("hidden");
});

// Complete selected
markCompleteBtn.addEventListener("click", () => {
  document.querySelectorAll(".card.selected").forEach(card => {
    card.classList.remove("selected");
    card.classList.add("completed");
  });
  bottomNav.classList.add("hidden");
});

// Undo complete
markIncompleteBtn.addEventListener("click", () => {
  document.querySelectorAll(".card.selected").forEach(card => {
    card.classList.remove("selected");
    card.classList.remove("completed");
  });
  bottomNav.classList.add("hidden");
});

// Delete selected
deleteBtn.addEventListener("click", () => {
  document.querySelectorAll(".card.selected").forEach(card => {
    const section = card.parentElement;
    card.remove();
    if (
      section.classList.contains("category-section") &&
      section.querySelectorAll(".card").length === 0
    ) {
      section.remove();
    }
  });
  bottomNav.classList.add("hidden");
});

// Add category
addCategoryBtn.addEventListener("click", () => {
  categoryName.value = "";
  categoryModal.classList.remove("hidden");
});

// Close category modal
closeCategoryModalBtn.addEventListener("click", () => {
  categoryModal.classList.add("hidden");
});

// Save category
saveCategoryBtn.addEventListener("click", () => {
  const name = categoryName.value.trim();
  if (!name || categories.includes(name)) return;
  categories.push(name);
  categoryModal.classList.add("hidden");
});

// Remove category
removeCategoryBtn.addEventListener("click", () => {
  const toRemove = prompt("Enter the name of the category to remove:");
  if (!toRemove || !categories.includes(toRemove)) return;

  categories = categories.filter(cat => cat !== toRemove);

  document
    .querySelectorAll(`.category-section[data-category="${toRemove}"]`)
    .forEach(section => section.remove());

  document.querySelectorAll(`.card[data-category="${toRemove}"]`).forEach(card =>
    card.remove()
  );
});

// Deselect on outside click
document.addEventListener("click", function (event) {
  const isCard = event.target.closest(".card");
  const isBottomNav = event.target.closest(".bottom-nav");
  const isModal = event.target.closest(".modal");
  const isButton = event.target.tagName === "BUTTON";

  if (isCard || isBottomNav || isModal || isButton) return;

  document.querySelectorAll(".card.selected").forEach(card => {
    card.classList.remove("selected");
  });

  bottomNav.classList.add("hidden");
});

// Initial population of dropdown with "General"
populateCategoryDropdown();
