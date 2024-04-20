from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from typing import Optional
from .Base import Base
import sqlalchemy as sa

from .Buisness import AdditionalUserData


class User(Base):
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.Text, unique=True)
    username = sa.Column(sa.Text, unique=True)
    password_hash = sa.Column(sa.Text)
    is_super = sa.Column(sa.Boolean, default=0)
    additionalUserDataID: Mapped[Optional[int]] = mapped_column(ForeignKey("additional_user_data.id"))