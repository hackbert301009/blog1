from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

# OpenAI API-Key aus Umgebungsvariable lesen
openai.api_key = os.getenv("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")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"reply": "Keine Nachricht erhalten."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": message}]
        )
        reply = response.choices[0].message['content']
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": f"Fehler bei OpenAI: {str(e)}"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)



