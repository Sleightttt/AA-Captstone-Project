from app.models import db, Follower, environment, SCHEMA, User
from sqlalchemy.sql import text
from random import randint
import random


def seed_followers():
    users = User.query.all()

    for user in users:
        num_followers = randint(0, len(users) - 1)
        potential_followers = [u for u in users if u != user]

        followers = random.sample(potential_followers, num_followers)

        for follower in followers:
            # Check for self-following and duplicates
            if follower != user and follower not in user.followers:
                # Create a Follower instance
                new_follower = Follower(follower_id=follower.id, following_id=user.id)
                db.session.add(new_follower)

    db.session.commit()


def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()
