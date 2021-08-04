from app.models import db, Transaction


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    transaction1 = Transaction(
        user_id=1, payment_id=1, total=123 )
    transaction2 = Transaction(
        user_id=1, payment_id=2, total=222 )
    transaction3 = Transaction(
        user_id=2, payment_id=3, total=90 )
    transaction4 = Transaction(
        user_id=3, payment_id=4, total=150 )

    db.session.add_all([transaction1, transaction2, transaction3, transaction4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
