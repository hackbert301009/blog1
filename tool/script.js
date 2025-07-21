const tools = [
  {
    name: "nmap",
    desc: "Ein Netzwerk-Scanner zum Auffinden offener Ports und Dienste.",
    example: "nmap -sV 192.168.1.1"
  },
  {
    name: "curl",
    desc: "Ein Tool zur Übertragung von Daten über URLs.",
    example: "curl https://example.com"
  },
  {
    name: "grep",
    desc: "Sucht nach Textmustern in Dateien.",
    example: "grep 'Fehler' /var/log/syslog"
  },
  {
    name: "wireshark",
    desc: "Ein Netzwerk-Analyse-Tool zum Mitschneiden von Paketen.",
    example: "Starte die grafische Oberfläche oder nutze tshark im Terminal"
  },
  {
    name: "netstat",
    desc: "Zeigt Netzwerkverbindungen und offene Ports.",
    example: "netstat -tuln"
  },
  {
    name: "htop",
    desc: "Ein interaktiver Prozessmonitor für das Terminal.",
    example: "htop"
  },
  {
    name: "nc (netcat)",
    desc: "Ein vielseitiges Tool für Netzwerkverbindungen und Scans.",
    example: "nc -lvp 4444"
  },
  {
    name: "dig",
    desc: "DNS-Tool zum Nachschlagen von Domain-Infos.",
    example: "dig example.com"
  },
  {
    name: "ssh",
    desc: "Verbindung zu entfernten Servern über das Terminal.",
    example: "ssh user@192.168.1.100"
  }
];

function getToolOfTheDay() {
  const today = new Date();
  const index = today.getDate() % tools.length;
  return tools[index];
}

const tool = getToolOfTheDay();
document.getElementById("toolName").innerText = tool.name;
document.getElementById("toolDesc").innerText = tool.desc;
document.getElementById("toolExample").innerText = tool.example;
