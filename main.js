$(document).ready(function () {
  // Menu toggle
  const $menu = $("#menu-bar");
  const $navbar = $(".navbar");

  $menu.on("click", function () {
    $menu.toggleClass("fa-times");
    $navbar.toggleClass("active");
  });

  $(window).on("scroll", function () {
    $menu.removeClass("fa-times");
    $navbar.removeClass("active");
  });

  // View More / View Less toggle
  $(".viewMoreBtn").click(function () {
    const $paragraph = $(this).next(".extraText");
    $paragraph.slideToggle("slow");
    const currentText = $(this).text();
    $(this).text(currentText === "View More" ? "View Less" : "View More");

    // Animation effect: bounce button up and down
    $(this).animate({ top: "-=10px" }, 150).animate({ top: "+=10px" }, 150);
  });

  // Dropdown hover menu
  $(".dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideDown(300);
    },
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideUp(300);
    }
  );

  // Image hover effect - fixed CSS transform usage
  $(".recipes .box-container .box img").hover(
    function () {
      $(this).css({
        transform: "scale(1.05)",
        "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s ease",
      });
    },
    function () {
      $(this).css({
        transform: "scale(1)",
        "box-shadow": "none",
        transition: "transform 0.2s ease",
      });
    }
  );

  // Comments: handle form submission using jQuery
  const $form = $("#commentForm");
  const $usernameInput = $("#username");
  const $commentInput = $("#commentText");
  const $commentList = $("#commentList");

  $form.on("submit", function (e) {
    e.preventDefault();

    const name = $usernameInput.val().trim();
    const text = $commentInput.val().trim();

    if (!name || !text) return;

    const $commentDiv = $("<div>", { class: "comment-item" }).html(
      `<strong>${name}</strong>: ${text}`
    );

    $commentList.prepend($commentDiv);
    $form[0].reset();
  });

  // "Save-for-Later" functionalities
  const $saveButtons = $(".save-later-btn");

  // Load saved items and update heart icons
  let savedItems = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  $(".box").each(function () {
    const recipeName = $(this).find("h3").text();
    const $heartIcon = $(this).find(".save-later-btn i");

    if (savedItems.find((item) => item.name === recipeName)) {
      $heartIcon.removeClass("fa-regular").addClass("fa-solid");
    }
  });

  // Save/unsave item click handler
  $saveButtons.on("click", function () {
    const $btn = $(this);
    const $box = $btn.closest(".box");
    const recipeName = $box.find("h3").text();
    const imageSrc = $box.find("img").attr("src");
    const $heartIcon = $btn.find("i");

    savedItems = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    const index = savedItems.findIndex((item) => item.name === recipeName);

    if (index === -1) {
      // Save item
      savedItems.push({ name: recipeName, image: imageSrc });
      $heartIcon.removeClass("fa-regular").addClass("fa-solid");
      alert(`Saved! You now have ${savedItems.length} recipe(s) saved.`);
    } else {
      // Remove item
      savedItems.splice(index, 1);
      $heartIcon.removeClass("fa-solid").addClass("fa-regular");
      alert(`Removed! You now have ${savedItems.length} recipe(s) saved.`);
    }

    localStorage.setItem("savedRecipes", JSON.stringify(savedItems));
    updateSavedDropdown();
  });

  // Saved recipes dropdown
  const $savedToggle = $("#savedToggle");
  const $savedDropdown = $("#savedDropdown");
  const $savedCount = $("#savedCount");
  const $savedList = $("#savedList");

  function updateSavedDropdown() {
    savedItems = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    $savedCount.text(savedItems.length);
    $savedList.empty();

    if (savedItems.length === 0) {
      $savedList.html("<li>No recipes saved yet.</li>");
      return;
    }

    savedItems.forEach((item) => {
      const $li = $("<li>").html(
        `<i class="fa-solid fa-circle-dot"></i> ${item.name}`
      );
      $savedList.append($li);
    });
  }

  $savedToggle.on("click", function () {
    $savedDropdown.toggle();
  });

  // Initialize saved recipes dropdown on load
  updateSavedDropdown();

  // like button
  $(".like-btn").click(function () {
    const icon = $(this).find("i");

    if (icon.hasClass("fa-regular")) {
      icon
        .removeClass("fa-regular")
        .addClass("fa-solid")
        .css("color", "#1e90ff"); // Blue thumb
    } else {
      icon.removeClass("fa-solid").addClass("fa-regular").css("color", "");
    }

    // Optional bounce effect
    $(this).animate({ top: "-=5px" }, 100).animate({ top: "+=5px" }, 100);
  });
});
