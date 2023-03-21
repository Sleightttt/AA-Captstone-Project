from app.models import db, Image, environment, SCHEMA, User
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


# Adds a demo products
def seed_images():
    users = User.query.all()
    for i in range(20):
        image = Image(
            name=f"Image {i+1}",
            description=f"This is the description for Image {i+1}",
            lat=round(randint(1, 300) / 100, 2),
            lng=round(randint(1, 300) / 100, 2),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            owner_id=users[randint(1, len(users)-1)].id,
            url=f"This is the url for Image {i+1}"
        )
        db.session.add(image)

    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
