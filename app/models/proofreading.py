from .db import db


class Proofreading(db.Model):
    __tablename__ = 'proofreadings'

    id = db.Column(db.Integer, primary_key=True)
    document_url = db.Column(db.String, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    def __repr__(self):
        print(self.name)
        return f'<Proofreading {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'document_url': self.document_url,
            'order_id': self.order_id,
        }
