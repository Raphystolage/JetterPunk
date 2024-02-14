import * as utils from "./utils.js";

const FEATURES = [
    new utils.Feature("solve", ["Quiz"], ["solveFeature"])
];

const SETTINGS = {
    "language": "en"
};


// ATTENTION EVENEMENT A CHANGER A chrome.runtime.onInstalled
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.local.set({"features": FEATURES, "settings": SETTINGS});
    console.debug("Functional data initialized");
});