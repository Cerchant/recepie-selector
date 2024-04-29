from fastapi import APIRouter, Depends

from models.BuisnessDTO import AdditionalUserDataDTO, QueryForRecipeDTO
from models.authDTO import UserDTO
from services.BusinessService import BusinessService
from services.auth import get_current_user

business = APIRouter(
    prefix='/business',
)

@business.post('/start')
def additionalUserData(additionalUserDataDTO: AdditionalUserDataDTO,
                       user: UserDTO = Depends(get_current_user),
                       service: BusinessService = Depends()):
    return service.setAdditionalUserData(additionalUserDataDTO, user)

@business.post('/init')
def init(service: BusinessService = Depends()):
    return service.initBaseData()

@business.get('/products')
def getProducts(service: BusinessService = Depends()):
    return service.getProducts()

@business.post('/recipes')
def getRecipes(queryForRecipeDTO: QueryForRecipeDTO,
        user: UserDTO = Depends(get_current_user),
        service: BusinessService = Depends()):
    return service.getRecipes(queryForRecipeDTO, user)