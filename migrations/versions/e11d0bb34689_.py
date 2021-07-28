"""empty message

Revision ID: e11d0bb34689
Revises: ffdc0a98111c
Create Date: 2021-07-28 09:06:29.700618

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e11d0bb34689'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('paymentmethods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('zip', sa.Integer(), nullable=False),
    sa.Column('card_number', sa.BigInteger(), nullable=False),
    sa.Column('cvv', sa.Integer(), nullable=False),
    sa.Column('expiration_month', sa.Integer(), nullable=False),
    sa.Column('expiration_year', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('payment_id', sa.Integer(), nullable=True),
    sa.Column('total', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['payment_id'], ['paymentmethods.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('field', sa.Enum('CORRESPONDANCE', 'FINANCIAL_DOCUMENTATION', 'MARKETING', 'MEDICINE', 'ENGINEERING', name='fieldchoices'), nullable=True),
    sa.Column('word_count', sa.Integer(), nullable=False),
    sa.Column('payment_status', sa.Boolean(), nullable=True),
    sa.Column('transaction_id', sa.Integer(), nullable=True),
    sa.Column('source_language', sa.Enum('GERMAN', 'SPANISH', 'ENGLISH', name='languagechoices'), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['transaction_id'], ['transactions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('copywritings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('key_words', sa.String(), nullable=True),
    sa.Column('links', sa.String(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('proofreadings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('document_url', sa.String(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('document_url', sa.String(), nullable=False),
    sa.Column('target_language', sa.Enum('GERMAN', 'SPANISH', 'ENGLISH', name='languagechoices'), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('vat_number', sa.String(), nullable=True))
    op.add_column('users', sa.Column('translator', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'translator')
    op.drop_column('users', 'vat_number')
    op.drop_table('translations')
    op.drop_table('proofreadings')
    op.drop_table('copywritings')
    op.drop_table('orders')
    op.drop_table('transactions')
    op.drop_table('paymentmethods')
    # ### end Alembic commands ###