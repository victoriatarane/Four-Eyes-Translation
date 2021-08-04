from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import ValidationError, DataRequired
from app.models import Copywriting


class NewCopywritingForm(FlaskForm):
    # user_id = StringField('user_id', validators=[DataRequired()])
    field = StringField('field', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    key_words = StringField('key_words', validators=[DataRequired()])
    links = StringField('links')
    word_count = StringField('word_count', validators=[DataRequired()])
    language = StringField('language', validators=[DataRequired()])
    # created_at = StringField('created_at', validators=[DataRequired()])
