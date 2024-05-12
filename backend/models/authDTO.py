from pydantic import BaseModel


class BaseUser(BaseModel):
    email: str
    username: str


class UserCreate(BaseUser):
    password: str
    repeatPassword: str
    is_super: bool = False

class UserDTO(BaseUser):
    id: int

    class Config:
        from_attributes = True

class ChangePasswordDTO(BaseModel):
    old_password: str
    new_password: str
    repeat_new_password: str

class ChangeEmailDTO(BaseModel):
    new_email: str

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'


