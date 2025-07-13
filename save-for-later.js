const savedContainer = document.getElementById("savedContainer");
//changed variable name to "savedRecipes"
let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

function renderSavedItems() {
  savedContainer.innerHTML = "";
  savedRecipes;

  if (savedRecipes.length === 0) {
    savedContainer.innerHTML = "<p>You haven't saved any recipes yet.</p>";
    return;
  }

  savedRecipes.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <i class="fa-solid fa-trash remove-btn" title="Remove"></i>
        `;

    // Add / remove recipes functionality
    box.querySelector(".remove-btn").addEventListener("click", () => {
      savedRecipes.splice(index, 1);
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      renderSavedItems();
      alert(`Removed. ${savedRecipes.length} recipes(s) remain.`);
    });

    savedContainer.appendChild(box);
  });
}

renderSavedItems();
