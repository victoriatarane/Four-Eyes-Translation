import enum
from .db import db
from .order import LanguageChoices


class Translation(db.Model):
    __tablename__ = 'translations'

    id = db.Column(db.Integer, primary_key=True)
    document_url = db.Column(db.String, nullable=False)
    target_language = db.Column(db.Enum(LanguageChoices))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    user = db.relationship('User', back_populates='transactions')

    paymentmethod = db.relationship('PaymentMethod', back_populates='transactions')

    def __repr__(self):
        print(self.name)
        return f'<Translation {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'document_url': self.document_url,
            'target_language': self.target_language,
            'order_id': self.order_id,
        }
