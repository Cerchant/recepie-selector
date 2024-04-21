from fastapi import Depends, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.sql import text
from starlette.responses import JSONResponse

from ..models.BuisnessDTO import AdditionalUserDataDTO, QueryForRecipeDTO
from ..models.SessionMaker import get_session, Session
from ..models.User import User
from ..models.authDTO import UserDTO
from ..models.Buisness import AdditionalUserData, IntolerableProduct, Recipe, product_recipe
from src.models.Buisness import Product

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
        return JSONResponse(content=jsonable_encoder(status.HTTP_201_CREATED))


    def getProducts(self):
        return self.session.query(Product).all()

    def getRecipes(self, queryForRecipeDTO: QueryForRecipeDTO, user: UserDTO):
        names = [o.name for o in queryForRecipeDTO.ProductsList]
        param = "\"" + "\", \"".join(names) + "\""
        sql = f"""
SELECT * FROM recipe r1
join product_recipe pr1 on 	pr1.recipe = r1.id
join product p1 on 	p1.id = pr1.product
WHERE
	p1.name IN ({param})
	and r1.id not in 
(
	select r.id as pn
	FROM recipe r
	join product_recipe pr on pr.recipe = r.id
	join product p on p.id = pr.product
	WHERE
		p.name in 
       (
		SELECT 	ip2.name FROM users u
		join additional_user_data aud on aud.id = u.additionalUserDataID
		join intolerable_product ip2 on aud.id = ip2.additionalUserDataID
		where u.username = "{user.username}"
		and true = {queryForRecipeDTO.intolerable.__str__()}
		)
)
        """
        result = self.session.execute(text(sql))
        final = []
        for row in result:
            final.append(row._asdict())
        return final


    def initBaseData(self):
        products = [
            Product(name="фундук"), # index 0
            Product(name="картофель"), # index 1
            Product(name="ветчина"), # index 2
            Product(name="телятина"), # index 3
            Product(name="курица"), # index 4
            Product(name="подсолнечное масло"), # index 5
            Product(name="яйца"), # index 6
            Product(name="хлеб формовой"), # index 7
            Product(name="уксус"), # index 8
            Product(name="соль"), # index 9
            Product(name="сок лимонный"), # index 10
            Product(name="вино белое сухое"), # index 11
            Product(name="масло сливочное"), # index 12
            Product(name="зелень"), # index 13
            Product(name="пряности"), # index 14
            Product(name="перец душистый молотый"), # index 15
            Product(name="Чеснок гранулированный"), # index 16
        ]
        for p in products:
            self.session.add(p)
        self.session.commit()

        recipes = [
            Recipe(name="Яйца Бенедикт",
                   text="Яйца Бенедикт — это прекрасный завтрак, представляющий собой бутерброд из поджаренного тоста или булочки с яйцами-пашот, беконом или ветчиной и голландским соусом. Существует несколько версий возникновения этого блюда, согласно которым впервые блюдо появилось в Нью-Йорке (разные версии говорят о разных людях, разных именах и разных ситуациях возникновения яиц Бенедикт, однако все они утверждают, что появилось оно именно в Нью-Йорке). Несмотря на это, блюдо часто относят к французской кухне из-за того, что яйца Бенедикт стали готовить в лучших ресторанах Парижа."),
            Recipe(name="Картошка по-деревенски в духовке",
                   text="Картошка по-деревенски будет прекрасным гарниром к мясу, рыбе и различным бургерам. Кроме того, картофель, запеченный в духовке, намного полезнее жареного картофеля и, тем более, картофеля фри.")
        ]
        for r in recipes:
            self.session.add(r)
        self.session.commit()


        recipes[0].products = [products[6], products[2], products[7], products[8], products[9], products[12], products[11], products[10]]
        recipes[1].products = [products[1], products[5], products[7], products[13], products[14], products[15]]
        self.session.commit()
