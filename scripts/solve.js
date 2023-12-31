/**
 * Get quiz data from JavaScript on web page
 * @return {object} Quiz data in JSON format
 */
function fetchQuizData() {
    var dataScript = document.body.firstChild;
    while(dataScript.tagName != "SCRIPT") {
        dataScript = dataScript.nextSibling;
    }

    var dataString = dataScript.textContent;
    var dataJSON = JSON.parse(dataString.substring(dataString.indexOf("{"), dataString.lastIndexOf("}") + 1));
    console.debug("Quiz data : " + dataJSON);

    return dataJSON;
}


/**
 * @constant Quiz data in JSON format from _page variable
 */
const QUIZDATA = fetchQuizData();


/**
 * Different types of quiz
 * @enum {string} Key: Name on JetPunk, value: class name of the div on the quiz page
 */
const QuizTypes = {
    Text: "text-game-page",
    Picture: "photo-game-page",
    Click: "click-game-page",
    Map: "map-game-page",
    MultipleChoice: "mc-game-page",
    Tile: "tile-game-page"
};


/**
 * Get quiz type (see QuizTypes enum)
 * @return {string|null} Type name
 */
function getQuizType() {
    var elem = document.body.firstChild;
    while(elem.tagName != "DIV") {
        elem = elem.nextSibling;
    }

    for(var quizType in QuizTypes) {
        if(QuizTypes[quizType] == elem.classList[1]) {
            console.info("Quiz type : " + quizType);
            return quizType;
        }
    }

    return null;
}


/**
 * Give the simplest string matching with the RegEx passed in parameter
 * @param {string} regex RegEx used to find simplest match
 * @return {string} Simplest match
 */
function simplestMatch(regex) {
    return regex;
}


/**
 * Extract answers from QUIZDATA constant
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {object} List of answers
 */
function fetchAnswers(quizType) {
    var answers = [];
    for(var answer of QUIZDATA.data.quiz.answers) {
        if("typeins" in answer) {
            var typeins = answer.typeins.constructor === Array ? answer.typeins[0] : answer.typeins;
            answers.push(simplestMatch(typeins.val));
        } else if("display" in answer) {
            var display = answer.display;
            if(display.indexOf("{") >= 0) {
                display = display.substring(display.indexOf("{") + 1, display.lastIndexOf("}"));
            }
            answers.push(display);
        }
    }

    return answers;
}


/**
 * Enter answers on the page
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {void}
 */
function solve(quizType) {
    for(var answer of fetchAnswers(quizType)) {
        console.log(answer);
        const textInput = document.getElementById("txt-answer-box");
        textInput.value = answer;
        textInput.dispatchEvent(new Event('input'));
        console.debug(answer);
    }

    console.info("Quizz solved !");
}


/**
 * Place solve button on quiz page
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {void}
 */
function placeSolveButton(quizType) {
    var solveButton = document.createElement("button");
    solveButton.classList.add("blue");
    solveButton.style.marginLeft = "10px";
    solveButton.textContent = "Solve";
    solveButton.onclick = () => solve(quizType);
    var answerElement;
    if(quizType == 'Text' | quizType == 'Picture') {
        test = document.getElementById("txt-answer-box");
        document.getElementById("txt-answer-box").insertAdjacentElement("afterend", solveButton);
    }
}


var title = document.getElementsByTagName("h1")[0];
var quizType = getQuizType();
title.textContent += `: ${quizType}`;

if(quizType == 'Text') {
    placeSolveButton(quizType);
}