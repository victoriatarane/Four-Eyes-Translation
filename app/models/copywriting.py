from .db import db
import datetime


class Copywriting(db.Model):
    __tablename__ = 'copywritings'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    description = db.Column(db.Text, nullable=False)
    key_words = db.Column(db.String)
    links = db.Column(db.String)
    field = db.Column(db.String(20), nullable=False)
    word_count = db.Column(db.String, nullable=False)
    completion_status = db.Column(db.Boolean, default=False)
    language = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

    orders = db.relationship('Order', back_populates='copywritings')

    def __repr__(self):
        print(self.id)
        return f'<Copywriting {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'description': self.description,
            'key_words': self.key_words,
            'links': self.links,
            'field': self.field,
            'word_count': self.word_count,
            'completion_status': self.completion_status,
            'language': self.language,
            'created_at': self.created_at,
        }
