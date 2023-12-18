from flask import Blueprint, jsonify, session, request
from app.models import Comment, db, User
from flask_login import current_user
from datetime import datetime

from app.forms.new_comment_form import NewCommentForm
from app.forms.update_comment_form import UpdateCommentForm

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/user/<int:id>")
def CommentsPage(id):
    """ "get users comments"""

    User_Reviews = Comment.query.filter(Comment.user_id == id).all()
    return [review.to_dict() for review in User_Reviews]


@comment_routes.route("/")
def Comments():
    """get all comments"""
    all_reviews = Comment.query.all()
    return [review.to_dict() for review in all_reviews]


@comment_routes.route("/image/<int:id>")
def ProductComments(id):
    """get a images comments"""

    image_comments = db.paginate(Comment.query.filter(id == Comment.image_id))
    print("The comments", image_comments)
    return [image.to_dict() for image in image_comments]


@comment_routes.route("/new", methods=["POST"])
def leave_Comment():
    """create a new comment"""

    form = NewCommentForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        user_id = user["id"]
        print("Authenticated!")
        form["csrf_token"].data = request.cookies["csrf_token"]
        print("-----------", form.data)
        if form.validate_on_submit():
            # print("Form Validated")
            comment = Comment(
                user_id=user_id,
                image_id=form.data["image_id"],
                comment=form.data["comment"],
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        return {"errors": form.errors}, 401
    return {"errors": "Unauthorized"}, 403


@comment_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def Route(id):

    """Edit and delete a comment"""

    if request.method == "PUT":
        comment_to_update = Comment.query.get(id)
        form = UpdateCommentForm()
        if current_user.is_authenticated:
            user = current_user.to_dict()
            form["csrf_token"].data = request.cookies["csrf_token"]

            if form.validate_on_submit():
                comment_to_update.comment = form.data["comment"]
                comment_to_update.updated_at = datetime.utcnow()
                db.session.add(comment_to_update)
                db.session.commit()
                return comment_to_update.to_dict()
            return {"errors": form.errors}, 401
        return {"errors": "Unauthorized"}, 403

    if request.method == "DELETE":
        print("Method DELETE")
        if current_user.is_authenticated:
            user = current_user.to_dict()
            comment_to_delete = Comment.query.get(id)
            comment_data = comment_to_delete.to_dict()
            print(comment_data)
            db.session.delete(comment_to_delete)
            db.session.commit()
            return {"message": "Review deleted"}
        return {"errors": "Unauthorized"}, 403

    if request.method == "GET":
        comment = Comment.query.get(id)
        return comment.to_dict()
