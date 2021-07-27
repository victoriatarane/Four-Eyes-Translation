import enum
from .db import db

class FieldChoices(enum.Enum):
    CORRESPONDANCE = 'Correspondance'
    FINANCIAL_DOCUMENTATION = 'Financial Documentation'
    MARKETING = 'Marketing'
    MEDICINE = 'Medicine'
    ENGINEERING = 'Engineering'

class LanguageChoices(enum.Enum):
    GERMAN = 'German'
    SPANISH = 'Spanish'
    ENGLISH = 'English'

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    field = db.Column(db.Enum(FieldChoices))
    word_count = db.Column(db.Integer, nullable=False)
    payment_status = db.Column(db.Boolean, default=False)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'))
    source_language = db.Column(db.Enum(LanguageChoices))
    created_at = db.Column(db.DateTime)


    def __repr__(self):
        print(self.name)
        return f'<Order {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'field': self.field,
            'word_count': self.word_count,
            'payment_status': self.payment_status,
            'transaction_id': self.transaction_id,
            'source_language': self.source_language,
            'created_at': self.created_at
        }


