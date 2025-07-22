// Optional: Bei jedem Laden ein zufälliges Zitat hervorheben
document.addEventListener("DOMContentLoaded", () => {
  const quotes = document.querySelectorAll(".quote");
  const random = Math.floor(Math.random() * quotes.length);
  quotes[random].style.borderLeftColor = "#ff66aa";
  quotes[random].style.backgroundColor = "rgba(255, 255, 255, 0.08)";
});
