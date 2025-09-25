const questions = [
  {
    question: "손을 얼마나 자주 씻는 편인가요?",
    answers: [
      { text: "거의 매번 씻는다", score: 2 },
      { text: "중간 정도", score: 1 },
      { text: "자주 안 씻는다", score: 0 }
    ]
  },
  {
    question: "손을 씻을 때 비누를 사용하나요?",
    answers: [
      { text: "항상 사용한다", score: 2 },
      { text: "가끔 사용한다", score: 1 },
      { text: "거의 사용하지 않는다", score: 0 }
    ]
  },
  {
    question: "손을 씻는 시간은 얼마나 되나요?",
    answers: [
      { text: "20초 이상", score: 2 },
      { text: "10~20초", score: 1 },
      { text: "10초 미만", score: 0 }
    ]
  },
  {
    question: "손씻기 후 바로 물기를 닦나요?",
    answers: [
      { text: "항상 닦는다", score: 2 },
      { text: "가끔 닦는다", score: 1 },
      { text: "거의 닦지 않는다", score: 0 }
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
const resultImage = document.getElementById('result-image');

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
  const currentQuestion = questions[currentQuestionIndex];
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

  // 결과 텍스트와 이미지
  if (score >= 7) {
    resultText.innerText = "청결왕! 손 위생 습관이 매우 우수한 유형입니다.";
    resultImage.src = "https://source.unsplash.com/360x200/?clean,hands";
  } else if (score >= 4) {
    resultText.innerText = "중간형! 손 위생 습관이 보통 수준인 유형입니다.";
    resultImage.src = "https://source.unsplash.com/360x200/?hands";
  } else {
    resultText.innerText = "주의형! 손 위생 습관이 부족한 유형입니다.";
    resultImage.src = "https://source.unsplash.com/360x200/?dirty,hands";
  }

  // '손씻기 6단계 보러가기' 버튼 추가
  const youtubeBtn = document.createElement('button');
  youtubeBtn.innerText = "손씻기 6단계 보러가기";
  youtubeBtn.style.backgroundColor = "#2196F3";
  youtubeBtn.addEventListener('click', () => {
    window.open("https://www.youtube.com/watch?v=d7jAZCIGX4I", "_blank");
  });
  resultContainer.appendChild(youtubeBtn);
}

function restartQuiz() {
  resultContainer.classList.add('hide');
  startContainer.classList.remove('hide');

  // 결과 페이지 버튼 제거 (중복 방지)
  const extraBtn = resultContainer.querySelector('button:nth-of-type(2)');
  if (extraBtn) extraBtn.remove();
}

