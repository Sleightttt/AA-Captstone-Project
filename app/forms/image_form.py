from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
    id = StringField('id')
    url = StringField('url', validators=[DataRequired()])
    lat = DecimalField('lat', validators=[DataRequired()])
    lng = DecimalField('lng', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
