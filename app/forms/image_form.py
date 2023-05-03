from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from app.models import Image
from app.routes.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    id = StringField('id')
    url = FileField('url', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
    lat = DecimalField('lat', validators=[DataRequired()])
    lng = DecimalField('lng', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
