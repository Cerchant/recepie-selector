import re
from datetime import datetime, timedelta
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.hash import bcrypt
from jose import jwt, JWTError
from pydantic import ValidationError
from models.authDTO import UserDTO, Token, UserCreate
from models.SessionMaker import get_session, Session
from settings import settings
from exceptions import Exceptions
from models.User import User as ModelUser

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/sing-in')
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'


def get_current_user(token: str = Depends(oauth2_scheme)):
    return AuthService.validate_token(token)

async def get_current_user_token(token: str = Depends(oauth2_scheme)):
    return token

class AuthService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return bcrypt.hash(password)

    @classmethod
    def verify_email(cls, email: str):
        return re.fullmatch(regex, email)

    @classmethod
    def validate_token(cls, token: str) -> UserDTO:
        try:
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=[settings.jwt_algorithm],
            )
        except JWTError:
            raise Exceptions.validate_token from None
        user_data = payload.get('user')

        try:
            user = UserDTO.parse_obj(user_data)
        except ValidationError:
            raise Exceptions.validate_token from None

        return user



    @classmethod
    def create_token(cls, user: ModelUser) -> Token:
        user_data = UserDTO.from_orm(user)
        now = datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + timedelta(seconds=settings.jwt_expiration),
            'sub': str(user_data.id),
            'user': user_data.dict(),
        }
        token = jwt.encode(
            payload,
            settings.jwt_secret,
            algorithm=settings.jwt_algorithm,
        )

        return Token(access_token=token)

    def __init__(self, session: Session = Depends(get_session)): # type: ignore
        self.session = session

    def change_password(self, user: UserDTO, old_password: str, new_password: str, repeat_new_password: str):

        get_user = (
            self.session.query(ModelUser)
                .filter(ModelUser.id == user.id)
                .first()
        )

        if not get_user or not new_password == repeat_new_password:
            raise Exceptions.change_password

        if old_password == new_password:
            raise Exceptions.change_password

        if not self.verify_password(old_password, get_user.password_hash):
            raise Exceptions.change_password

        get_user.password_hash = self.hash_password(new_password)
        self.session.commit()


    def register_new_user(self, user_data: UserCreate) -> Token:

        user = ModelUser(
            email=user_data.email,
            username=user_data.username,
            password_hash=self.hash_password(user_data.password),
            is_super=user_data.is_super,
        )

        db_check = (
            self.session.query(ModelUser)
                .filter(ModelUser.username == user_data.username)
                .first()
        )

        if not user_data.password == user_data.repeatPassword:
            raise Exceptions.register_new_user_password

        if db_check:
            raise Exceptions.register_new_user_username

        if not self.verify_email(user_data.email):
            raise Exceptions.register_new_user_email

        self.session.add(user)
        self.session.commit()
        return self.create_token(user)

    def authenticate_user(self, username: str, password: str) -> Token:
        user = (
            self.session.query(ModelUser)
                .filter(ModelUser.username == username)
                .first()
        )

        if not user:
            raise Exceptions.auth

        if not self.verify_password(password, user.password_hash):
            raise Exceptions.auth

        return self.create_token(user)

    # def logout_user(self, token: str):
    #     tokenBL = TokenBlacklist(
    #         blacklist_token=token
    #     )
    #
    #     self.session.add(tokenBL)
    #     self.session.commit()
    #     return