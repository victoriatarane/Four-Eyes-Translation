"""empty message

Revision ID: 6bcd88f3b37a
Revises: d7f35288e382
Create Date: 2021-08-04 12:47:51.777761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bcd88f3b37a'
down_revision = 'd7f35288e382'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('copywritings', 'word_count')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('copywritings', sa.Column('word_count', sa.INTEGER(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
