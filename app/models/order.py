import enum
from .db import db

# class FieldChoices(enum.Enum):
#     CORRESPONDANCE = 'Correspondance'
#     FINANCIAL_DOCUMENTATION = 'Financial Documentation'
#     MARKETING = 'Marketing'
#     MEDICINE = 'Medicine'
#     ENGINEERING = 'Engineering'

# class LanguageChoices(enum.Enum):
#     GERMAN = 'German'
#     SPANISH = 'Spanish'
#     ENGLISH = 'English'

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='orders')

    transaction = db.relationship('Transaction')

    translation = db.relationship('Translation')

    proofreading = db.relationship('Proofreading')

    copywriting = db.relationship('Copywriting')

    def __repr__(self):
        print(self.id)
        return f'<Order {self.id}>'

    def to_dict(self):
        dict = {'id': self.id, 'user_id': self.user_id}
        if self.translation:
            dict['translation'] = self.translation[0].to_dict()
        elif self.copywriting:
            dict['copywriting'] = self.copywriting[0].to_dict()
        elif self.proofreading:
            dict['proofreading'] = self.proofreading[0].to_dict()
        return dict
            # 'field': self.field,
            # 'word_count': self.word_count,
            # 'payment_status': self.payment_status,
            # 'transaction_id': self.transaction_id,
            # 'source_language': self.source_language,
            # 'created_at': self.created_at, 
            # 'translation': self.translation.to_dict() if self.translation else None,
            # 'copywriting': self.copywriting.to_dict() if self.copywriting else None,
            # 'proofreading': self.proofreading.to_dict() if self.proofreading else None,



