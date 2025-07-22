
from pyscript import display, Element
from js import document

points = 0
player_name = ""

def update_output(text):
    Element("output").element.innerHTML += f"<br>{text}"

def clear_output():
    Element("output").element.innerHTML = ""

def welcome():
    clear_output()
    update_output("🧠 Willkommen zu HACKER QUEST")
    update_output("👤 Wie heißt du, Hacker?")
    Element("name_input").element.style.display = "block"
    Element("start_button").element.style.display = "block"

def start_game(*args):
    global player_name
    player_name = Element("name_input").element.value.strip() or "Hacker"
    Element("name_input").element.style.display = "none"
    Element("start_button").element.style.display = "none"
    update_output(f"👋 Willkommen, {player_name}. Dein erstes Ziel: Zugriff auf das Netzwerk von GigaCorp.")
    main_mission()

def main_mission():
    clear_output()
    update_output("🔐 Du bist im Terminal. Was willst du tun?")
    actions = [
        ("nmap 192.168.1.1", option_1),
        ("ssh root@192.168.1.1", option_2),
        ("exit", option_3),
        ("Einfach mal abwarten und relaxen", option_4),
        ("Was war nochmal nmap?", option_5),
        ("Was bedeutet ssh root?", option_6),
    ]
    for label, func in actions:
        btn = document.createElement("button")
        btn.innerText = label
        btn.className = "option-button"
        btn.onclick = func
        document.getElementById("output").appendChild(btn)
        document.getElementById("output").appendChild(document.createElement("br"))

def option_1(evt=None):
    global points
    update_output("📡 Ports gefunden: 22 (ssh), 80 (http)")
    points += 1
    main_mission()

def option_2(evt=None):
    update_output("🔑 Zugriff verweigert. Versuch ein Passwort zu erraten.")
    password_guess()

def option_3(evt=None):
    update_output("🛑 Mission abgebrochen.")
    exit_screen()

def option_4(evt=None):
    update_output("👮 Der Sicherheitsdienst hat dich gefunden – aber ihr trinkt ein Bier zusammen. Spiel beendet.")
    exit_screen()

def option_5(evt=None):
    global points
    update_output("📖 Nmap ist ein Tool zum Scannen und Analysieren von Netzwerken...")
    points += 1
    main_mission()

def option_6(evt=None):
    global points
    update_output("📖 SSH steht für Secure Shell – ein Protokoll für sicheren Fernzugriff mit Admin-Rechten.")
    points += 1
    main_mission()

def password_guess():
    clear_output()
    update_output("🔐 Gib das Passwort ein (Tipp: 'letmein'):")
    Element("password_input").element.style.display = "block"
    Element("check_password_button").element.style.display = "block"

def check_password(*args):
    global points
    guess = Element("password_input").element.value or ""
    Element("password_input").element.style.display = "none"
    Element("check_password_button").element.style.display = "none"
    if guess.lower() == "letmein":
        update_output("✅ Zugriff gewährt. Mega gut! Du hast es geschafft.")
        points += 5
    else:
        update_output("❌ Falsches Passwort.")
        points -= 2
    exit_screen()

def exit_screen():
    clear_output()
    update_output(f"🏁 Spiel beendet! Du hast insgesamt {points} Punkte.")
