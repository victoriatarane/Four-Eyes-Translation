from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.id'))
    total = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        print(self.name)
        return f'<Transaction {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'payment_id': self.payment_id,
            'total': self.total
        }
