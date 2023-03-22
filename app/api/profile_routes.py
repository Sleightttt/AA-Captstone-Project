from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.models import Image

profile_routes = Blueprint('profile', __name__)
