from app.models import db, Proofreading
# from app.models.order import LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_proofreadings():
    proofreading = Proofreading(document_url='asdfjklasd', order_id=3, field='Chemistry', word_count=1123, language='Spanish', created_at='2021-08-01')

    db.session.add(proofreading)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_proofreadings():
    db.session.execute('TRUNCATE proofreadings RESTART IDENTITY CASCADE;')
    db.session.commit()
