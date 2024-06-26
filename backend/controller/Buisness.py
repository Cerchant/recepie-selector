from fastapi import APIRouter, Depends

from models.BuisnessDTO import AdditionalUserDataDTO, QueryForRecipeDTO, ExceptIntolerable, QueryBeginRecipeDTO, \
    QueryHistoryDTO
from models.authDTO import UserDTO
from services.BusinessService import BusinessService
from services.auth import get_current_user

business = APIRouter(
    prefix='/business',
)

@business.post('/start')
def setAdditionalUserData(additionalUserDataDTO: AdditionalUserDataDTO,
                       user: UserDTO = Depends(get_current_user),
                       service: BusinessService = Depends()):
    return service.setAdditionalUserData(additionalUserDataDTO, user)

@business.get('/data')
def getAdditionalUserData(user: UserDTO = Depends(get_current_user),
                       service: BusinessService = Depends()):
    return service.getAdditionalUserData(user)

@business.post('/init')
def init(service: BusinessService = Depends()):
    return service.initBaseData()

@business.put('/products')
def getProducts(exceptIntolerable: ExceptIntolerable,
                user: UserDTO = Depends(get_current_user),
                service: BusinessService = Depends()):
    return service.getProducts(exceptIntolerable, user)

@business.post('/recipes')
def getRecipes(queryForRecipeDTO: QueryForRecipeDTO,
        service: BusinessService = Depends()):
    return service.getRecipes(queryForRecipeDTO)

@business.put('/recipe')
def getRecipe(queryBeginRecipeDTO: QueryBeginRecipeDTO,
              user: UserDTO = Depends(get_current_user),
              service: BusinessService = Depends()):
    return service.getRecipe(queryBeginRecipeDTO, user)
@business.post('/history')
def getHistory(queryHistoryDTO: QueryHistoryDTO,
               user: UserDTO = Depends(get_current_user),
               service: BusinessService = Depends()):
    return service.getHistory(queryHistoryDTO, user)
@business.post('/recipe-history')
def addRecipeInHistory(queryBeginRecipeDTO: QueryBeginRecipeDTO,
              user: UserDTO = Depends(get_current_user),
              service: BusinessService = Depends()):
    return service.addRecipeToHistory(queryBeginRecipeDTO, user)
