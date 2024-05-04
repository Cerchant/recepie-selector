from pydantic import BaseModel
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
