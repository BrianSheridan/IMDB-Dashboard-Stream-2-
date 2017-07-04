from flask import Flask 
from flask import render_template 
from pymongo import MongoClient
import json
import os

app = Flask (__name__)

#MONGODB_HOST = 'localhost'
#ONGODB_PORT = 27017
#DBS_NAME = 'Movie'
#COLLECTION_NAME ='projects'

MONGODB_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get('MONGO_DB_NAME','Movie')
COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME', 'projects')

@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")



@app.route("/data")
def donor_projects():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format. 
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'genres': True, 'content_rating': True,
        'budget': True, 'title_year': True, 'imdb_score': True,
        'gross': True,
    }
 
    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        IMDB = collection.find(projection=FIELDS)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(IMDB))

if __name__ =="__main__":
 app.run(debug=True)
