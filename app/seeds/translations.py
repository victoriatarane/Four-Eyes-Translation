from app.models import db, Translation
# from app.models.order import LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_translations():
    translation1 = Translation(
        order_id=1, word_count=12345, document_url='Demo', source_language='German', target_language='English', field='Medicine')
    translation2 = Translation(
        order_id=2, word_count=12345, document_url='marnie', source_language='German', target_language='English', field='Medicine')

    db.session.add_all([translation1, translation2])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_translations():
    db.session.execute('TRUNCATE translations RESTART IDENTITY CASCADE;')
    db.session.commit()
