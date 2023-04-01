from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


def seed_likes():
    for i in range(1):
        like = Like(
            liker_id=randint(1, 3),
            image_id=randint(1, 3),
        )
        db.session.add(like)
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
