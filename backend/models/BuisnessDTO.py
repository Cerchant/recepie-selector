from pydantic import BaseModel, field_validator
from datetime import datetime
class ProductDTO(BaseModel):
    name: str

class IntolerableProductDTO(BaseModel):
    name: str

class AdditionalUserDataDTO(BaseModel):
    age: int
    height: int
    weight: int
    intolerableProducts: list[IntolerableProductDTO]

class QueryForRecipeDTO(BaseModel):
    ProductsList: list[str]

class ExceptIntolerable(BaseModel):
    intolerable: bool = True

class QueryBeginRecipeDTO(BaseModel):
    recipe_id: int

class QueryHistoryDTO(BaseModel):
    start_date_time: datetime
    end_date_time: datetime

    @field_validator('*')
    def custom_datetime_format(cls, v):
        return datetime.strftime(v, "%Y-%m-%d, %H:%M:%S")


class KbjuDTO(BaseModel):
    k: int
    b: float
    j: float
    u: float