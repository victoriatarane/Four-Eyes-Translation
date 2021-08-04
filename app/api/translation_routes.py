from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.forms import NewTranslationForm
from app.models import db, Translation


translation_routes = Blueprint('translations', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get translation by ID
@translation_routes.route('/<int:translation_id>', methods=['GET'])
def get_translation(translation_id):
    translation = Translation.query.get(translation_id)
    return translation.to_dict()

# Get translations by userID
@translation_routes.route('/all', methods=['GET'])
# @translation_routes.route('/all/:user_id', methods=['GET'])
def get_all_translations():
    # print('UserId from get translation api route---------------------------------', user_id)
    orders = current_user.orders
    # translation_orders = list(filter(lambda order: order.translation, orders))
    # print('translationS from api get all------------', translations)
    return {"translations": [order.translation.to_dict() for order in orders if order.translation]}

#Crate a new translation
@translation_routes.route('/create', methods=['POST'])
def create_translation():
    form = NewTranslationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        translation = Translation(
            # user_id=form.user_id.data,
            document_url=form.document_url,
            field=form.field.data,
            word_count=form.word_count.data,
            source_language=form.source_language.data,
            target_language=form.target_language.data)
        db.session.add(translation)
        db.session.commit()
        return translation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# write a route to update a translation
@translation_routes.route('/<int:translation_id>', methods=['PUT'])
def update_translation(translation_id):
    translation = Translation.query.get(translation_id)
    if translation is None:
        return {'message': 'No translation found'}, 404
    data = request.get_json()
    translation.user_id = data["user_id"],
    translation.document_url = data["document_url"],
    translation.field = data["field"],
    translation.word_count = data["word_count"],
    translation.source_language = data["source_language"],
    translation.target_language = data["target_language"]
    db.session.commit()
    return translation.to_dict()


# Remove translation
@translation_routes.route('/<int:translation_id>', methods=['DELETE'])
def delete_translation(translation_id):
    translation = Translation.query.get(translation_id)
    db.session.delete(translation)
    db.session.commit()
    return {'message': 'translation removed'}
