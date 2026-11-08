/**
 * main.js
 * Entry point. Connects the UI and the Counter logic, and starts the app.
 */

"use strict";

/**
 * Initializes the application.
 */
function startApplication() {
  const appContainer = document.querySelector("#app");

  // 1. Build the UI dynamically
  createInterface(appContainer);

  // 2. Connect the buttons to the Counter logic
  connectEvents({
    onIncrement: increment,
    onDecrement: function () {
      const success = decrement();
      if (!success) {
        showMinimumFeedback();
      }
    },
    onReset: function () {
      // Extra feature: ask for confirmation before resetting
      const confirmReset = confirm("Are you sure you want to reset the counter to zero?");
      if (confirmReset) {
        reset();
      }
    },
  });

  // 3. Subscribe the display to counter changes
  subscribe(updateDisplay);

  // 4. Initialize the counter (loads saved value or defaults to 0)
  initializeCounter();
}

// Wait for the DOM to be fully loaded before starting
document.addEventListener("DOMContentLoaded", startApplication);