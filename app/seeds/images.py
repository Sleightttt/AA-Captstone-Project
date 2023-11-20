from app.models import db, Image, environment, SCHEMA, User
from sqlalchemy.sql import text
from datetime import datetime
from random import randint
from app.imgtest import imgList
from faker import Faker

fake = Faker()

# Adds a demo products
def seed_images():
    users = User.query.all()
    for i in range(60):
        fake_text = fake.text(max_nb_chars=20)

        name = fake_text[:-1] if fake_text.endswith('.') else fake_text

        image = Image(
            name=name,
            description=f"This is the description for Image {i + 1}",
            lat=round(randint(1, 300) / 100, 2),
            lng=round(randint(1, 300) / 100, 2),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            owner_id=users[randint(1, len(users) - 1)].id,
            url=f"{imgList[randint(1, len(imgList) - 1)]}"
        )
        db.session.add(image)

    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
