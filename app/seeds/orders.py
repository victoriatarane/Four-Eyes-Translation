from app.models import db, Order
# from app.models.order import FieldChoices, LanguageChoices


# Adds a demo user, you can add other users here if you want
def seed_orders():
    order1 = Order(user_id=1)
    order2 = Order(user_id=1)
    order3 = Order(user_id=2)
    order4 = Order(user_id=3)

    db.session.add_all([order1, order2, order3, order4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
