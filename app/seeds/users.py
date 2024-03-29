from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    # Adding the demo user
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    db.session.add(demo)

    # Adding 50 random users
    for _ in range(50):
        username = fake.user_name() + str(fake.random_int(min=1, max=1000))
        email = fake.email()
        password = fake.password()

        user = User(
            username=username,
            email=email,
            password=password
        )
        db.session.add(user)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
