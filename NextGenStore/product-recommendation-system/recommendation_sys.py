# Importing necessary libraries
import json
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# Reading the dataset from a CSV file
df = pd.read_csv('./prods.csv')

# Function to recommend products based on a given product name
def recommend(name):
    # Assigning a unique ID to each product
    df['product_id'] = range(0, len(df))

    # Define columns that are important for the recommendation
    columns = ['name', 'desc', 'price', 'qty']

    # Check for any null values in the important columns
    if df[columns].isnull().values.any():
        raise ValueError("Null values found in the data")

    # Function to combine values of important columns into a single string
    def get_important_features(data):
        important_features = []
        for i in range(0, data.shape[0]):
            important_features.append(f"{data['name'][i]} {data['desc'][i]} {data['price'][i]} {data['qty'][i]}")
        return important_features

    # Adding a column in the DataFrame for the combined features
    df['important_features'] = get_important_features(df)

    # Convert the text to a matrix of token counts
    cm = CountVectorizer().fit_transform(df['important_features'])

    # Compute the cosine similarity matrix from the count matrix
    cs = cosine_similarity(cm)

    # Find the product ID for the given product name
    product_id = df[df.name == name]['product_id'].values[0]

    # Create a list of enumerations for the similarity scores
    scores = list(enumerate(cs[product_id]))
    # Sort the scores in descending order, excluding the first element (self-comparison)
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:]

    # Printing the top 3 recommended products
    print(f"The top 3 products recommended for '{name}' are:")
    recommended_products = []
    for idx, (prod_id, score) in enumerate(sorted_scores):
        if idx >= 3:  # Limiting to top 3 recommendations
            break
        product_title = df[df.product_id == prod_id]['name'].values[0]
        recommended_products.append(product_title)
        print(f"{idx + 1}: {product_title}")

    return recommended_products

# Example usage of the function:
# recommended_products = recommend("Example Product Name")
