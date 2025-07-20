const tools = [
  {
    name: "Nmap",
    description: "Nmap ist ein Open-Source-Netzwerkscanner, der Hosts und Dienste auf Computernetzwerken erkennt."
  },
  {
    name: "Wireshark",
    description: "Ein Netzwerkprotokoll-Analysator, mit dem man Datenpakete in Echtzeit mitlesen und analysieren kann."
  },
  {
    name: "Metasploit",
    description: "Ein Framework für Penetration Testing – hilft beim Finden und Ausnutzen von Sicherheitslücken."
  },
  {
    name: "John the Ripper",
    description: "Ein Passwort-Cracker, der schwache Passwörter durch Brute-Force oder Wörterbuchangriffe knackt."
  },
  {
    name: "Aircrack-ng",
    description: "Ein Toolset zur Analyse und zum Knacken von WLAN-Verschlüsselungen wie WEP/WPA."
  },
  {
    name: "Hydra",
    description: "Ein Tool für schnelle Brute-Force-Angriffe gegen verschiedene Netzwerkdienste."
  }
];

const list = document.getElementById("tool-list");
tools.forEach(tool => {
  const div = document.createElement("div");
  div.className = "tool";
  div.innerHTML = `<h2>${tool.name}</h2><p>${tool.description}</p>`;
  list.appendChild(div);
});
