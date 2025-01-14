// Get references to the modal and its elements
const modal = document.getElementById("streak-modal");
const closeModal = document.getElementById("close-modal");
const streakCount = document.getElementById("streak-count");

// Initialize the streak count and checked items from localStorage
let streak = parseInt(localStorage.getItem("streak")) || 0;
const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || {};

// Function to update the streak count and save to localStorage
function updateStreak() {
  streakCount.textContent = `${streak} days`;
  localStorage.setItem("streak", streak);
}

// Function to save the state of checked items to localStorage
function saveCheckedItems() {
  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
}

// Function to show the modal
function showModal() {
  modal.style.display = "flex";
}

// Function to close the modal
function closeModalHandler() {
  modal.style.display = "none";
}

// Add event listeners to all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  // Restore the checked state from localStorage
  if (checkedItems[checkbox.id]) {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      streak++; // Increase the streak count
      checkedItems[this.id] = true; // Mark the item as checked
    } else {
      streak--; // Decrease the streak count
      delete checkedItems[this.id]; // Remove the item from checked items
    }

    updateStreak(); // Update the streak display
    saveCheckedItems(); // Save the checked items to localStorage

    if (this.checked) {
      showModal(); // Show the modal if the checkbox is checked
    }
  });
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", closeModalHandler);

// Close the modal when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModalHandler();
  }
});

// Initialize the streak count display
updateStreak();
