const questions = [
    {
        question: "나는 사람들과 어울리는 걸 좋아한다.",
        image: "img/속전속결형.png",
        answers: [
            { text: "매우 그렇다", score: 3 },
            { text: "그렇다", score: 2 },
            { text: "아니다", score: 1 },
            { text: "전혀 아니다", score: 0 }
        ]
    },
    {
        question: "새로운 일을 시도하는 걸 즐긴다.",
        image: "img/adventure.jpg",
        answers: [
            { text: "매우 그렇다", score: 3 },
            { text: "그렇다", score: 2 },
            { text: "아니다", score: 1 },
            { text: "전혀 아니다", score: 0 }
        ]
    },
    {
        question: "계획을 세우고 따라가는 편이다.",
        image: "img/plan.jpg",
        answers: [
            { text: "매우 그렇다", score: 3 },
            { text: "그렇다", score: 2 },
            { text: "아니다", score: 1 },
            { text: "전혀 아니다", score: 0 }
        ]
    }
];

const results = [
    { text: "내향형", image: "img/introvert.png", minScore: 0, maxScore: 3 },
    { text: "중간형", image: "img/ambivert.png", minScore: 4, maxScore: 6 },
    { text: "외향형", image: "img/extrovert.png", minScore: 7, maxScore: 9 }
];

let currentQuestionIndex = 0;
let totalScore = 0;

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const questionImage = document.getElementById("question-image");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    answerButtons.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    if(currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = "block";
    } else {
        questionImage.style.display = "none";
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.addEventListener("click", () => selectAnswer(answer.score));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(score) {
    totalScore += score;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.classList.add("hide");
    resultContainer.classList.remove("hide");

    const result = results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore);
    resultText.textContent = result.text;
    resultImage.src = result.image;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    totalScore = 0;
    resultContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    showQuestion();
});

showQuestion();
