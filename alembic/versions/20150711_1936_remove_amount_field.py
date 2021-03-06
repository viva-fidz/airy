"""Remove 'amount' field

Revision ID: 2d89bdc3fcd
Revises: 294adccf8b5
Create Date: 2015-07-11 19:36:31.793974

"""

# revision identifiers, used by Alembic.
revision = '2d89bdc3fcd'
down_revision = '294adccf8b5'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('time_entries', 'duration',
               existing_type=postgresql.INTERVAL(),
               nullable=False)
    op.drop_column('time_entries', 'amount')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('time_entries', sa.Column('amount', sa.NUMERIC(precision=4, scale=2), autoincrement=False, nullable=True))
    op.alter_column('time_entries', 'duration',
               existing_type=postgresql.INTERVAL(),
               nullable=True)
    ### end Alembic commands ###
