from pydantic import BaseModel
class ProductDTO(BaseModel):
    id: int
    name: str
    mass: int
    recipe_id: int

class IntolerableProductDTO(BaseModel):
    name: str

class AdditionalUserDataDTO(BaseModel):
    age: int
    height: int
    weight: int
    intolerableProducts: list[IntolerableProductDTO]


