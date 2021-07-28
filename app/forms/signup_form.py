from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def vat_number_exists(form, field):
    # Checking if username is already in use
    vat_number = field.data
    user = User.query.filter(User.vat_number == vat_number).first()
    if user:
        raise ValidationError('VAT number is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    vat_number = StringField('vat_number', validators=[vat_number_exists])
    translator = BooleanField('translator')
    password = StringField('password', validators=[DataRequired()])
    created_at = StringField('created_at')
