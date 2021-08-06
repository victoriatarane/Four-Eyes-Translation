from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import NewCopywritingForm
from app.models import db, Copywriting, Order


copywriting_routes = Blueprint('copywritings', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get Copywriting by ID
@copywriting_routes.route('/<int:copywriting_id>', methods=['GET'])
def get_copywriting(copywriting_id):
    copywriting = Copywriting.query.get(copywriting_id)
    return copywriting.to_dict()

# Get Copy by userID
@copywriting_routes.route('/', methods=['GET'])
# @copywriting_routes.route('/all/:user_id', methods=['GET'])
def get_all_copywritings():
    orders = current_user.orders
    # print('UserId from get Copywriting api route---------------------------------', user_id)
    # copywritings = Copywriting.query.filter(Copywriting.user_id == user_id).all()
    # print('CopywritingS from api get all------------', copywritings)
    return {"copywritings": [order.copywritings.to_dict() for order in orders if orders.copywritings]}

#Crate a new Copywriting


@copywriting_routes.route('/create', methods=['POST'])
@login_required
def create_copywriting():
    form = NewCopywritingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        user = current_user
        order = Order(user_id=user.id)
        db.session.add(order)
        db.session.commit()
        copywriting = Copywriting(
            # user_id=form.user_id.data,
            order_id=order.id,
            description=form.description.data,
            key_words=form.key_words.data,
            links=form.links.data,
            field=form.field.data,
            word_count=form.word_count.data,
            language=form.language.data)
        db.session.add(copywriting)
        db.session.commit()
        print(copywriting, '######')
        return copywriting.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# write a route to update a Copywriting
@copywriting_routes.route('/<int:copywriting_id>', methods=['PUT'])
def update_copywriting(copywriting_id):
    copywriting = Copywriting.query.get(copywriting_id)
    if Copywriting is None:
        return {'message': 'No Copywriting found'}, 404
    data = request.get_json()
    # copywriting.user_id = data["user_id"],
    copywriting.description = data["description"],
    copywriting.key_words = data["key_words"],
    copywriting.links = data["links"],
    copywriting.field = data["field"],
    copywriting.word_count = data["word_count"],
    copywriting.language = data["language"]
    db.session.commit()
    return copywriting.to_dict()


# Remove Copywriting
@copywriting_routes.route('/<int:copywriting_id>', methods=['DELETE'])
def delete_copywriting(copywriting_id):
    copywriting = Copywriting.query.get(copywriting_id)
    db.session.delete(copywriting)
    db.session.commit()
    return {'message': 'copywriting removed'}
