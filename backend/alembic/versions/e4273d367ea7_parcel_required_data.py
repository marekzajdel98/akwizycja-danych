"""parcel required data

Revision ID: e4273d367ea7
Revises: 508ea46bfff0
Create Date: 2024-05-15 12:30:08.271994

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e4273d367ea7'
down_revision: Union[str, None] = '508ea46bfff0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('parcels', 'sender_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('parcels', 'recipient_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('parcels', 'origin_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('parcels', 'destination_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('parcels', 'destination_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('parcels', 'origin_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('parcels', 'recipient_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('parcels', 'sender_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###
