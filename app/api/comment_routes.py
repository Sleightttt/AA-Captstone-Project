from flask import Blueprint, jsonify, session, request
from app.models import Comment, db, User
from flask_login import current_user
from datetime import datetime

# from app.forms.new_review_form import NewReviewForm
# from app.forms.update_review_form import UpdateReviewForm

comment_routes = Blueprint("comment", __name__)


# @comment_routes.route("/user/<int:id>")
# def CommentsPage(id):
#     """ "get users reviews"""

#     User_Reviews = Comment.query.filter(Comment.user_id == id).all()
#     return [review.to_dict() for review in User_Reviews]


@comment_routes.route("/")
def Comments():
    all_reviews = Comment.query.all()
    return [review.to_dict() for review in all_reviews]
