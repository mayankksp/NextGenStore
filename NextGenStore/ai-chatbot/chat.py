import random
import json
import torch
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

# Check if CUDA is available for PyTorch, else use CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load intents data from a JSON file
with open('intents.json', 'r') as json_data:
    intents = json.load(json_data)

# Load saved model data
FILE = "data.pth"
data = torch.load(FILE)

# Extracting necessary data from the loaded model
input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

# Initialize and load the neural network model
model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

def main(sentence):
    # Set a name for the chatbot
    bot_name = "CartMate"
    print("Let's chat! (type 'quit' to exit)")

    # Check if the user wants to quit
    if sentence == "quit":
        return

    # Tokenizing and preprocessing the input sentence
    sentence = tokenize(sentence)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    # Passing the processed input to the model
    output = model(X)
    _, predicted = torch.max(output, dim=1)

    # Determine the tag of the response
    tag = tags[predicted.item()]

    # Calculate the probability of the prediction
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    # Choose an appropriate response if confidence is high
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    else:
        return "I do not understand."

if __name__ == '__chat__':
    main()
