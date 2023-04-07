from flask import Blueprint, jsonify, session, request
from app.models import  db, Image, User, Follower
from flask_login import current_user
from datetime import datetime

from app.forms.follower_form import FollowForm

followers_routes = Blueprint('follower', __name__)



@followers_routes.route("/user/<int:id>")
def LikesPage(id):
    """ "get users follows"""

    User_Follows = Follower.query.filter(Follower.follower_id == id).all()
    return [follow.to_dict() for follow in User_Follows]

@followers_routes.route('/')
def get_follows():
    follows = Follower.query.all()
    return {'follows': [follow.to_dict() for follow in follows]}
    # return {"hello": "hi"}


# create follow
@followers_routes.route('/', methods=['POST'])
def create_follow():

    form = FollowForm()
    if current_user.is_authenticated:
        user = current_user.to_dict()
        follower_id = user['id']
        print('user id',user['id'])
        form['csrf_token'].data = request.cookies['csrf_token']

        print('form data',form.data)
        if form.validate_on_submit():
            follow = Follower(
            following_id=(form.data["following_id"]),
            follower_id=(follower_id)
            )
            db.session.add(follow)
            db.session.commit()
            return follow.to_dict()

        return {'errors': form.errors}, 401
    return {'errors': 'Unauthorized'}, 403


# delete follow
@followers_routes.route('/<int:id>', methods=['DELETE'])
def delete_follow(id):

    if current_user.is_authenticated:
        follow = Follower.query.get(id)
        db.session.delete(follow)
        db.session.commit()
        return {'message': 'Follow deleted'}
    return {'errors': 'Unauthorized'}, 403


# @followers_routes.route("/image/<int:id>")
# def ProductComments(id):

#     image_likes = db.paginate(Like.query.filter(id == Like.image_id))
#     print("The likes", image_likes)
#     return [follow.to_dict() for follow in image_likes]
