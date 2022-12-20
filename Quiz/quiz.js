const question = document.querySelector("#question");
const choices = Array.from(document.querySelector(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What does CPU stand for?",
    choice1: "Central Processing Unit",
    choice2: "Computer Personal Unit",
    choice3: "Central Processor Unit",
    choice4: "Central Process Unit",
    answer: 1,
  },
  {
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified ?",
    choice1: "Static",
    choice2: "Final",
    choice3: "Private",
    choice4: "Public",
    answer: 2,
  },
];
// const questions = [
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question: "What does CPU stand for?",
//     correct_answer: "Central Processing Unit",
//     incorrect_answers: [
//       "Central Process Unit",
//       "Computer Personal Unit",
//       "Central Processor Unit",
//     ],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
//     correct_answer: "Final",
//     incorrect_answers: ["Static", "Private", "Public"],
//   },
//   {
//     category: "Science: Computers",
//     type: "boolean",
//     difficulty: "easy",
//     question: "The logo for Snapchat is a Bell.",
//     correct_answer: "False",
//     incorrect_answers: ["True"],
//   },
//   {
//     category: "Science: Computers",
//     type: "boolean",
//     difficulty: "easy",
//     question:
//       "Pointers were not used in the original C programming language; they were added later on in C++.",
//     correct_answer: "False",
//     incorrect_answers: ["True"],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "What is the most preferred image format used for logos in the Wikimedia database?",
//     correct_answer: ".svg",
//     incorrect_answers: [".png", ".jpeg", ".gif"],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question: "In web design, what does CSS stand for?",
//     correct_answer: "Cascading Style Sheet",
//     incorrect_answers: [
//       "Counter Strike: Source",
//       "Corrective Style Sheet",
//       "Computer Style Sheet",
//     ],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "What is the code name for the mobile operating system Android 7.0?",
//     correct_answer: "Nougat",
//     incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question: "On Twitter, what is the character limit for a Tweet?",
//     correct_answer: "140",
//     incorrect_answers: ["120", "160", "100"],
//   },
//   {
//     category: "Science: Computers",
//     type: "boolean",
//     difficulty: "easy",
//     question: "Linux was first created as an alternative to Windows XP.",
//     correct_answer: "False",
//     incorrect_answers: ["True"],
//   },
//   {
//     category: "Science: Computers",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "Which programming language shares its name with an island in Indonesia?",
//     correct_answer: "Java",
//     incorrect_answers: ["Python", "C", "Jakarta"],
//   },
// ];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
