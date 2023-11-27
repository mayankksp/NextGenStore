from flask import Flask, jsonify
from flask_cors import CORS
import chat
import nltk

# Download the 'punkt' tokenizer for the chat module
nltk.download('punkt')

# Initialize the Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Set the CORS headers to allow Content-Type
app.config["CORS_HEADERS"] = "Content-Type"

# Define the port number for the server
port = 5050

# Define the home route
@app.route("/")
def home():
    # Return a welcome message in JSON format
    return jsonify({"message": "Welcome to the AI chatbot home."})

# Define the message route with POST method
@app.route("/message/<string:msg>", methods=["POST"])
def post(msg):
    # Check if the message is empty
    if not msg or msg.isspace():
        return jsonify({"error": "Message is empty."}), 400

    try:
        # Handle messages starting with '?' differently
        if msg.startswith("?"):
            return jsonify({"message": "I'm not sure how to respond to that question."}), 200

        # Process the message using the chat module
        response = chat.main(msg)
        print(f"Response: {response} to {msg}")

        # Return the response in JSON format
        return jsonify({"message": response}), 200
    except Exception as e:
        # Print and return the error if something goes wrong
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing the message."}), 500

# Run the Flask app on the specified port
app.run(port=port)