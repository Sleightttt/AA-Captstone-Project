from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint


def seed_comments():
    for i in range(34):
        comment = Comment(
            user_id=randint(1, 3),
            image_id=randint(1, 3),
            comment=f"this is comment # {i}",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
