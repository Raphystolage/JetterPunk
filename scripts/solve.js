function getQuizType() {
    var elem = document.body.firstChild;
    while(elem.tagName != "DIV") {
        elem = elem.nextSibling;
    }
    return elem.classList[1];
}

var title = document.getElementsByTagName("h1")[0];
title.textContent += `: ${getQuizType()}`;

var solution = document.body.firstChild;
while(solution.tagName != "SCRIPT") {
    solution = solution.nextSibling;
}

var answerString = solution.textContent;

var answerJSON = JSON.parse(answerString.substring(answerString.indexOf("{"), answerString.lastIndexOf("}") + 1));

answerJSON = answerJSON.data.quiz.answers;
console.log(answerJSON);

const solve_button = document.createElement("button");
solve_button.textContent = "Solve";
solve_button.onclick = solve;

async function solve() {
    for(answer of answerJSON) {
        const text_input = document.getElementById("txt-answer-box");
        text_input.value = answer.display;
        text_input.dispatchEvent(new Event('input'));
        console.info(answer);
    }
    console.info("Quizz solved !");
}

const text_input = document.getElementById("txt-answer-box");
text_input.insertAdjacentElement("afterend", solve_button);