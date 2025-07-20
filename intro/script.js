const lines = [
  "BOOTING SYSTEM...",
  "LOADING KERNEL MODULES...",
  "INITIALIZING NETWORK...",
  "AUTHORIZING ACCESS...",
  "ACCESS GRANTED ✅",
  "WELCOME BACK, HACKBERT 👨‍💻",
  "REDIRECTING TO STARTSEITE..."
];

let index = 0;
const output = document.getElementById("boot-text");

function typeLine() {
  if (index < lines.length) {
    output.innerHTML += lines[index] + "\n";
    index++;
    setTimeout(typeLine, 700);
  } else {
    // redirect after animation
    setTimeout(() => {
      localStorage.setItem("introPlayed", "true");
      window.location.href = "../index.html";
    }, 2000);
  }
}

if (!localStorage.getItem("introPlayed")) {
  typeLine();
} else {
  // skip animation if already seen
  window.location.href = "../index.html";
}
