from pydantic import BaseModel
class ProductDTO(BaseModel):
    id: int
    name: str
    mass: int
    recipe_id: int
