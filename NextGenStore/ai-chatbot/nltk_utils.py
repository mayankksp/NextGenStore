import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer

# Initialize the Porter Stemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    """
    Split sentence into an array of words/tokens.
    A token can be a word, punctuation character, or number.

    Parameters:
    sentence (str): The sentence to tokenize.

    Returns:
    list: A list of tokens extracted from the sentence.
    """
    return nltk.word_tokenize(sentence)


def stem(word):
    """
    Find the root form of a word (stemming).

    Parameters:
    word (str): The word to stem.

    Returns:
    str: The stemmed version of the word.

    Examples:
    words = ["organize", "organizes", "organizing"]
    words = [stem(w) for w in words]
    -> ["organ", "organ", "organ"]
    """
    return stemmer.stem(word.lower())


def bag_of_words(tokenized_sentence, words):
    """
    Create a bag-of-words vector.

    Parameters:
    tokenized_sentence (list): A list of tokens (words) from the sentence.
    words (list): A list of all known words.

    Returns:
    numpy.ndarray: A bag-of-words array, with 1 for each known word that 
                   exists in the sentence, 0 otherwise.

    Example:
    sentence = ["hello", "how", "are", "you"]
    words = ["hi", "hello", "I", "you", "bye", "thank", "cool"]
    bag = [0, 1, 0, 1, 0, 0, 0]
    """
    # Stem each word in the sentence
    sentence_words = [stem(word) for word in tokenized_sentence]
    # Initialize bag with 0 for each known word
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag