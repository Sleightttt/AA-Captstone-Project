from flask_wtf import FlaskForm
from wtforms.fields import StringField
from wtforms.validators import DataRequired
from app.models import Comment


class UpdateCommentForm(FlaskForm):
    comment = StringField("comment", validators=[DataRequired()])
