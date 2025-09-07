// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to define the largest heading?",
    answers: [
      { text: "<heading>", correct: false },
      { text: "<h6>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<head>", correct: false },
    ],
  },
  {
    question: "Which property in CSS is used to change the text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-style", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the size of text?",
    answers: [
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
      { text: "font-size", correct: true },
      { text: "text-font", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<scripting>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "<!-- -->", correct: false },
      { text: "##", correct: false },
      { text: "/* */", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to provide a unique name to an element?",
    answers: [
      { text: "class", correct: false },
      { text: "style", correct: false },
      { text: "id", correct: true },
      { text: "name", correct: false },
    ],
  },
  {
    question: "Which method is used to print something in the browser console in JavaScript?",
    answers: [
      { text: "console.print()", correct: false },
      { text: "log.console()", correct: false },
      { text: "console.log()", correct: true },
      { text: "print.log()", correct: false },
    ],
  },
];


//states....
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners....
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}