from fastapi import Depends, status
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from ..models.BuisnessDTO import AdditionalUserDataDTO
from ..models.SessionMaker import get_session, Session
from ..models.User import User
from ..models.authDTO import UserDTO
from ..models.Buisness import AdditionalUserData, IntolerableProduct


class BusinessService:

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def setAdditionalUserData(self, additionalUserDataDTO: AdditionalUserDataDTO, user: UserDTO):
        additionalUserData = AdditionalUserData(age=additionalUserDataDTO.age, weight=additionalUserDataDTO.weight, height=additionalUserDataDTO.height)
        self.session.add(additionalUserData)
        self.session.flush()
        self.session.refresh(additionalUserData)

        for p in additionalUserDataDTO.intolerableProducts:
            product = IntolerableProduct(
                name=p.name,
                additionalUserDataID=additionalUserData.id
            )
            self.session.add(product)

        self.session.commit()
        self.session.query(User).filter(User.id == user.id).update({"additionalUserDataID": f"{additionalUserData.id}"})
        self.session.commit()
