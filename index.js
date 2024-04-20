const questions = [
  {
    question: "What is the name of the wife to Cain?",
    choices: [
      { text: "Aklia", answer: false },
      { text: "Luluwa", answer: true },
      { text: "Beulah", answer: false },
      { text: "Barnice", answer: false },
    ],
  },
  {
    question: "Who was cast into a burning fiery furnace for 3 days by king Nimroid Cush?",
    choices: [
      { text: "Shadrack", answer: false },
      { text: "Meshack", answer: false },
      { text: "Abraham", answer: true },
      { text: "Michelangelo", answer: false },
    ],
  },
  {
    question: "How many days did Adam and Eve fasted after being chased out of the garden of Eden.",
    choices: [
      { text: "83 days", answer: true },
      { text: "40", answer: false },
      { text: "7", answer: false },
      { text: "21", answer: false },
    ],
  },
  {
    question: "What was the first miracle of Jesus Christ was?",
    choices: [
      { text: "Walking on water", answer: false },
      { text: "Changing water to wine", answer: false },
      { text: "Calming the storm", answer: false },
      { text: "Healing Salome’s withered hand", answer: true },
    ],
  },
  {
    question: "How many children did Adam and Eve gave birth to?",
    choices: [
      { text: "6", answer: false },
      { text: "5", answer: true },
      { text: "3", answer: false },
      { text: "4", answer: false },
    ],
  },
  {
    question: "Who were the first people to be baptized according to the Bible?",
    choices: [
      { text: "Israelites that came fout of Egypt", answer: true },
      { text: "Jewish during John the Baptized teaching", answer: false },
      { text: "The Pharises", answer: false },
      { text: "The Samaritans", answer: false },
    ],
  },
  {
    question: "What is the name to the father to Samson?",
    choices: [
      { text: "Matthias", answer: false },
      { text: "Reheboam", answer: false },
      { text: "David", answer: false },
      { text: "Manoah", answer: true },
    ],
  },
  {
    question: "Which prophet was instructed by God to marry a whoredom woman?",
    choices: [
      { text: "Nathan", answer: false },
      { text: "Nahum", answer: false },
      { text: "Hosea", answer: true },
      { text: "Joel", answer: false },
    ],
  },
  {
    question: "Nathanael was an Apostle and the disciple of Jesus Christ, he was commonly known as",
    choices: [
      { text: "Cephas", answer: false },
      { text: "Bartholomew", answer: true },
      { text: "Judas ", answer: false },
      { text: "Thaddaeus", answer: false },
    ],
  },
  {
    question: "Who was the father to Methosalam?",
    choices: [
      { text: "Lameck", answer: false },
      { text: "Joachim", answer: false },
      { text: "Ezbon", answer: false },
      { text: "Enoch", answer: true },
    ],
  },
];







let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");


const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber+ ". " + currentQuestion.question;  
  startTimer();
  currentQuestion.choices.forEach(choice=>{
    const button = document.createElement("button");
    button.innerHTML = choice.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (choice.answer) {
      button.dataset.answer = choice.answer;
    }
    button.addEventListener("click", selectChoice);
  });
};

const resetState = ()=>{
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
    clearInterval(timerInterval);

  };
};

const selectChoice = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.answer === "true";
  if (isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("incorrect");
  };
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.answer === "true") {
      button.classList.add("correct");
    };
    button.disabled = true;
  });
  nextButton.style.display = "block";
  
};



function showScore () {
  resetState();
  questionElement.innerHTML = `You scored ${score} 0ut of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

const handleNextButton = ()=>{
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else{
    showScore();
  }
  
};

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex <questions.length){
    handleNextButton()
  } else{
    startQuiz();
  };
});

function startTimer() {
  timerInterval =setInterval(function(){
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if(timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
}




startQuiz();



