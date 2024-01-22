/**
 * Get quiz data from JavaScript on web page
 * @return {object} Quiz data in JSON format
 */
function fetchQuizData() {

    // Find the first script
    var pageScripts = document.scripts;
    var i = 0;
    while(i < pageScripts.length && !pageScripts[i].textContent.includes("var _page")) {
        i++;
    }

    // This script should look like "var _page = { ... }", we need to get the _page value
    var dataString = pageScripts[i].textContent;
    var dataJSON = JSON.parse(dataString.substring(dataString.indexOf("{"), dataString.lastIndexOf("}") + 1));
    console.debug("Quiz data : " + dataJSON);

    return dataJSON;
}


/**
 * @constant Quiz Data in JSON format from _page variable
 */
const QUIZDATA = fetchQuizData();


/**
 * Different types of quiz
 * @enum {string} Key: Name on JetPunk, value: value of "whatkind" property on QUIZDATA
 */
const QuizTypes = {
    Text: "v",
    Picture: "p",
    Map: "m",
    Click: "c",
    MultipleChoice: "mc",
    Tile: "ts"
};


/**
 * Get quiz type from QUIZDATA (see QuizTypes enum)
 * @return {string|null} Type name
 */
function getQuizType() {
    var whatkind = QUIZDATA.data.quiz.whatkind;
    for(var quizType in QuizTypes) {
        if(QuizTypes[quizType] == whatkind) {
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

    // Consecutive fill of match string
    match = "";
    var i = 0;
    while(i < regex.length) {
        switch(regex[i]) {

            // Recursive call for subgroups surrounded by ()
            case '(':
                var j = i + 1;
                var otherGroup = 0;
                while(regex[j] != ')' || otherGroup != 0) {
                    if(regex[j] == '(') {
                        otherGroup++;
                    } else if(regex[j] == ')'){
                        otherGroup--;
                    }
                    j++
                }
                match += simplestMatch(regex.substring(i + 1, j));
                i += j - i;
                break;

            // Fetch the first character of subgroups surrounded by [] because RegEx on JetPunk aren't complexe (absence of "[^...]")
            case '[':
                var j = i + 1;
                while(regex[j] != ']') {
                    j++;
                }
                match += regex[i+1];
                i += j - i;
                break;
            
            // Ignore unecessary characters for simplest match
            case '?':
            case '+':
            case '*':
            case '^':
            case '$':
                break;

            // Simple substitution of special characteres
            case '\\':
                switch(regex[i+1]) {
                    case 's':
                        match += ' ';
                        break;
                    case 'S':
                        match += 'a';
                        break;
                    case 'd':
                        match += '1';
                        break;
                    case 'D':
                        match += 'a';
                        break;
                    case 'w':
                        match += 'a';
                        break;
                    case 'W':
                        match += ' ';
                        break;
                    default:
                        match += regex[i+1]; 
                }
                i++;
                break;
            case '.':
                match += 'a';
                break;

            // End of extraction if "OR" operator is encountered
            case '|':
                return match;

            default:
                match += regex[i];
        
        }
        i++;
    }

    return match;
}


/**
 * Extract answers from QUIZDATA constant
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {object} List of answers
 */
function fetchAnswers(quizType) {
    var answers = [];
    for(var answer of QUIZDATA.data.quiz.answers) {

        // If a Regular Expression is given, the simplest match of this RegEx is entered
        if("typeins" in answer) {
            var typeins = answer.typeins.constructor === Array ? answer.typeins[0] : answer.typeins;
            answers.push(simplestMatch(typeins.val));
        }

        // Otherwise, the corresponding answer displayed at the end of the time is entered
        else if("display" in answer) {
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

    var answers = fetchAnswers(quizType);

    // In case yellow box is not on the first cell at the beggining each answer is entered twice
    if(QUIZDATA.data.quiz.yellowBox) {
        var length = answers.length;
        for(var i = 0; i < length; i++) {
            answers.push(answers[i]);
        }
    }

    // Insert answers on quiz page
    for(var answer of answers) {
        const textInput = document.getElementById("txt-answer-box");
        textInput.value = answer;
        textInput.dispatchEvent(new Event('input'));
        console.debug("Answer entered: " + answer);
    }

    console.info("Quizz solved !");
}


/**
 * Place solve button on quiz page
 * @param {string} quizType Quiz type value from QuizTypes dictionary
 * @return {void}
 */
function placeSolveButton(quizType) {

    // Create solve button using JetPunk UI style
    var solveButton = document.createElement("button");
    solveButton.classList.add("blue");
    solveButton.style.marginLeft = "10px";
    solveButton.textContent = "Solve";
    solveButton.onclick = () => solve(quizType);

    // Place solve button next to the answer input on the page
    var answerInput;
    if(quizType == 'Text' | quizType == 'Picture') {
        console.log("test");
        answerInput = document.getElementById("txt-answer-box");
        answerInput.insertAdjacentElement("afterend", solveButton);
    }
    //answerInput.insertAdjacentElement("afterend", solveButton);

}


// Display quiz type at the end of its title
var title = document.getElementsByTagName("h1")[0];
var quizType = getQuizType();
title.textContent += `: ${quizType}`;

placeSolveButton(quizType);