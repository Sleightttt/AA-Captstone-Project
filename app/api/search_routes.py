from flask import Blueprint, jsonify, session, request
from app.models import  db, Image, User
from app.forms.image_form import ImageForm
from app.forms.image_update_form import ImageForm2
from flask_login import current_user
from datetime import datetime
from sqlalchemy import func
from app.routes.aws_helpers import upload_file_to_s3, get_unique_filename

search_routes = Blueprint('search', __name__)
# Get all images /api/image/
@search_routes.route('/<string:search>', methods=['GET'])
def get_images_search(search):
    query = f"%{search.lower()}%" # convert the search query to lowercase
    images = Image.query.filter(
        (Image.name.ilike(query)) | (Image.description.ilike(query))
    ).all()

    return {'images': [image.to_dict() for image in images]}
