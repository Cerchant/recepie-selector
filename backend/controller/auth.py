from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from models.authDTO import ChangePasswordDTO, ChangeEmailDTO
from models.authDTO import (
    UserCreate,
    Token,
    UserDTO,
)
from services.auth import AuthService, get_current_user, get_current_user_token

auth = APIRouter(
    prefix='/auth',
)


@auth.post('/sing-up', response_model=Token)
def sing_up(user_data: UserCreate, service: AuthService = Depends()):
    return service.register_new_user(user_data)


@auth.post('/sing-in', response_model=Token)
def sing_in(form_data: OAuth2PasswordRequestForm = Depends(),
            service: AuthService = Depends()):
    return service.authenticate_user(
        form_data.username,
        form_data.password,
    )


@auth.get('/user', response_model=UserDTO)
def get_user(user: UserDTO = Depends(get_current_user)):
    return user

@auth.put('/change-password')
def change_password(changePasswordDTO: ChangePasswordDTO,
                    user: UserDTO = Depends(get_current_user),
                    service: AuthService = Depends()):
    return service.change_password(user, changePasswordDTO.old_password, changePasswordDTO.new_password, changePasswordDTO.repeat_new_password)

@auth.put('/change-email')
def change_email(changeEmailDTO: ChangeEmailDTO,
                 user: UserDTO = Depends(get_current_user),
                 service: AuthService = Depends()):
    return service.change_email(user, changeEmailDTO.new_email)