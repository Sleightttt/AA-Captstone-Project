from app.models import db, Comment, environment, SCHEMA, User, Image
from sqlalchemy.sql import text
from datetime import datetime
from random import randint
from faker import Faker

fake = Faker()


def seed_comments():
    users = User.query.all()
    images = Image.query.all()
    for i in range(122):
        comment = Comment(
            user_id=randint(1, len(users) - 1),
            image_id=randint(1, len(images) - 1),
            comment=f"{fake.sentence(nb_words=10, variable_nb_words=True, ext_word_list=None)}",
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
