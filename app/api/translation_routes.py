from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import NewTranslationForm
from app.models import db, Translation, Order
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


@translation_routes.route('/', methods=['GET'])
# @login_required
# @translation_routes.route('/all/:user_id', methods=['GET'])
def get_all_translations():
    # print('UserId from get translation api route---------------------------------', user_id)
    orders = current_user.orders
    print(current_user.orders, 'CURRENT USER!!!@@@@####$$$')
    # translation_orders = list(filter(lambda order: order.translation, orders))
    # print('translationS from api get all------------', translations)
    return {"translations": [order.translations.to_dict() for order in orders if order.translations]}

#Crate a new translation


@translation_routes.route('/create', methods=['POST'])
@login_required
def create_translation():
    # if request.method == 'POST':
    if "file" not in request.files:
        return {"errors": "document required"}, 400

    file = request.files["file"]

    if not allowed_file(file.filename):
        return {"errors": "file type not permitted"}, 400

    file.filename = get_unique_filename(file.filename)

    upload = upload_file_to_s3(file)

    if "document_url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    document_url = upload["document_url"]
    # flask_login allows us to get the current user from the request
    form = NewTranslationForm(request.form)
    form['document_url'].data = document_url
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user
        order = Order(user_id=user.id)
        db.session.add(order)
        db.session.commit()
        translation = Translation(
            order_id=order.id,
            document_url=form.document_url.data,
            field=form.field.data,
            word_count=form.word_count.data,
            source_language=form.source_language.data,
            target_language=form.target_language.data)
        db.session.add(translation)
        db.session.commit()
        print(translation, '######')
        return translation.to_dict()
    # if request.method == 'GET':
    #     return {'string': 'value'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# write a route to update a translation
@translation_routes.route('/<int:translation_id>', methods=['PUT'])
def update_translation(translation_id):
    translation = Translation.query.get(translation_id)
    if translation is None:
        return {'message': 'No translation found'}, 404
    data = request.get_json()
    # translation.user_id = data["user_id"],
    # translation.document_url = data["document_url"],
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
    order = Order.query.get(translation.order_id)
    db.session.delete(translation)
    print('deleting order', translation.order_id)
    db.session.delete(order)
    db.session.commit()
    return {'message': 'translation removed'}
