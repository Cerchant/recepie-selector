from fastapi import Depends, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.sql import text, select
from starlette.responses import JSONResponse

from models.BuisnessDTO import AdditionalUserDataDTO, QueryForRecipeDTO, ExceptIntolerable
from models.SessionMaker import get_session, Session
from models.User import User
from models.authDTO import UserDTO
from models.Buisness import AdditionalUserData, IntolerableProduct, Recipe, product_recipe
from models.Buisness import Product

class BusinessService:

    def __init__(self, session: Session = Depends(get_session)): # type: ignore
        self.session = session

    def getAdditionalUserData(self, user: UserDTO):
        products = [p._asdict() for p in self.session.execute(text(f"""
        Select ip.name FROM intolerable_product ip  
        WHERE ip.additionalUserDataID IN (
            SELECT u.additionalUserDataID FROM users u 
            WHERE u.id = {user.id}
        )
        """))]
        data = self.session.query(AdditionalUserData).filter(AdditionalUserData.id.in_(select(User.additionalUserDataID).where(User.id==user.id))).first()
        return AdditionalUserDataDTO(
            age = data.age,
            height = data.height,
            weight = data.weight,
            intolerableProducts = products)

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

    def getProducts(self, exceptIntolerable: ExceptIntolerable, user: UserDTO):
        intolerable = select(IntolerableProduct.name).where(IntolerableProduct.additionalUserDataID.in_(select(User.additionalUserDataID).where(User.id==user.id)))
        return JSONResponse(content=jsonable_encoder({"productList": [i.name for i in self.session.query(Product).filter(Product.name.not_in(intolerable)).all()]}))


    def getRecipes(self, queryForRecipeDTO: QueryForRecipeDTO):
        names = [name for name in queryForRecipeDTO.ProductsList]
        param = "\"" + "\", \"".join(names) + "\""
        toGetRecipes = f"""
            SELECT DISTINCT r1.id as rid, r1.name as rname, r1.text as rtext FROM recipe r1
            join product_recipe pr1 on 	pr1.recipe = r1.id
            join product p1 on 	p1.id = pr1.product
            WHERE p1.name IN ({param})
        """
        result = self.session.execute(text(toGetRecipes))
        final = []

        itr = 0
        for row in result:

            row = row._asdict()

            if itr == 0:
                row_past = row

            if row.get("rid") != row_past.get("rid") or itr == 0:
                final.append(row)
                final[itr]["productList"] = list()
                row_past = row
                fin = final[itr].get("productList")
                for p in self.session.execute(text(f"""
                    SELECT p2.name as pname FROM product p2 
                        WHERE p2.id IN (Select pr.product FROM product_recipe pr
                        WHERE pr.recipe = {final[itr].get("rid")}
                    )
                        """)):
                    if not str(p._asdict().get("pname")) in set(queryForRecipeDTO.ProductsList):
                        try:
                            final.pop(itr)
                            itr-=1
                        except IndexError:
                            pass
                    fin.append(p._asdict().get("pname"))
            itr-=-1

        return JSONResponse(content=jsonable_encoder(final))

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
        return JSONResponse(content=jsonable_encoder(status.HTTP_201_CREATED))