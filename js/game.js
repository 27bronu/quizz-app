const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
let totalChoices = [];
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

const numQuestionsparameter = Math.floor(
  localStorage.getItem("numQuestions") ?? 1
);
const level = localStorage.getItem("setDificulty");
const category = localStorage.getItem("setCategory");
const type = localStorage.getItem("setType");

const dificuldadeEasy = (category) => {
  const categoryString = category.toString();
  switch (categoryString) {
    case "9":
      return 30;

    case "10":
      return 7;

    case "11":
      return 20;

    case "12":
      return 15;

    case "13":
      return 1;

    case "14":
      return 6;

    case "15":
      return 50;

    case "16":
      return 5;

    case "17":
      return 11;

    case "18":
      return 14;

    case "19":
      return 6;

    case "20":
      return 4;

    case "21":
      return 5;

    case "22":
      return 19;

    case "23":
      return 15;

    case "24":
      return 10;

    case "25":
      return 2;

    case "26":
      return 2;

    case "27":
      return 14;

    case "28":
      return 2;

    case "29":
      return 2;

    case "30":
      return 2;

    case "31":
      return 14;

    case "32":
      return 3;

    default:
      return 2;
  }
};
const dificuldadeMedium = (category) => {
  const categoryString = category.toString();
  switch (categoryString) {
    case "9":
      return 30;

    case "10":
      return 1;

    case "11":
      return 7;

    case "12":
      return 21;

    case "13":
      return window.location.assign("/html/notfound.html");

    case "14":
      return 11;

    case "15":
      return 46;

    case "16":
      return 2;

    case "17":
      return 20;

    case "18":
      return 19;

    case "19":
      return 8;

    case "20":
      return 4;

    case "21":
      return 9;

    case "22":
      return 20;

    case "23":
      return 20;

    case "24":
      return 5;

    case "25":
      return 3;

    case "26":
      return 1;

    case "27":
      return 8;

    case "28":
      return 9;

    case "29":
      return 1;

    case "30":
      return 1;

    case "31":
      return 5;

    case "32":
      return 7;

    default:
      return 2;
  }
};

const dificuldadeHard = (category) => {
  const categoryString = category.toString();
  switch (categoryString) {
    case "9":
      return 6;

    case "10":
      return 1;

    case "11":
      return 3;

    case "12":
      return 5;

    case "13":
      return 1;

    case "14":
      return 1;

    case "15":
      return 15;

    case "16":
      return 1;

    case "17":
      return 3;

    case "18":
      return 3;

    case "19":
      return 4;

    case "20":
      return 2;

    case "21":
      return window.location.assign("/html/notfound.html");

    case "22":
      return 3;

    case "23":
      return 8;

    case "24":
      return 3;

    case "25":
      return 1;

    case "26":
      return 1;

    case "27":
      return window.location.assign("/html/notfound.html");

    case "28":
      return 2;

    case "29":
      return 1;

    case "30":
      return window.location.assign("/html/notfound.html");

    case "31":
      return 6;

    case "32":
      return window.location.assign("/html/notfound.html");

    default:
      return 2;
  }
};

const categorias = (category, level) => {
  switch (level) {
    case "easy":
      const valor = dificuldadeEasy(category);
      console.log(valor);
      debugger;
      return dificuldadeEasy(category);

    case "medium":
      return dificuldadeMedium(category);

    case "hard":
      return dificuldadeHard(category);
  }
};

const getCategory =
  category === "any" ? Math.floor(Math.random() * (32 - 9 + 1) + 9) : category;

const max =
  numQuestionsparameter > Math.floor(categorias(getCategory, level))
    ? Math.floor(categorias(getCategory, level))
    : numQuestionsparameter;

const min = numQuestionsparameter < 1 ? 1 : max;

let numberQuestions = 1;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

const CORRECT_BONUS = 10;

const startGame = async () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  await getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = async () => {
  const mainDiv = document.getElementById("answers");
  mainDiv.innerHTML = "";

  if (availableQuesions.length === 0 || questionCounter >= min) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/html/end.html");
  }
  questionCounter++;

  if (numQuestionsparameter < 50) {
    progressText.innerText = `Question ${questionCounter}/${min}`;
    progressBarFull.style.width = `${(questionCounter / min) * 100}%`;
  } else {
    progressText.innerText = `Question ${questionCounter}/${50}`;
    progressBarFull.style.width = `${(questionCounter / 50) * 100}%`;
  }

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  const letters = ["A", "B", "C", "D"];

  totalChoices.forEach((choice, index) => {
    const choiceContainer = document.createElement("div");

    choiceContainer.className = "choice-container";

    mainDiv.appendChild(choiceContainer);

    const choiceLetter = document.createElement("p");
    const choiceAnswer = document.createElement("p");

    choiceLetter.className = "choice-prefix";
    choiceAnswer.className = "choice-text";

    choiceAnswer.setAttribute("data-number", index + 1);

    choiceLetter.textContent = letters[index];
    choiceAnswer.textContent = currentQuestion["choice" + (index + 1)];

    choiceContainer.appendChild(choiceLetter);
    choiceContainer.appendChild(choiceAnswer);

    choiceAnswer.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

(async () => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${min}&category=${getCategory}&difficulty=${level}&type=${type}`
    );
    const loadedQuestions = await res.json();
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      totalChoices = [loadedQuestion.correct_answer, ...answerChoices];

      if (answerChoices.length > 2) {
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      } else {
        formattedQuestion.answer = Math.floor(Math.random() * 2) + 1;
      }

      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  } catch (err) {
    console.error(err);
  }
})();
