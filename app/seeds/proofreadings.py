from app.models import db, Proofreading
# from app.models.order import LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_proofreadings():
    proofreading = Proofreading(document_url='asdfjklasd', order_id=4)

    db.session.add(proofreading)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_proofreadings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
