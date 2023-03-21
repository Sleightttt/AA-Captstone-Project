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

    # images = db.relationship('Image', back_populates='product')
    # shopping_cart = db.relationship("ShoppingCart", back_populates='products')
    # orders = db.relationship("Order", back_populates='products')
    comments = db.relationship("Comment", back_populates="image")

    # def avg_rating(self):
    #     if len(self.reviews) == 0:
    #         return 0
    #     return sum(review.stars for review in self.reviews) / len(self.reviews)

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
            # 'images': [image.to_dict() for image in self.images],
            'owner_id': self.owner_id,

            # 'avg_rating':self.avg_rating(),
            # 'num_comments':len(self.comments)
        }
