import json
import pandas as pd
import pymongo
from bson import json_util, ObjectId
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import db

# Initialize Flask app
app = Flask(__name__)
app.json_encoder = db.MongoJSONEncoder
app.url_map.converters['ObjectId'] = db.ObjectIdConverter
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MongoDB client setup
client = pymongo.MongoClient("mongodb://127.0.0.1:27017")

# Server port configuration
port = 6050

def fetch(id):
    """
    Fetch data from the 'orders' collection in the 'project' database
    based on a specific user id.
    """
    db = client["project"]
    col = db["orders"]

    objInstance = ObjectId(id)
    docs = col.find_one({"user": objInstance})

    data = [json.dumps(docs, indent=4, default=json_util.default)]
    return data

@app.route("/")
def home():
    """
    Home route to test if the server is working.
    """
    return jsonify({"test": "test working"})

@app.route('/recommend/<string:id>', methods=['POST'])
def post(id):
    """
    Route to handle recommendation. Fetches data based on user id,
    processes it, and returns product recommendations.
    """
    obj = fetch(id)
    docs = json.loads(obj[0])
    prods = []

    for item in docs['orderedItems']:
        for products in item['product']:
            prods.append(products)

    # Save product data to a JSON file
    with open("names.json", 'w', encoding='utf-8') as _json:
        _json.write(json.dumps(prods))

    # Convert JSON to CSV for processing
    with open('names.json', encoding='utf-8') as inputfile:
        df = pd.read_json(inputfile)
    df.to_csv('prods.csv', encoding='utf-8', index=False)

    # Load products list from JSON
    with open("./names.json", "r", encoding='utf-8') as fileObject:
        prods_list = json.loads(fileObject.read())

    names = [item['name'] for item in prods_list]

    from random import randrange as random
    import recommendation_sys as recommender

    recom = recommender.recommend(names[random(len(names))])
    final_recom = []

    for item in recom:
        for lobj in prods_list:
            if item == lobj['name']:
                final_recom.append(lobj)

    return jsonify(final_recom)

# Auto-reload templates and run the app
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(port=port)