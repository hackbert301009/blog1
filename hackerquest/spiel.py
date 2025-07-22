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
    name_field = Element("name_input").element
    player_name = name_field.value
    Element("name_input").element.style.display = "none"
    Element("start_button").element.style.display = "none"
    update_output(f"👋 Willkommen, {player_name}. Dein erstes Ziel: Zugriff auf das Netzwerk von GigaCorp.")
    main_mission()

def main_mission():
    clear_output()
    update_output("🔐 Du bist im Terminal. Was willst du tun?")
    options = [
        ("nmap 192.168.1.1", "option_1"),
        ("ssh root@192.168.1.1", "option_2"),
        ("exit", "option_3"),
        ("Einfach mal abwarten und relaxen", "option_4"),
        ("Was war nochmal nmap?", "option_5"),
        ("Was bedeutet ssh root?", "option_6")
    ]
    for label, opt_id in options:
        button = document.createElement("button")
        button.innerText = label
        button.className = "option-button"
        button.onclick = globals()[opt_id]
        document.getElementById("output").appendChild(button)
        document.getElementById("output").appendChild(document.createElement("br"))

def option_1(event=None):
    global points
    update_output("📡 Ports gefunden: 22 (ssh), 80 (http)")
    points += 1
    main_mission()

def option_2(event=None):
    update_output("🔑 Zugriff verweigert. Versuch ein Passwort zu erraten.")
    password_guess()

def option_3(event=None):
    update_output("🛑 Mission abgebrochen.")
    exit_screen()

def option_4(event=None):
    update_output("👮 Der Sicherheitsdienst hat dich gefunden, aber du bekommst weder Strafe noch Punkt, aber du darfst ein Bier mit ihnen trinken.")
    exit_screen()

def option_5(event=None):
    global points
    update_output("📖 Nmap ist ein Tool zum Scannen und Analysieren von Netzwerken...")
    points += 1
    main_mission()

def option_6(event=None):
    global points
    update_output("📖 ssh steht für Secure Shell – ein Protokoll für sicheren Fernzugriff mit Admin-Rechten.")
    points += 1
    main_mission()

def password_guess():
    clear_output()
    update_output("🔐 Gib das Passwort ein (Tipp: 'letmein'):")
    Element("password_input").element.style.display = "block"
    Element("check_password_button").element.style.display = "block"

def check_password(*args):
    global points
    guess = Element("password_input").element.value
    Element("password_input").element.style.display = "none"
    Element("check_password_button").element.style.display = "none"
    if guess == "letmein":
        update_output("✅ Zugriff gewährt. Mega gut!, du hast es geschafft.")
        points += 5
        exit_screen()
    else:
        update_output("❌ Falsches Passwort.")
        points -= 2
        exit_screen()

def exit_screen():
    clear_output()
    update_output(f"🏁 Spiel beendet! Du hast insgesamt {points} Punkte.")
