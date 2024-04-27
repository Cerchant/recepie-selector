from sqlalchemy.orm import sessionmaker

from src.models.BuisnesDTO import ProductDTO
from src.models.SessionMaker import Session, get_session, engine
from src.models import Buisnes


class Depends:
    # Depends from FastAPI
    pass


class ControllerDemo:

    # def __init__(self, session: Session = Depends(get_session()):
    #     self.session = session

    def start(self):

        Session = sessionmaker(
            engine,
            autocommit=False,
            autoflush=False,
        )
        session = Session()

        product_from_user = ProductDTO(id=1,
                                       name="banana",
                                       mass=123,
                                       recipe_id=1)

        product_payload = Buisnes.Product(
            id=product_from_user.id,
            name=product_from_user.name,
            mass=product_from_user.mass,
            recipe_id=product_from_user.recipe_id
        )
        session.add(product_payload)
        session.commit()

obj = ControllerDemo()
obj.start()