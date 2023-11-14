from .db import db, environment, SCHEMA, add_prefix_for_prod


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
        }
