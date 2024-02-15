import * as utils from "./utils.js";

const FEATURES = [
    new utils.Feature("solve", ["Quiz", "UserQuiz"], ["solveFeature"])
];

const SETTINGS = {
    "language": "en"
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.local.set({"features": FEATURES, "settings": SETTINGS});
    console.debug("Functional data initialized");
});