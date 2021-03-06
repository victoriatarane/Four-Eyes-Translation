"""empty message

Revision ID: 1828c85a33b6
Revises: 6bcd88f3b37a
Create Date: 2021-08-04 12:48:20.280326

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1828c85a33b6'
down_revision = '6bcd88f3b37a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('copywritings', sa.Column('word_count', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('copywritings', 'word_count')
    # ### end Alembic commands ###
