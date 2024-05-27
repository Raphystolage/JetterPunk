import * as utils from "./utils.js";

/**
 * @constant Available features
 */
const FEATURES = {
    "solve": new utils.Feature("solve", ["Quiz", "UserQuiz"], ["solveFeature"]),
    "title": new utils.Feature("title", ["ClassicIndex", "SpecialIndex"], ["titleFeature"], false)
};

/**
 * @constant Available settings
 */
const SETTINGS = {
    "language": "en"
};


// Set FEATURES and SETTINGS data on local storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({"features": FEATURES, "settings": SETTINGS});
    console.debug("Functional data initialized");
});