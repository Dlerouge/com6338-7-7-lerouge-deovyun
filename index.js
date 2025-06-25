// Sample questions array
var questionsArr = [
  {
    question: 'Who created JavaScript?',
    answer: 'Brendan Eich',
    options: ['Linus Torvalds', 'Brendan Eich', 'Dan Abramov', 'Douglas Crockford']
  },
  {
    question: 'Which company developed JavaScript?',
    answer: 'Netscape',
    options: ['Microsoft', 'Apple', 'Netscape', 'Google']
  },
  {
    question: 'Which keyword is used to declare a variable in JavaScript?',
    answer: 'let',
    options: ['var', 'const', 'let', 'int']
  },
  {
    question: 'What does DOM stand for?',
    answer: 'Document Object Model',
    options: ['Data Object Method', 'Document Object Model', 'Direct Output Machine', 'Desktop Operation Mode']
  },
  {
    question: 'What symbol is used to access properties in JavaScript?',
    answer: '.',
    options: ['.', '#', '/', '*']
  }
];

const quizContainer = document.getElementById('quiz');
let currentQuestion = 0;
let score = 0;
let timer = null;
let timeLeft = 30;

/* ----------------- helpers ----------------- */
function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
}

function loadPreviousScore() {
  const prevScore = localStorage.getItem('previous-score');
  if (prevScore !== null) {
    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Previous Score: ${prevScore}%`;
    quizContainer.appendChild(scoreDisplay);
  }
}

/* ----------------- quiz flow ----------------- */
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.innerHTML = '';
  loadQuestion();
}

function loadQuestion() {
  resetTimer();

  if (currentQuestion >= questionsArr.length) {
    endQuiz();
    return;
  }

  const { question, options, answer } = questionsArr[currentQuestion];

  quizContainer.innerHTML = '';

  const questionEl = document.createElement('p');
  questionEl.textContent = question;

  const optionsDiv = document.createElement('div');
  const timerEl = document.createElement('p');
  timerEl.textContent = timeLeft;

  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      if (opt === answer) score++;
      resetTimer();
      currentQuestion++;
      loadQuestion();
    });
    optionsDiv.appendChild(btn);
  });

  quizContainer.appendChild(questionEl);
  quizContainer.appendChild(optionsDiv);
  quizContainer.appendChild(timerEl);

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      resetTimer();
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
}

function endQuiz() {
  resetTimer();
  const finalScore = Math.round((score / questionsArr.length) * 100);
  localStorage.setItem('previous-score', finalScore);

  quizContainer.innerHTML = '';

  const resultDisplay = document.createElement('p');
  resultDisplay.textContent = `Previous Score: ${finalScore}%`;

  const restartBtn = document.createElement('button');
  restartBtn.id = 'start-quiz';
  restartBtn.textContent = 'Start Quiz!';
  restartBtn.addEventListener('click', startQuiz);

  quizContainer.appendChild(resultDisplay);
  quizContainer.appendChild(restartBtn);
}

/* ----------------- initial render ----------------- */
quizContainer.innerHTML = '';
loadPreviousScore();

const startBtn = document.createElement('button');
startBtn.id = 'start-quiz';
startBtn.textContent = 'Start Quiz!';
startBtn.addEventListener('click', startQuiz);
quizContainer.appendChild(startBtn);
