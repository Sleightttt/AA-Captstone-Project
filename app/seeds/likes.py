from app.models import db, Like, environment, SCHEMA, User, Image
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


def seed_likes():
    users = User.query.all()
    images = Image.query.all()

    # Keep track of used combinations to avoid duplicates
    used_combinations = set()

    for i in range(50):
        liker_id = randint(1, len(users) -1)  # Assuming user IDs start from 1
        image_id = randint(1, len(images) -1)  # Assuming image IDs start from 1

        # Ensure the combination is unique
        while (liker_id, image_id) in used_combinations:
            liker_id = randint(1, len(users))
            image_id = randint(1, len(images))

        used_combinations.add((liker_id, image_id))

        like = Like(
            liker_id=liker_id,
            image_id=image_id,
        )
        db.session.add(like)

    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
