import torch
import torch.nn as nn

class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        # First linear layer
        self.l1 = nn.Linear(input_size, hidden_size)  
        
        # Second linear layer
        self.l2 = nn.Linear(hidden_size, hidden_size)  
        
        # Third linear layer
        self.l3 = nn.Linear(hidden_size, num_classes) 
        
        # Activation function
        self.relu = nn.ReLU()
    
    def forward(self, x):
        # Forward pass through the first layer and ReLU
        out = self.l1(x)
        out = self.relu(out)
        
        # Forward pass through the second layer and ReLU
        out = self.l2(out)
        out = self.relu(out)
        
        # Forward pass through the third layer
        out = self.l3(out)
        
        # Note: No activation function (like Softmax) is applied at the end
        return out