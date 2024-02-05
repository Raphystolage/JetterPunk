/**
 * Different types of page
 * @enum {string} Types of pages used by JetterPunk
 */
const PageTypes = {
    index: "Index",
    quiz: "Quiz",
    other: "Other"
};

const PATHNAME = window.location.pathname;

const indexRegEx = new RegExp("^/$");
const quizRegEx = new RegExp("^/quizzes/[\\w-]*$");
const userQuizRegEx = new RegExp("^/user-quizzes/[0-9]+/[\\w-]*$");

/**
 * @constant Type of current JetPunk page
 */
var PAGETYPE;

if(indexRegEx.test(PATHNAME)) {
    PAGETYPE = PageTypes.index;
} else if(quizRegEx.test(PATHNAME) || userQuizRegEx.test(PATHNAME)) {
    PAGETYPE = PageTypes.quiz;
} else {
    PAGETYPE = PageTypes.other;
}

switch(PAGETYPE) {
    case "Main":
        break;
    case "Quiz":
        solveFeature();
        break;
    case "Other":
    default:
        break;
}
