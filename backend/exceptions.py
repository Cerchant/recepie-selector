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
    change_password_same = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='Please enter new password correctly.',
        headers={
            'WWW-Change-password': 'Password_repeat_same'
        },
    )

    change_email_same = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='Please enter distinct new email from old.',
        headers={
            'WWW-Change-email': 'Email_repeat_same'
        },
    )

    change_email_exists = HTTPException(
        status_code=status.HTTP_412_PRECONDITION_FAILED,
        detail='There is user with this email.',
        headers={
            'WWW-Change-email': 'Email_already_exists'
        },
    )

    validate_token = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={
            'WWW-Validation': 'Token'
        },
    )

    resource_not_found = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail='resource not found',
    )