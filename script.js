const questions = [
  {
    question: "공중 화장실에서 볼일을 본 당신.
      세면대에 줄이 길게 있습니다.
  이때 당신은?",
    answers: [
      { text: "줄을 기다렸다가 손 씻고 나가자.", score: 3 },
      { text: "손은 이따 집에 가서 씻자.", score: 2 },
      { text: "안 바쁘면 손 씻고 나가자.", score: 1 },
      { text: "그냥 얼른 나가자.", score: 0 }
    ]
  },
  {
    question: "마침 세면대 자리 하나가 비어 손을 씻기로 합니다.
이때 드는 생각은?",
    answers: [
      { text: "음, 비누 있고, 핸드티슈도 있고. 딱 좋아!", score: 3 },
      { text: "자리가 생기다니, 다행이다!", score: 2 },
      { text: "갑자기 귀찮은데.. 씻지 말까..?", score: 1 },
      { text: "물만 묻히고 빨리 가야겠다!", score: 0 }
    ]
  },
  {
    question: "당신이 손을 씻는 시간은 얼마나 되나요?",
    answers: [
      { text: "구석구석 씻다 보면 30초 순삭!", score: 3 },
      { text: "15초까지는 거뜬해!", score: 2 },
      { text: "바쁜 날엔 5초, 안 바쁜 날엔 10초!", score: 1 },
      { text: "한국인은 빨리빨리! 3초면 끝!", score: 0 }
    ]
  },
  {
    question: "당신은 손을 어떻게 씻나요?",
    answers: [
      { text: "손바닥, 손등, 손톱 밑, 손가락 사이까지 비누로!", score: 3 },
      { text: "비누로 손바닥끼리 비비고 물로 헹구자!", score: 2 },
      { text: "손이 찝찝하면 비누로, 안 찝찝하면 물로만~", score: 1 },
      { text: "물로만 씻어도 충분해!", score: 0 }
    ]
  },
      {
    question: "손을 다 씻은 당신, 화장실을 나가기 전 하는 일은??",
    answers: [
      { text: "손 건조기나 티슈로 물기 완벽 제거!", score: 3 },
      { text: "손을 털거나 옷에 물기를 닦기", score: 2 },
      { text: "손 탈탈 털어주면 끝!", score: 1 },
      { text: "얼른 나가자!", score: 0 }
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
  if (score = 15) {
    resultText.innerText = "<손씻기 모범생형>
      
      손씻기 100점입니다.
        지금처럼만 쭉~
        
        
        ★ 손씻기 6단계를 잘 기억해요.
        ☆ 30초 이상, 비누로 꼼꼼히!";
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


