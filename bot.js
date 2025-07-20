(() => {
  // === Styles dynamisch einfügen ===
  const style = document.createElement("style");
  style.textContent = `
    #bot-container {
      width: 400px;
      height: 600px;
      background: #000a00;
      border: 3px solid #0f0;
      border-radius: 10px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 20px #0f0;
      font-family: "Courier New", Courier, monospace;
      color: #0f0;
      z-index: 9999;
    }
    #chat-window {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      border-bottom: 2px solid #0f0;
      background: #000a00;
      white-space: pre-line;
    }
    .message {
      margin: 5px 0;
    }
    .bot-message {
      color: #0f0;
    }
    .user-message {
      color: #0ff;
      text-align: right;
    }
    #input-area {
      display: flex;
      padding: 10px;
      background: #001100;
    }
    #user-input {
      flex: 1;
      background: #001100;
      border: none;
      color: #0f0;
      font-size: 16px;
      padding: 5px 10px;
      border-radius: 5px;
    }
    #user-input:focus {
      outline: 2px solid #0f0;
    }
    #send-btn {
      background: #0f0;
      border: none;
      color: #000;
      font-weight: bold;
      padding: 5px 15px;
      margin-left: 5px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease;
    }
    #send-btn:hover {
      background: #0cff00;
    }
    #buttons-area {
      background: #002200;
      padding: 8px 10px;
      border-top: 2px solid #0f0;
      display: flex;
      justify-content: space-around;
    }
    button.bot-func-btn {
      background: #003300;
      border: 1px solid #0f0;
      color: #0f0;
      font-family: monospace;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 5px;
      user-select: none;
      transition: background-color 0.3s ease;
    }
    button.bot-func-btn:hover {
      background: #0f0;
      color: #000;
    }
  `;
  document.head.appendChild(style);

  // === Bot Container bauen ===
  const botContainer = document.createElement("div");
  botContainer.id = "bot-container";
  botContainer.setAttribute("role", "region");
  botContainer.setAttribute("aria-label", "Chatbot");

  botContainer.innerHTML = `
    <div id="chat-window" aria-live="polite" aria-relevant="additions"></div>
    <div id="input-area">
      <input type="text" id="user-input" placeholder="Schreibe hier..." aria-label="Nachricht eingeben" autocomplete="off" />
      <button id="send-btn" aria-label="Nachricht senden">Senden</button>
    </div>
    <div id="buttons-area" aria-label="Funktionstasten">
      <button class="bot-func-btn" data-func="joke">Erzähl mir einen Witz</button>
      <button class="bot-func-btn" data-func="time">Wie spät ist es?</button>
      <button class="bot-func-btn" data-func="hacker">Hacker-Spruch</button>
      <button class="bot-func-btn" data-func="help">Hilfe</button>
    </div>
  `;

  // Bot nur auf der Startseite anzeigen (Beispiel: prüfe URL-Pfad)
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    document.body.appendChild(botContainer);
  }

  // === Soundeffekte hinzufügen ===
  const typeSound = new Audio("https://freesound.org/data/previews/66/66717_634166-lq.mp3");
  const clickSound = new Audio("https://freesound.org/data/previews/16/16335_634166-lq.mp3");

  function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  // === Elemente referenzieren ===
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const buttons = document.querySelectorAll(".bot-func-btn");

  let userName = "";

  function botSay(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "bot-message");
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    playSound(typeSound);
  }

  function userSay(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "user-message");
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function askName() {
    botSay("Hi! Wie heißt du?");
  }

  function setName(name) {
    userName = name.trim();
    if (!userName) {
      botSay("Bitte gib einen gültigen Namen ein.");
      return false;
    }
    botSay(`Cool, ${userName}! Wie kann ich dir heute helfen?`);
    return true;
  }

  function botFunction(func) {
    playSound(clickSound);
    switch (func) {
      case "joke":
        botSay("Warum können Geister so schlecht lügen? Weil man durch sie hindurchsehen kann! 😂");
        break;
      case "time":
        const now = new Date();
        botSay(`Es ist jetzt ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}.`);
        break;
      case "hacker":
        const hackers = [
          "Access granted. Welcome back, admin.",
          "System breach detected. Initiating countermeasures...",
          "Decrypting... 3... 2... 1... Success!",
          "Loading stealth module... activated.",
          "Firewall disabled. You're in."
        ];
        botSay(hackers[Math.floor(Math.random() * hackers.length)]);
        break;
      case "help":
        botSay("Ich kann dir Witze erzählen, die aktuelle Uhrzeit sagen oder coole Hacker-Sprüche bringen. Probier die Buttons!");
        break;
      default:
        botSay("Sorry, das kenne ich nicht.");
    }
  }

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    userSay(text);
    userInput.value = "";
    playSound(typeSound);

    if (!userName) {
      if (setName(text)) {
        // Name gesetzt, nächste Eingabe normale Fragen möglich
      }
      return;
    }

    // Einfache Keyword-Erkennung
    if (/witz/i.test(text)) {
      botFunction("joke");
    } else if (/zeit/i.test(text)) {
      botFunction("time");
    } else if (/hacker/i.test(text)) {
      botFunction("hacker");
    } else if (/hilfe/i.test(text)) {
      botFunction("help");
    } else {
      botSay("Sorry, das verstehe ich noch nicht. Versuch die Buttons!");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!userName) {
        botSay("Bitte sag mir erst deinen Namen!");
        return;
      }
      botFunction(btn.getAttribute("data-func"));
    });
  });

  // Start mit Namensfrage
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    askName();
  }
})();
