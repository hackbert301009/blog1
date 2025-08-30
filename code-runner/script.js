const questions = [
  {
    code: `let x = 5;
let y = 10;
console.log(x + y);`,
    correct: "15",
    options: ["10", "15", "20"]
  },
  {
    code: `function greet(name) {
  return "Hallo " + name;
}
console.log(greet("Anna"));`,
    correct: "Hallo Anna",
    options: ["Hallo", "Hallo Anna", "Anna"]
  },
  {
    code: `let arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
    correct: "4",
    options: ["3", "4", "5"]
  },
  {
    code: `print("10+11", 1+1)   # Python`,
    correct: "10+11 2",
    options: ["24", "2", "10+11 2"]
  },
  {
    code: `let a = "Code";
let b = "Runner";
console.log(a + " " + b);`,
    correct: "Code Runner",
    options: ["CodeRunner", "Code Runner", "Runner Code"]
  },
  {
    code: `for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
    correct: "0 1 2",
    options: ["0 1 2", "1 2 3", "3 2 1"]
  },
  {
    code: `numbers = [2, 4, 6]
print(sum(numbers))   # Python`,
    correct: "12",
    options: ["10", "12", "6"]
  }
];

let current = 0;
let score = 0;

function renderQuestion() {
  document.getElementById("code-question").innerText = questions[current].code;
  document.getElementById("current-question").innerText = current + 1;
  document.getElementById("total-questions").innerText = questions.length;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  questions[current].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "choice-btn";
    btn.onclick = () => checkAnswer(opt, btn);
    choices.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
}

function checkAnswer(answer, button) {
  const isCorrect = answer === questions[current].correct;
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.innerText = "✅ Richtig!";
    button.classList.add("correct");
    score++;
  } else {
    feedback.innerText = "❌ Falsch!";
    button.classList.add("wrong");
  }

  document.getElementById("points").innerText = score;

  // Alle Buttons deaktivieren
  document.querySelectorAll(".choice-btn").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  current = (current + 1) % questions.length;
  renderQuestion();
}

function restartGame() {
  current = 0;
  score = 0;
  document.getElementById("points").innerText = score;
  renderQuestion();
}

renderQuestion();
