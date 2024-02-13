import * as utils from "./utils.js";

const FEATURES = [
    new utils.Feature("solve", ["^/quizzes/[\\w-]*$", "^/user-quizzes/[0-9]+/[\\w-]*$"], ["solveFeature"]),
    new utils.Feature("test", ["^/quizzes/[\\w-]*$", "^/user-quizzes/[0-9]+/[\\w-]*$"], [], false)
];

const SETTINGS = {
    "language": "en"
};


// ATTENTION EVENEMENT A CHANGER A chrome.runtime.onInstalled
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.local.set({"features": FEATURES, "settings": SETTINGS});
    console.debug("Functional data initialized");
});