// 질문 예시
const questions = [
  {
    question: "당신은 아침형 인간인가요?",
    answers: [
      { text: "예", score: 1 },
      { text: "아니요", score: 0 }
    ]
  },
  {
    question: "팀 프로젝트를 좋아하나요?",
    answers: [
      { text: "예", score: 1 },
      { text: "아니요", score: 0 }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const startContainer = document.getElementById('start-container');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultText = document.getElementById('result-text');

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

function startQuiz() {
  startContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.score));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  answerButtons.innerHTML = '';
}

function selectAnswer(selectedScore) {
  score += selectedScore;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  if (score >= 2) {
    resultText.innerText = "당신은 적극적인 유형입니다!";
  } else {
    resultText.innerText = "당신은 신중한 유형입니다!";
  }
}

function restartQuiz() {
  resultContainer.classList.add('hide');
  startContainer.classList.remove('hide');
}
