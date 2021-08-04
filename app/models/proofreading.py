from .db import db
import datetime


class Proofreading(db.Model):
    __tablename__ = 'proofreadings'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    document_url = db.Column(db.String, nullable=False)
    field = db.Column(db.String(20), nullable=False)
    word_count = db.Column(db.Integer, nullable=False)
    completion_status = db.Column(db.Boolean, default=False)
    language = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def __repr__(self):
        print(self.name)
        return f'<Proofreading {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'document_url': self.document_url,
            'field': self.field,
            'word_count': self.word_count,
            'completion_status': self.completion_status,
            'language': self.language,
            'created_at': self.created_at,
        }
