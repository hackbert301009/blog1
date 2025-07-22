// Liste der Zitate
const quotes = [
  { text: "Wer den Code versteht, versteht die Welt.", author: "Albert Heruth" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Phantasie ist wichtiger als Wissen.", author: "Albert Einstein" },
  { text: "In der Stille hörst du die Wahrheit.", author: "Unbekannt" },
  { text: "Jeder Fehler ist ein Schritt zur Meisterschaft.", author: "Unbekannt" },
];

// Errechne Tagesindex basierend auf Datum
const today = new Date();
const index = today.getDate() % quotes.length;
const quote = quotes[index];

// Zeige Zitat im Blockquote
document.addEventListener("DOMContentLoaded", () => {
  const block = document.getElementById("dailyQuote");
  block.innerHTML = `
    <p>"${quote.text}"</p>
    <footer>– ${quote.author}</footer>
  `;
});
