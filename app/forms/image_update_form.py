from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from app.models import Image
from app.routes.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm2(FlaskForm):
    id = StringField('id')
    url = StringField('url', validators=[DataRequired()])
    lat = DecimalField('lat', validators=[DataRequired()])
    lng = DecimalField('lng', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
