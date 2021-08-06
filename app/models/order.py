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

    transactions = db.relationship('Transaction')

    translations = db.relationship('Translation', back_populates='orders')

    proofreadings = db.relationship('Proofreading', back_populates='orders')

    copywritings = db.relationship('Copywriting', back_populates='orders')

    def __repr__(self):
        print(self.id)
        return f'<Order {self.id}>'

    def to_dict(self):
        # dict = {'id': self.id, 'user_id': self.user_id}
        # print(self.translations, 'SELF###$$$')
        # if self.translations:
        #     dict['translations'] = self.translations[0].to_dict()
        # elif self.copywritings:
        #     dict['copywritings'] = self.copywritings[0].to_dict()
        # elif self.proofreadings:
        #     dict['proofreadings'] = self.proofreadings[0].to_dict()
        # else:
        #     dict['test'] = 'string'
        return {
            'id': self.id, 
            'user_id': self.user_id,
            # 'field': self.field,
            # 'word_count': self.word_count,
            # 'payment_status': self.payment_status,
            # 'transaction_id': self.transaction_id,
            # 'source_language': self.source_language,
            # 'created_at': self.created_at, 
            'translation': self.translations[0].to_dict() if self.translations else None,
            'copywriting': self.copywritings[0].to_dict() if self.copywritings else None,
            'proofreading': self.proofreadings[0].to_dict() if self.proofreadings else None,
        }


