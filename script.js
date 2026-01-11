// Quiz data for different subjects
const quizData = {
  math: {
    title: "Quiz Matematika",
    questions: [
      {
        question: "Berapakah hasil dari 15 × 4?",
        options: ["45", "50", "60", "75"],
        correct: 2,
      },
      {
        question: "Faktor dari 24 adalah...",
        options: [
          "1,2,3,4,6,8,12,24",
          "1,2,3,4,6,12,24",
          "1,2,4,6,8,12,24",
          "1,2,3,4,8,12,24",
        ],
        correct: 0,
      },
      {
        question: "Apa nama bangun datar yang memiliki 4 sisi sama panjang?",
        options: ["Persegi", "Persegi Panjang", "Segitiga", "Lingkaran"],
        correct: 0,
      },
      {
        question: "Berapa hasil dari 100 ÷ 5?",
        options: ["15", "20", "25", "30"],
        correct: 1,
      },
      {
        question: "Hasil dari 1/2 + 1/4 adalah...",
        options: ["1/6", "2/4", "3/4", "1"],
        correct: 2,
      },
    ],
  },
  science: {
    title: "Quiz IPA",
    questions: [
      {
        question: "Apa nama proses tumbuhan membuat makanannya sendiri?",
        options: ["Fotosintesis", "Respirasi", "Transpirasi", "Evaporasi"],
        correct: 0,
      },
      {
        question: "Planet terdekat dengan Matahari adalah...",
        options: ["Venus", "Mars", "Merkurius", "Bumi"],
        correct: 2,
      },
      {
        question: "Apa organ pernapasan utama manusia?",
        options: ["Jantung", "Hati", "Insang", "Paru-paru"],
        correct: 3,
      },
      {
        question: "Air mendidih pada suhu...",
        options: ["50°C", "80°C", "100°C", "120°C"],
        correct: 2,
      },
      {
        question: "Hewan yang memakan tumbuhan disebut...",
        options: ["Karnivora", "Herbivora", "Omnivora", "Insektivora"],
        correct: 1,
      },
    ],
  },
  social: {
    title: "Quiz IPS",
    questions: [
      {
        question: "Apa ibukota Indonesia?",
        options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
        correct: 0,
      },
      {
        question: "Siapa presiden pertama Indonesia?",
        options: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
        correct: 0,
      },
      {
        question: "Kapan Hari Kemerdekaan Indonesia diperingati?",
        options: [
          "17 Agustus 1945",
          "28 Oktober 1928",
          "1 Juni 1945",
          "10 November 1945",
        ],
        correct: 0,
      },
      {
        question:
          "Pulau dengan jumlah penduduk terbanyak di Indonesia adalah...",
        options: ["Sumatra", "Kalimantan", "Jawa", "Sulawesi"],
        correct: 2,
      },
      {
        question: "Di pulau manakah letak Ibukota Nusantara (IKN)?",
        options: ["Jawa", "Kalimantan", "Sumatra", "Sulawesi"],
        correct: 1,
      },
    ],
  },
};

let currentSubject = null;
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

function selectSubject(subject) {
  currentSubject = subject;
  document.getElementById("subject-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("quiz-title").textContent = quizData[subject].title;
  // Update the total question count in the start screen
  document.querySelector(
    "#start-screen p"
  ).textContent = `Terdapat ${quizData[subject].questions.length} pertanyaan yang harus dijawab`;
}

function backToSubjects() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("subject-screen").style.display = "block";
}

function startQuiz() {
  if (!currentSubject) {
    alert("Silakan pilih mata pelajaran terlebih dahulu!");
    return;
  }
  userAnswers = []; // Reset user answers when starting new quiz
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const currentQuestions = quizData[currentSubject].questions;
  const question = currentQuestions[currentQuestion];
  document.getElementById("question-text").textContent = question.question;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option;
    optionElement.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionElement);
  });

  // Update progress to show current question and total questions for the selected subject
  document.getElementById("current-question").textContent = currentQuestion + 1;
  document.getElementById("total-questions").textContent =
    currentQuestions.length;
  selectedAnswer = null;
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => option.classList.remove("selected"));
  options[index].classList.add("selected");
  selectedAnswer = index;
}

function nextQuestion() {
  if (selectedAnswer !== null) {
    const currentQuestions = quizData[currentSubject].questions;
    if (selectedAnswer === currentQuestions[currentQuestion].correct) {
      score++;
    }

    // Store user's answer
    userAnswers.push({
      questionIndex: currentQuestion,
      userAnswer: selectedAnswer,
    });

    currentQuestion++;

    if (currentQuestion < currentQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  } else {
    alert("Silakan pilih jawaban terlebih dahulu!");
  }
}

function showResult() {
  const totalQuestions = quizData[currentSubject].questions.length;
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("score").textContent = score;
  document.getElementById("total-score").textContent = totalQuestions;
}

function showReview() {
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("review-screen").style.display = "block";

  const reviewContainer = document.getElementById("review-answers");
  reviewContainer.innerHTML = "";

  const currentQuestions = quizData[currentSubject].questions;

  userAnswers.forEach((answer, index) => {
    const question = currentQuestions[answer.questionIndex];
    const isCorrect = answer.userAnswer === question.correct;

    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    reviewItem.innerHTML = `
            <div class="review-question">Soal ${index + 1}: ${
      question.question
    }</div>
            <div class="review-options">
                <div>Jawaban Anda: <span class="${
                  isCorrect ? "correct-answer" : "wrong-answer"
                }">${question.options[answer.userAnswer]}</span></div>
                ${
                  !isCorrect
                    ? `<div>Jawaban Benar: <span class="correct-answer">${
                        question.options[question.correct]
                      }</span></div>`
                    : ""
                }
            </div>
        `;

    reviewContainer.appendChild(reviewItem);
  });
}

function backToResult() {
  document.getElementById("review-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  currentSubject = null;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("review-screen").style.display = "none";
  document.getElementById("subject-screen").style.display = "block";
}
