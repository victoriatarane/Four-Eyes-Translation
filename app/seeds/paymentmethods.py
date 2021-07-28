from app.models import db, PaymentMethod


# Adds a demo user, you can add other users here if you want
def seed_paymentmethods():
    paymentmethod1 = PaymentMethod(
        name='Demo', address='900 Columbus Ave #33', zip=12323, card_number=1234234534564567 , cvv=202, expiration_month=12, expiration_year=2021)
    paymentmethod2 = PaymentMethod(
        name='Demo', address='900 Columbus Ave #33', zip=12323, card_number=9087897678656754, cvv=234, expiration_month=11, expiration_year=2022)
    paymentmethod3 = PaymentMethod(
        name='Marnie Smith', address='123 E Winton Ave #1010', zip=11109, card_number=9876543287654321, cvv=555, expiration_month=10, expiration_year=2021)
    paymentmethod4 = PaymentMethod(
        name='Robert Adams', address='200 Olive Street #2', zip=19090, card_number=1020304050607080, cvv=889, expiration_month=1, expiration_year=2023)

    db.session.add_all([paymentmethod1, paymentmethod2, paymentmethod3, paymentmethod4])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_paymentmethods():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
