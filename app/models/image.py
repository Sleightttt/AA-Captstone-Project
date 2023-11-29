from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .like import Like
from .comment import Comment
from sqlalchemy.ext.hybrid import hybrid_property


class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False, unique=True)
    url = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float(), nullable=False)
    lng = db.Column(db.Float(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    owner_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


    comments = db.relationship("Comment", back_populates="image", cascade='all, delete')


    likes = db.relationship("Like", back_populates="image", cascade='all, delete')

    @hybrid_property
    def likes_count(self):
        return len(self.likes)

    @likes_count.expression
    def likes_count(cls):
        return (
            db.select([func.count(Like.id)])
            .where(Like.image_id == cls.id)
            .label("likes_count")
        )

    @hybrid_property
    def comments_count(self):
        return len(self.comments)

    @comments_count.expression
    def comments_count(cls):
        return (
            db.select([func.count(Comment.id)])
            .where(Comment.image_id == cls.id)
            .label("comments_count")
        )



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'lat': self.lat,
            'lng': self.lng,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'url': self.url,
            'owner_id': self.owner_id,
            'likes_count': self.likes_count,
            'comments_count': self.comments_count
        }
