from fastapi import HTTPException, status


class Exceptions:
    auth = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Incorrect username or password.',
        headers={
            'WWW-Authenticate': 'Bearer'
        },
    )

    register_new_user_username = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='A user with this name already exists. Use a different name.',
        headers={
            'WWW-Register': 'Username'
        },
    )

    register_new_user_password = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='Enter password in second field correctly.',
        headers={
            'WWW-Register': 'password'
        },
    )

    register_new_user_email = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='Please enter a valid email.',
        headers={
            'WWW-Register': 'Email'
        },
    )

    change_password = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='Please enter password correctly.',
        headers={
            'WWW-Change-password': 'Password'
        },
    )

    validate_token = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={
            'WWW-Validation': 'Token'
        },
    )