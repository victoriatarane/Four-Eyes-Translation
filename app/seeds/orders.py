from app.models import db, Order
from app.models.order import FieldChoices, LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_orders():
    order1 = Order(
        user_id=1, field=FieldChoices.CORRESPONDANCE, word_count=2000, payment_status=True, transaction_id=1, source_language=LanguageChoices.GERMAN)
    order2 = Order(
        user_id=1, field=FieldChoices.ENGINEERING, word_count=2300, payment_status=True, transaction_id=2, source_language=LanguageChoices.GERMAN)
    order3 = Order(
        user_id=2, field=FieldChoices.MARKETING, word_count=2001, payment_status=True, transaction_id=3, source_language=LanguageChoices.GERMAN)
    order4 = Order(
        user_id=3, field=FieldChoices.MEDICINE, word_count=5000, payment_status=True, transaction_id=4, source_language=LanguageChoices.ENGLISH)

    db.session.add_all([order1, order2, order3, order4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
