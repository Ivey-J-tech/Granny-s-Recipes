const savedContainer = document.getElementById("savedContainer");
let savedItems = JSON.parse(localStorage.getItem("savedRecipes")) || [];

function renderSavedItems() {
  savedContainer.innerHTML = "";

  if (savedItems.length === 0) {
    savedContainer.innerHTML = "<p>You haven't saved any recipes yet.</p>";
    return;
  }

  savedItems.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <i class="fa-solid fa-trash remove-btn" title="Remove"></i>
        `;

    // Add / remove recipes functionality
    box.querySelector(".remove-btn").addEventListener("click", () => {
      savedItems.splice(index, 1);
      localStorage.setItem("savedRecipes", JSON.stringify(savedItems));
      renderSavedItems();
      alert(`Removed. ${savedItems.length} recipes(s) remain.`);
    });

    savedContainer.appendChild(box);
  });
}

renderSavedItems();
