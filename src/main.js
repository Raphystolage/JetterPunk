/**
 * Different types of page
 * @enum {string} Types of pages used by JetterPunk
 */
const PageTypes = {
    "ClassicIndex": new RegExp("^/(fr|de|es|it|nl|pl|pt|fi|en)?/?$"),
    "SpecialIndex": new RegExp("^/(hr|ar|cz|ee|jp|ru|se|tr|cn|bg|dk|el|hu|no|sr|te|ve)/all/?$"),
    "Quiz": new RegExp("^/quizzes/[\\w-]*/?$"),
    "UserQuiz": new RegExp("^/user-quizzes/[0-9]+/[\\w-]*/?$"),
    "Other": new RegExp("^/.*$")
};


/**
 * Identify page type using its URL
 * @return {string} Page type (see PageTypes enum) 
 */
async function identifyPage() {
    var pathname = window.location.pathname;
    for(var type in PageTypes) {
        if(PageTypes[type].test(pathname)) {
            return type;
        }
    }
    return "Other";
}


/**
 * Add active features elements on current page
 * @return {void}
 */
async function setup() {
    var pagetype = await identifyPage();
    var title = document.getElementsByTagName("h1")[0];
    if(title != undefined) {
        title.textContent += `: ${pagetype}`;
    }
    var features = (await chrome.storage.local.get("features")).features;
    for(var feature in features) {
        feature = features[feature];
        if(feature.pageTypes.indexOf(pagetype) != -1 && feature.isActive) {
            console.log(feature);
            for(var service of feature.services) {
                window[service]();
            }
        }
    }
}


setup();