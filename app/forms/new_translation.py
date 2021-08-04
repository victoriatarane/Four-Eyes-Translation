from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import ValidationError, DataRequired
from app.models import Translation


class NewTranslationForm(FlaskForm):
    # user_id = StringField('user_id', validators=[DataRequired()])
    document_url = StringField('document_url', validators=[DataRequired()])
    field = StringField('field', validators=[DataRequired()])
    word_count = StringField('word_count', validators=[DataRequired()])
    source_language = StringField('source_language', validators=[DataRequired()])
    target_language = StringField('target_language', validators=[DataRequired()])
    # created_at = StringField('created_at', validators=[DataRequired()])
