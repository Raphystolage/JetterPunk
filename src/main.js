/**
 * Different types of page
 * @enum {string} Types of pages used by JetterPunk
 */
const PageTypes = {
    index: "Index",
    quiz: "Quiz",
    other: "Other"
};

const indexRegEx = new RegExp("^/$");
const quizRegEx = new RegExp("^/quizzes/[\\w-]*$");
const userQuizRegEx = new RegExp("^/user-quizzes/[0-9]+/[\\w-]*$");


async function identifyPage() {
    var pathname = window.location.pathname;
    var pagetype;
    if(indexRegEx.test(pathname)) {
        pagetype = PageTypes.index;
    } else if(quizRegEx.test(pathname) || userQuizRegEx.test(pathname)) {
        pagetype = PageTypes.quiz;
    } else {
        pagetype = PageTypes.other;
    }
    return pagetype;
}

async function setup() {
    var pagetype = await identifyPage();
    var features = (await chrome.storage.local.get("features")).features;
    for(var feature of features) {
        if(feature.pageTypes.indexOf(pagetype) != -1) {
            console.log(feature);
            for(var service of feature.services) {
                window[service]();
            }
        }
    }
}


setup();