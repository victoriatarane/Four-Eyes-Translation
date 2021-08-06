import datetime
from .db import db
# from .order import LanguageChoices


class Translation(db.Model):
    __tablename__ = 'translations'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    document_url = db.Column(db.String, nullable=False)
    field = db.Column(db.String(20), nullable=False)
    word_count = db.Column(db.Integer, nullable=False)
    completion_status = db.Column(db.Boolean, default=False)
    source_language = db.Column(db.String(20), nullable=False)
    target_language = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    orders = db.relationship('Order', back_populates='translations')

    def __repr__(self):
        print(self.id)
        return f'<Translation {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'document_url': self.document_url,
            'field': self.field,
            'word_count': self.word_count,
            'completion_status': self.completion_status,
            'source_language': self.source_language,
            'target_language': self.target_language,
            'created_at': self.created_at,
        }
