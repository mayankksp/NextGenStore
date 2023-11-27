from werkzeug.routing import BaseConverter
from json import JSONEncoder
from bson import ObjectId
import isodate as iso
from datetime import datetime, date

# Custom JSON encoder for handling MongoDB specific data types
class MongoJSONEncoder(JSONEncoder):
    def default(self, o):
        # Handling datetime and date objects, converting them to ISO format
        if isinstance(o, (datetime, date)):
            return iso.datetime_isoformat(o)
        
        # Handling ObjectId objects, converting them to string
        if isinstance(o, ObjectId):
            return str(o)
        
        # Default handling for other types
        return super().default(o)

# Custom converter for handling ObjectId in URL routing with Werkzeug
class ObjectIdConverter(BaseConverter):
    def to_python(self, value):
        # Converts the string representation of ObjectId back to ObjectId
        return ObjectId(value)

    def to_url(self, value):
        # Converts ObjectId to string for URL representation
        return str(value)