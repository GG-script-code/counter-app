/**
 * ui.js
 * Handles ONLY the creation and updating of the DOM elements.
 * Uses document.createElement, append, textContent, and classList,
 * following the best practices taught in the course.
 */

"use strict";

// --- DOM Elements References ---
let valueDisplay;
let incrementBtn;
let decrementBtn;
let resetBtn;

/**
 * Helper function to create an HTML element with optional classes and text.
 * @param {string} tag - The HTML tag name.
 * @param {string} className - The CSS class(es) to add.
 * @param {string} text - The text content.
 * @returns {HTMLElement}
 */
function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

/**
 * Builds the entire UI dynamically inside the given container.
 * @param {HTMLElement} container - The parent element (main#app).
 */
function createInterface(container) {
  // 1. Main Section
  const section = createElement("section", "counter");
  section.setAttribute("aria-label", "Counter Application");

  // 2. Title
  const title = createElement("h1", "counter__title", "Counter");
  section.append(title);

  // 3. Value Display
  valueDisplay = createElement("div", "counter__value", "0");
  valueDisplay.setAttribute("aria-live", "polite");
  section.append(valueDisplay);

  // 4. Controls Container
  const controls = createElement("div", "counter__controls");

  // 4a. Decrement Button
  decrementBtn = createElement("button", "btn btn--decrement", "−");
  decrementBtn.setAttribute("type", "button");
  decrementBtn.setAttribute("aria-label", "Decrease value");

  // 4b. Increment Button
  incrementBtn = createElement("button", "btn btn--increment", "+");
  incrementBtn.setAttribute("type", "button");
  incrementBtn.setAttribute("aria-label", "Increase value");

  // Append buttons to controls container
  controls.append(decrementBtn);
  controls.append(incrementBtn);
  section.append(controls);

  // 5. Reset Button
  resetBtn = createElement("button", "btn btn--reset", "Reset");
  resetBtn.setAttribute("type", "button");
  resetBtn.setAttribute("aria-label", "Reset value to zero");
  section.append(resetBtn);

  // 6. Keyboard Shortcuts Hint (Extra feature)
  const hint = createElement("p", "counter__hint", "Tip: use + or - keys");
  section.append(hint);

  // 7. Append the whole section to the main container (#app)
  container.append(section);
}

/**
 * Updates the display with the new value.
 * Changes the color dynamically based on the value (Extra feature).
 * @param {number} value - The new counter value.
 */
function updateDisplay(value) {
  valueDisplay.textContent = value;
  
  // Dynamic color personalization
  if (value === 0) {
    valueDisplay.style.color = "#38bdf8"; // Default blue
  } else if (value > 0 && value < 10) {
    valueDisplay.style.color = "#22c55e"; // Green for positive
  } else if (value >= 10) {
    valueDisplay.style.color = "#eab308"; // Gold for high numbers
  }
}

/**
 * Shows a brief visual error feedback on the display.
 * Used when the user tries to go below the minimum limit (0).
 */
function showMinimumFeedback() {
  valueDisplay.classList.add("counter__value--error");
  
  // Remove the class after 300ms using setTimeout
  setTimeout(function () {
    valueDisplay.classList.remove("counter__value--error");
  }, 300);
}

/**
 * Connects the buttons to their respective actions using Event Delegation.
 * @param {{onIncrement: Function, onDecrement: Function, onReset: Function}} actions
 */
function connectEvents(actions) {
  const controlsContainer = incrementBtn.parentElement;

  // Event Delegation: one listener for multiple buttons
  controlsContainer.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.getAttribute("aria-label") === "Increase value") {
      actions.onIncrement();
    } else if (button.getAttribute("aria-label") === "Decrease value") {
      actions.onDecrement();
    }
  });

  // Reset button is outside the controls container
  resetBtn.addEventListener("click", actions.onReset);

  // Keyboard Support (Extra feature)
  document.addEventListener("keydown", function (event) {
    if (event.key === "+" || event.key === "ArrowUp") {
      actions.onIncrement();
    } else if (event.key === "-" || event.key === "ArrowDown") {
      actions.onDecrement();
    }
  });
}