from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # ← Das erlaubt alle Domains

openai.api_key = os.getenv("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")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({'reply': "Keine Nachricht empfangen."})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}]
        )
        bot_reply = response['choices'][0]['message']['content']
        return jsonify({'reply': bot_reply})
    except Exception as e:
        return jsonify({'reply': f"Fehler beim Kontakt mit OpenAI: {str(e)}"})
