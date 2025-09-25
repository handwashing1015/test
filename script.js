// ----------------- 데이터 (질문/결과) -----------------
const questions = [
  {
    question: "나는 사람들과 어울리는 걸 좋아한다.",
    image: "img/social.jpg",
    answers: [
      { text: "매우 그렇다", score: 3 },
      { text: "그렇다", score: 2 },
      { text: "그렇지 않다", score: 1 },
      { text: "전혀 아니다", score: 0 }
    ]
  },
  {
    question: "새로운 일을 시도하는 걸 즐긴다.",
    image: "img/adventure.jpg",
    answers: [
      { text: "매우 그렇다", score: 3 },
      { text: "그렇다", score: 2 },
      { text: "그렇지 않다", score: 1 },
      { text: "전혀 아니다", score: 0 }
    ]
  },
  {
    question: "계획을 세우고 체계적으로 움직이는 편이다.",
    image: "img/plan.jpg",
    answers: [
      { text: "매우 그렇다", score: 3 },
      { text: "그렇다", score: 2 },
      { text: "그렇지 않다", score: 1 },
      { text: "전혀 아니다", score: 0 }
    ]
  }
];

const results = [
  { text: "내향형", image: "img/introvert.png", minScore: 0, maxScore: 3, desc: "조용하고 차분한 성향입니다." },
  { text: "중간형", image: "img/ambivert.png", minScore: 4, maxScore: 6, desc: "상황에 따라 유연하게 행동하는 타입입니다." },
  { text: "외향형", image: "img/extrovert.png", minScore: 7, maxScore: 9, desc: "사교적이고 에너지가 넘치는 타입입니다." }
];

// ----------------- 상태 변수 -----------------
let currentQuestionIndex = 0;
let totalScore = 0;

// ----------------- DOM 요소 -----------------
const cover = document.getElementById("cover");
const startBtn = document.getElementById("start-btn");
const main = document.getElementById("main");

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const questionImage = document.getElementById("question-image");
const questionText = document.getElementById("question");

const progressBar = document.getElementById("progress-bar");

const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");
const restartBtn = document.getElementById("restart-btn");
const shareLink = document.getElementById("share-link");

// ----------------- 시작 버튼 -----------------
startBtn.addEventListener("click", () => {
  // 표지 숨기고 메인 보이기
  cover.classList.add("hide");
  main.classList.remove("hide");
  // 초기 상태 초기화 후 질문 시작
  currentQuestionIndex = 0;
  totalScore = 0;
  showQuestion();
});

// ----------------- 질문 표시 함수 -----------------
function showQuestion() {
  answerButtons.innerHTML = "";
  const q = questions[currentQuestionIndex];

  // 이미지
  if (q.image) {
    questionImage.src = q.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  // 질문 텍스트
  questionText.textContent = q.question;

  // 선택지 버튼 생성
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans.text;
    btn.addEventListener("click", () => selectAnswer(ans.score));
    answerButtons.appendChild(btn);
  });

  // 프로그레스 바 업데이트
  const percent = Math.round((currentQuestionIndex / questions.length) * 100);
  progressBar.style.width = percent + "%";
}

// ----------------- 답 선택 처리 -----------------
function selectAnswer(score) {
  totalScore += score;
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ----------------- 결과 표시 -----------------
function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");

  // 점수로 결과 찾기
  const r = results.find(item => totalScore >= item.minScore && totalScore <= item.maxScore) || results[0];

  resultText.textContent = `${r.text} — ${r.desc}`;
  resultImage.src = r.image;

  // 공유 링크(예: 소셜에 공유하거나 복사할 수 있게 현재 페이지 URL 사용)
  try {
    shareLink.href = location.href;
    shareLink.setAttribute("download", "");
  } catch(e) {
    shareLink.style.display = "none";
  }
}

// ----------------- 다시하기 -----------------
restartBtn.addEventListener("click", () => {
  // 결과 초기화
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  currentQuestionIndex = 0;
  totalScore = 0;
  showQuestion();
});

// ----------------- 페이지 로드 시 (표지는 기본 노출) -----------------

