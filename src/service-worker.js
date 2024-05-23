import * as utils from "./utils.js";

const FEATURES = {
    "solve": new utils.Feature("solve", ["Quiz", "UserQuiz"], ["solveFeature"]),
    "title": new utils.Feature("title", ["ClassicIndex", "SpecialIndex"], ["titleFeature"], false)
};

const SETTINGS = {
    "language": "en"
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.local.set({"features": FEATURES, "settings": SETTINGS});
    console.debug("Functional data initialized");
});