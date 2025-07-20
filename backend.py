from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

# OpenAI-API-Key aus Umgebungsvariable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"reply": "Keine Nachricht erhalten."})
    
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )
        return jsonify({"reply": completion.choices[0].message.content})
    except Exception as e:
        return jsonify({"reply": f"Fehler bei OpenAI: {str(e)}"})
    
# Port für Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render setzt automatisch PORT
    app.run(host="0.0.0.0", port=port)
