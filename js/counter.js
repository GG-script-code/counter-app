/**
 * counter.js
 * Contains the core logic of the counter.
 * This file does NOT interact with the DOM.
 * It only manages state, operations, and localStorage persistence.
 */

"use strict";

// --- Configuration Constants ---
const STORAGE_KEY = "counter-value";
const MIN_LIMIT = 0; // The counter cannot go below 0

// --- State Variables ---
let currentValue = 0;
let listeners = []; // Array of callback functions subscribed to changes

/**
 * Reads the saved value from localStorage.
 * Returns 0 if no value exists or if the stored data is corrupted.
 * Uses JSON.parse because we are now saving an object.
 * @returns {number}
 */
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return 0;
  }
  try {
    const parsed = JSON.parse(saved);
    // Check if the parsed value is a valid number
    if (typeof parsed.value === "number" && !Number.isNaN(parsed.value)) {
      return parsed.value;
    }
    return 0;
  } catch (error) {
    // Fallback if the JSON is corrupted
    return 0;
  }
}

/**
 * Saves the current value to localStorage.
 * We save an object that includes the value and the timestamp.
 */
function saveToStorage() {
  const dataToSave = {
    value: currentValue,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}

/**
 * Notifies all subscribed callbacks with the current value.
 */
function notifyListeners() {
  listeners.forEach((callback) => callback(currentValue));
}

/**
 * Increments the counter by 1.
 */
function increment() {
  currentValue += 1;
  saveToStorage();
  notifyListeners();
}

/**
 * Decrements the counter by 1, but not below the MIN_LIMIT.
 * Returns true if decremented successfully, false otherwise.
 * @returns {boolean}
 */
function decrement() {
  if (currentValue <= MIN_LIMIT) {
    return false;
  }
  currentValue -= 1;
  saveToStorage();
  notifyListeners();
  return true;
}

/**
 * Resets the counter to 0.
 */
function reset() {
  currentValue = 0;
  saveToStorage();
  notifyListeners();
}

/**
 * Subscribes a callback function to be called on every value change.
 * @param {Function} callback
 */
function subscribe(callback) {
  listeners.push(callback);
}

/**
 * Initializes the counter by loading the saved value and notifying listeners.
 */
function initializeCounter() {
  currentValue = loadFromStorage();
  notifyListeners();
}

/**
 * Returns the current counter value.
 * @returns {number}
 */
function getValue() {
  return currentValue;
}