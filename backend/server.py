from flask import Flask, request, jsonify
from llm_engine import generate_text

app = Flask(__name__)

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')
    result = generate_text(prompt)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5000)
