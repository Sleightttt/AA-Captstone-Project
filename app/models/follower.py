from app.models import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from random import randint
from sqlalchemy.orm import relationship


class Follower(db.Model):
    __tablename__ = "followers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    follower_id = db.Column(db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    following_id = db.Column(
        db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    following_user = relationship('User', back_populates='followers', foreign_keys=[following_id])


    def to_dict(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "following_id": self.following_id,
        }
