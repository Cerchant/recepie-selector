from fastapi import APIRouter, Depends

from src.models.BuisnessDTO import AdditionalUserDataDTO
from src.models.authDTO import UserDTO
from src.services.BusinessService import BusinessService
from src.services.auth import get_current_user

business = APIRouter(
    prefix='/business',
)

@business.post('/start')
def additionalUserData(additionalUserDataDTO: AdditionalUserDataDTO,
                       user: UserDTO = Depends(get_current_user),
                       service: BusinessService = Depends()):
    return service.setAdditionalUserData(additionalUserDataDTO, user)

# TODO getProducts
# TODO getRecipe by product list + bool for intolerableProducts list
# TODO img provider?
# TODO validation for set additionalUserData
