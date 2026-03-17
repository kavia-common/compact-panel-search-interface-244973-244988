/**
 * Lightweight cross-browser glue for extension popup<->background message passing.
 * 
 * Handles: .sendMessage, .onMessage, fallback for Chrome/Firefox APIs.
 *
 * Usage: import * as chromeMessage from './chromeMessage'
 */
/* global chrome, browser */
// PUBLIC_INTERFACE

// get the extension runtime API
function getRuntime() {
  // Window may have chrome or browser (Firefox)
  if (typeof chrome !== "undefined" && chrome.runtime) return chrome.runtime;
  if (typeof browser !== "undefined" && browser.runtime) return browser.runtime;
  throw new Error("Chrome/Firefox extension runtime API not found");
}

// Send message to background, return Promise
export function sendMessage(msg) {
  return new Promise((resolve, reject) => {
    try {
      getRuntime().sendMessage(msg, (resp) => {
        if (chrome && chrome.runtime && chrome.runtime.lastError) {
          // Errors like disconnected or background unavailable
          reject(new Error(chrome.runtime.lastError.message || "SendMessage failed"));
        } else {
          resolve(resp);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

// Add onMessage listener
export function addOnMessageListener(handler) {
  getRuntime().onMessage.addListener(handler);
}

// Remove onMessage listener
export function removeOnMessageListener(handler) {
  getRuntime().onMessage.removeListener(handler);
}
