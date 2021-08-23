from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import NewProofreadingForm
from app.models import db, Proofreading, Order
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


proofreading_routes = Blueprint('proofreadings', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get proofreading by ID
@proofreading_routes.route('/<int:proofreading_id>', methods=['GET'])
def get_proofreading(proofreading_id):
    proofreading = Proofreading.query.get(proofreading_id)
    return proofreading.to_dict()

# Get proofreadings by userID
@proofreading_routes.route('/', methods=['GET'])
# @proofreading_routes.route('/all/:user_id', methods=['GET'])
def get_all_proofreadings():
    # print('UserId from get proofreading api route---------------------------------', user_id)
    orders = current_user.orders
    # proofreading_orders = list(filter(lambda order: order.proofreading, orders))
    # print('proofreadingS from api get all------------', proofreadings)
    return {"proofreadings": [order.proofreadings.to_dict() for order in orders if order.proofreadings]}

#Crate a new proofreading


@proofreading_routes.route('/create', methods=['POST'])
@login_required
def create_proofreading():
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
    form = NewProofreadingForm(request.form)
    form['document_url'].data = document_url
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user
        order = Order(user_id=user.id)
        db.session.add(order)
        db.session.commit()
        proofreading = Proofreading(
            order_id=order.id,
            document_url=form.document_url.data,
            field=form.field.data,
            word_count=form.word_count.data,
            language=form.language.data)
        db.session.add(proofreading)
        db.session.commit()
        # print(proofreading, '######')
        return proofreading.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# write a route to update a proofreading
@proofreading_routes.route('/<int:proofreading_id>', methods=['PUT'])
def update_proofreading(proofreading_id):
    proofreading = Proofreading.query.get(proofreading_id)
    if proofreading is None:
        return {'message': 'No proofreading found'}, 404
    data = request.get_json()
    # proofreading.user_id = data["user_id"],
    # proofreading.document_url = data["document_url"],
    proofreading.field = data["field"],
    proofreading.word_count = data["word_count"],
    proofreading.language = data["language"]
    db.session.commit()
    return proofreading.to_dict()


# Remove proofreading
@proofreading_routes.route('/<int:proofreading_id>', methods=['DELETE'])
def delete_proofreading(proofreading_id):
    proofreading = Proofreading.query.get(proofreading_id)
    order = Order.query.get(proofreading.order_id)
    db.session.delete(proofreading)
    db.session.delete(order)
    db.session.commit()
    return {'message': 'proofreading removed'}
