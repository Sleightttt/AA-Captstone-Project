from app.models import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from random import randint


class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    liker_id = db.Column(db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_id = db.Column(
        db.ForeignKey(add_prefix_for_prod("images.id")), nullable=False
    )

    image = db.relationship("Image", back_populates="likes")


    def to_dict(self):
        return {
            "id": self.id,
            "liker_id": self.liker_id,
            "image_id": self.image_id,
        }
