from .Base import Base
import sqlalchemy as sa

class User(Base):
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    email = sa.Column(sa.Text, unique=True)
    username = sa.Column(sa.Text, unique=True)
    password_hash = sa.Column(sa.Text)
    is_super = sa.Column(sa.Boolean, default=0)

class TokenBlacklist(Base):
    __tablename__ = 'blacklist_tokens'

    id = sa.Column(sa.Integer, primary_key=True)
    blacklist_token = sa.Column(sa.Text)