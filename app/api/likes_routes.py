from flask import Blueprint, jsonify, session, request
from app.models import  db, Image, User, Like
from flask_login import current_user
from datetime import datetime

from app.forms.like_form import LikeForm

likes_routes = Blueprint('likes', __name__)



@likes_routes.route("/user/<int:id>")
def LikesPage(id):
    """ "get users comments"""

    User_Likes = Like.query.filter(Like.liker_id == id).all()
    return [like.to_dict() for like in User_Likes]

@likes_routes.route('/')
def get_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}
    # return {"hello": "hi"}

@likes_routes.route('/', methods=['POST'])
def create_like():

    form = LikeForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        liker_id = user['id']
        print('user id',user['id'])
        form['csrf_token'].data = request.cookies['csrf_token']

        print('form data',form.data)
        if form.validate_on_submit():
            like = Like(
            image_id=(form.data["image_id"]),
            liker_id=(liker_id)
            )
            db.session.add(like)
            db.session.commit()
            return like.to_dict()

        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403

@likes_routes.route('/<int:id>', methods=['DELETE'])
def delete_like(id):

    if current_user.is_authenticated:
        like = Like.query.get(id)
        db.session.delete(like)
        db.session.commit()
        return {'message': 'Like deleted'}
    return {'errors': 'Unauthorized'}, 403


@likes_routes.route("/image/<int:id>")
def ProductComments(id):

    image_likes = db.paginate(Like.query.filter(id == Like.image_id))
    print("The likes", image_likes)
    return [like.to_dict() for like in image_likes]
