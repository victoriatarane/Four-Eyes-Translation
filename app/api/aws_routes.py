from flask import Blueprint, request
from app.models import db, Translation, Proofreading
from flask_login import current_user, login_required
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

file_routes = Blueprint("files", __name__)


@file_routes.route("", methods=["POST"])
@login_required
def upload_file():
    if "file" not in request.files:
        return {"errors": "file required"}, 400

    file = request.files["file"]

    if not allowed_file(file.filename):
        return {"errors": "file type not permitted"}, 400

    file.filename = get_unique_filename(file.filename)

    upload = upload_file_to_s3(file)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_file = db.Translation.document_url(user=current_user, url=url)
    db.session.add(new_file)
    db.session.commit()
    return {"url": url}
