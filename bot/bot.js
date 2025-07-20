// Sounds
const welcomeSound = new Audio("sounds/welcome.mp3");

let userName = localStorage.getItem("userName");

const botContainer = document.createElement("div");
botContainer.className = "bot-container";

// Bot UI erstellen
botContainer.innerHTML = `
  <div class="bot-window">
    <div class="bot-header">🤖 HackerBot</div>
    <div class="bot-body" id="botBody"></div>
    <div class="bot-buttons" id="botButtons"></div>
  </div>
`;

document.body.appendChild(botContainer);

const botBody = document.getElementById("botBody");
const botButtons = document.getElementById("botButtons");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.textContent = text;
  botBody.appendChild(msg);
  botBody.scrollTop = botBody.scrollHeight;
}

function askName() {
  addMessage("bot", "Willkommen, wie heißt du?");
  speak("Willkommen! Wie heißt du?");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Dein Name";
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      userName = input.value.trim();
      localStorage.setItem("userName", userName);
      input.remove();
      greetUser();
    }
  });
  botButtons.appendChild(input);
  input.focus();
}

function greetUser() {
  const text = `Hallo ${userName}, wie kann ich dir helfen?`;
  welcomeSound.play();
  addMessage("bot", text);
  speak(text);
  showMainButtons();
}

function showMainButtons() {
  botButtons.innerHTML = "";

  const actions = [
    { label: "📂 Verzeichnisse anzeigen", msg: "Zeig mir alle Verzeichnisse" },
    { label: "ℹ️ Über dich", msg: "Erzähl mir etwas über dich" },
    { label: "🎵 Musik", msg: "Spiel Musik ab" },
    { label: "💬 Witz", msg: "Erzähl mir einen Witz" },
    { label: "❌ Tschüss", msg: "Tschüss" }
  ];

  actions.forEach(action => {
    const btn = document.createElement("button");
    btn.textContent = action.label;
    btn.addEventListener("click", () => handleMessage(action.msg));
    botButtons.appendChild(btn);
  });
}

function handleMessage(message) {
  addMessage("user", message);

  if (message.toLowerCase().includes("verzeichnisse")) {
    addMessage("bot", "Du hast folgende Seiten: Startseite, Über mich, Projekte, Bot.");
    speak("Du hast folgende Seiten: Startseite, Über mich, Projekte, Bot.");
  } else if (message.toLowerCase().includes("über dich")) {
    addMessage("bot", "Ich bin ein KI-Chatbot im coolen Hacker-Stil, programmiert von dir.");
    speak("Ich bin ein KI-Chatbot im coolen Hacker-Stil, programmiert von dir.");
  } else if (message.toLowerCase().includes("musik")) {
    addMessage("bot", "🎵 Musik kommt bald – bleib dran!");
    speak("Musik kommt bald – bleib dran!");
  } else if (message.toLowerCase().includes("witz")) {
    addMessage("bot", "Warum können Informatiker keine Autos fahren? Weil sie immer die Schleifen vergessen.");
    speak("Warum können Informatiker keine Autos fahren? Weil sie immer die Schleifen vergessen.");
  } else if (message.toLowerCase().includes("tschüss")) {
    addMessage("bot", `Tschüss ${userName}!`);
    speak(`Tschüss ${userName}!`);
    botButtons.innerHTML = "";
  } else {
    addMessage("bot", "Ich habe das nicht verstanden.");
    speak("Ich habe das nicht verstanden.");
  }
}

// Starte Bot
if (!userName) {
  askName();
} else {
  greetUser();
}
