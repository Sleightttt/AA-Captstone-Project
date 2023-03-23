from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Comment


class NewCommentForm(FlaskForm):
    user_id = IntegerField("user", validators=[DataRequired()])
    image_id = IntegerField("product", validators=[DataRequired()])
    comment = StringField("comment", validators=[DataRequired()])
