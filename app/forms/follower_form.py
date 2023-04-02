from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from app.models import Image

class FollowForm(FlaskForm):
    id = StringField('id')

    follower_id = StringField('follower_id', validators=[DataRequired()])
    following_id = StringField('following_id', validators=[DataRequired()])
