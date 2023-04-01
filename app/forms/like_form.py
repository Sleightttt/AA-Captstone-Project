from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from app.models import Image

class LikeForm(FlaskForm):
    image_id = StringField('image_id' )
    liker_id = StringField('liker_id' )
