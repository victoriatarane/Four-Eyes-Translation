from .db import db


class PaymentMethod(db.Model):
    __tablename__ = 'paymentmethods'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    card_number = db.Column(db.BigInteger, nullable=False)
    cvv = db.Column(db.Integer, nullable=False)
    expiration_month = db.Column(db.Integer, nullable=False)
    expiration_year = db.Column(db.Integer, nullable=False)

    transactions = db.relationship('Transaction')

    def __repr__(self):
        print(self.id)
        return f'<Payment Method {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.id,
            'address': self.address,
            'zip': self.zip,
            'card_number': self.card_number,
            'cvv': self.cvv,
            'expiration_month': self.expiration_month,
            'expiration_year': self.expiration_year
        }
