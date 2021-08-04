from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.forms import NewProofreadingForm
from app.models import db, Proofreading


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
@proofreading_routes.route('/all', methods=['GET'])
# @proofreading_routes.route('/all/:user_id', methods=['GET'])
def get_all_proofreadings():
    # print('UserId from get proofreading api route---------------------------------', user_id)
    orders = current_user.orders
    # proofreading_orders = list(filter(lambda order: order.proofreading, orders))
    # print('proofreadingS from api get all------------', proofreadings)
    return {"proofreadings": [order.proofreading.to_dict() for order in orders if order.proofreading]}

#Crate a new proofreading


@proofreading_routes.route('/create', methods=['POST'])
def create_proofreading():
    form = NewProofreadingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        proofreading = Proofreading(
            # user_id=form.user_id.data,
            document_url=form.document_url,
            field=form.field.data,
            word_count=form.word_count.data,
            language=form.language.data)
        db.session.add(proofreading)
        db.session.commit()
        return proofreading.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# write a route to update a proofreading
@proofreading_routes.route('/<int:proofreading_id>', methods=['PUT'])
def update_proofreading(proofreading_id):
    proofreading = Proofreading.query.get(proofreading_id)
    if proofreading is None:
        return {'message': 'No proofreading found'}, 404
    data = request.get_json()
    proofreading.user_id = data["user_id"],
    proofreading.document_url = data["document_url"],
    proofreading.field = data["field"],
    proofreading.word_count = data["word_count"],
    proofreading.language = data["language"]
    db.session.commit()
    return proofreading.to_dict()


# Remove proofreading
@proofreading_routes.route('/<int:proofreading_id>', methods=['DELETE'])
def delete_proofreading(proofreading_id):
    proofreading = Proofreading.query.get(proofreading_id)
    db.session.delete(proofreading)
    db.session.commit()
    return {'message': 'proofreading removed'}
