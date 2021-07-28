from .db import db


class Copywriting(db.Model):
    __tablename__ = 'copywritings'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    key_words = db.Column(db.String)
    links = db.Column(db.String)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))


    def __repr__(self):
        print(self.name)
        return f'<Copywriting {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'key_words': self.key_words,
            'links': self.links,
            'order_id': self.order_id,
        }
