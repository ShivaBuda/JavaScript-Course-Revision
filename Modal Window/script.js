// Select DOM elements
const btnShowEl = document.querySelectorAll(".btn-show"); // All show modal buttons
const popupOverlayEl = document.querySelector(".popup-overlay"); // Modal overlay element
const btnCloseEl = document.querySelector(".btn-close"); // Close button inside modal
console.log(btnShowEl);

// Function to show modal
const showModal = function () {
    popupOverlayEl.classList.remove("hidden");
};

// Function to close modal
const closeModal = function () {
    popupOverlayEl.classList.add("hidden");
};

// Add click event to all show modal buttons
for (let i = 0; i < btnShowEl.length; i++) {
    btnShowEl[i].addEventListener("click", showModal);
}

// Add click event to close button
btnCloseEl.addEventListener("click", closeModal);

// Add click event to overlay to close modal when clicking
popupOverlayEl.addEventListener("click", closeModal);

// Add keypress event to overlay to close modal when "Esc" key pressed
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        !popupOverlayEl.classList.contains("hidden")
    ) {
        closeModal();
    }
});
