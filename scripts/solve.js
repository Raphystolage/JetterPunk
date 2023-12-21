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
}

/**
 * Get quiz type (see QuizTypes enum)
 * @returns {string|null} Type name
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
 * Get answers in js code and enter it in the page
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {void}
 */
function solve(quizType) {
    var solution = document.body.firstChild;
    while(solution.tagName != "SCRIPT") {
        solution = solution.nextSibling;
    }

    var answerString = solution.textContent;
    var answerJSON = JSON.parse(answerString.substring(answerString.indexOf("{"), answerString.lastIndexOf("}") + 1)).data.quiz.answers;
    console.debug(answerJSON);

    for(var answer of answerJSON) {
        answer = answer.display;
        if(answer.indexOf("{") > 0) {
            answer = answer.substring(answer.indexOf("{") +1, answer.lastIndexOf("}"));
        }

        const text_input = document.getElementById("txt-answer-box");
        text_input.value = answer;
        text_input.dispatchEvent(new Event('input'));
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
    const solve_button = document.createElement("button");
    solve_button.textContent = "Solve";
    solve_button.onclick = () => solve(getQuizType());
    const text_input = document.getElementById("txt-answer-box");
    text_input.insertAdjacentElement("afterend", solve_button);
}

var title = document.getElementsByTagName("h1")[0];
var quizType = getQuizType();
title.textContent += `: ${quizType}`;

if(quizType == 'Text') {
    placeSolveButton(quizType);
}