from fastapi import Depends, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy import and_
from sqlalchemy.sql import text, select
from starlette.responses import JSONResponse

from exceptions import Exceptions
from models.Buisness import KBJU, UserRecipeHistory
from models.BuisnessDTO import AdditionalUserDataDTO, QueryForRecipeDTO, ExceptIntolerable, KbjuDTO, QueryHistoryDTO
from models.SessionMaker import get_session, Session
from models.User import User
from models.authDTO import UserDTO
from models.Buisness import AdditionalUserData, IntolerableProduct, Recipe, Step, product_recipe
from models.Buisness import Product

from fastapi.responses import FileResponse


class BusinessService:

    def __init__(self, session: Session = Depends(get_session)):  # type: ignore
        self.session = session

    def getAdditionalUserData(self, user: UserDTO):
        products = [p._asdict() for p in self.session.execute(text(f"""
        Select ip.name FROM intolerable_product ip  
        WHERE ip.additionalUserDataID IN (
            SELECT u.additionalUserDataID FROM users u 
            WHERE u.id = {user.id}
        )
        """))]
        data = self.session.query(AdditionalUserData).filter(
            AdditionalUserData.id.in_(select(User.additionalUserDataID).where(User.id == user.id))).first()
        try:
            returnValue = AdditionalUserDataDTO(
                age=data.age,
                height=data.height,
                weight=data.weight,
                intolerableProducts=products)
        except AttributeError:
            returnValue = Exceptions.resource_not_found
        return returnValue

    def setAdditionalUserData(self, additionalUserDataDTO: AdditionalUserDataDTO, user: UserDTO):
        additionalUserData = AdditionalUserData(age=additionalUserDataDTO.age, weight=additionalUserDataDTO.weight,
                                                height=additionalUserDataDTO.height)
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
        intolerable = []
        if exceptIntolerable.intolerable:
            intolerable = select(IntolerableProduct.name).where(IntolerableProduct.additionalUserDataID.in_(
                select(User.additionalUserDataID).where(User.id == user.id)))
        return JSONResponse(content=jsonable_encoder({"productList": [i.name for i in
                                                                      self.session.query(Product).filter(
                                                                          Product.name.not_in(intolerable)).all()]}))

    def getHistory(self, queryHistoryDTO: QueryHistoryDTO, user):
        history = self.session.query(UserRecipeHistory).filter(and_(UserRecipeHistory.user_id == user.id,
                                                          UserRecipeHistory.timestamp.between(
                                                              queryHistoryDTO.start_date_time,
                                                              queryHistoryDTO.end_date_time
                                                          ))).all()
        final = [{} for _ in history]
        itr = 0
        for row in history:
            recipe = self.session.query(Recipe).filter(Recipe.id == row.recipe_id).first()
            final[itr]["rid"] = recipe.id
            final[itr]["rname"] = recipe.name
            final[itr]["kbju"] = self.session.query(KBJU).filter(KBJU.recipe_id == final[itr].get("rid")).first()
            final[itr]["picture"] = row.get("picture")
            final[itr]["weight"] = row.get("weight")
            itr-=-1
        return final

    
    def addRecipeToHistory(self, queryBeginRecipeDTO, user):
        self.session.add(UserRecipeHistory(user_id=user.id, recipe_id=queryBeginRecipeDTO.recipe_id))
        self.session.commit()
        return 200

    def getRecipe(self, queryBeginRecipeDTO, user):
        result = self.session.execute(text(f"""
                SELECT r1.id as rid, r1.name as rname, r1.text as rtext, r1.picture as rpicture, r1.weight as rweight FROM recipe r1
                WHERE rid IN ({queryBeginRecipeDTO.recipe_id})"""))
        final = []
        for row in result:
            final.append(row._asdict())
        try:
            crudeKbju = self.session.query(KBJU).filter(KBJU.recipe_id == final[0].get("rid")).first()
            final[0]["kbju"] = KbjuDTO(k=crudeKbju.k, b=crudeKbju.b, j=crudeKbju.j, u=crudeKbju.u)
            final[0]["step"] = self.session.query(Step).filter(Step.recipe_id == final[0].get("rid")).all()
        except IndexError:
            pass
        return JSONResponse(content=jsonable_encoder(final))

    def getRecipes(self, queryForRecipeDTO: QueryForRecipeDTO):
        names = [name for name in queryForRecipeDTO.ProductsList]
        param = "\"" + "\", \"".join(names) + "\""
        if len(queryForRecipeDTO.ProductsList) != 0:
            toGetRecipes = f"""
                SELECT DISTINCT r1.id as rid, r1.name as rname, r1.text as rtext, r1.picture as rpicture, r1.weight as rweight FROM recipe r1
                join product_recipe pr1 on 	pr1.recipe = r1.id
                join product p1 on 	p1.id = pr1.product
                WHERE p1.name IN ({param})
            """
        else:
            toGetRecipes = """
               SELECT DISTINCT r1.id as rid, r1.name as rname, r1.text as rtext, r1.picture as rpicture, r1.weight as rweight FROM recipe r1
                join product_recipe pr1 on 	pr1.recipe = r1.id
                join product p1 on 	p1.id = pr1.product
            """
            queryForRecipeDTO.ProductsList = [i.name for i in self.session.query(Product).filter().all()]
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
                            itr -= 1
                            break
                        except IndexError:
                            pass
                    fin.append(p._asdict().get("pname"))
                try:
                    if len(final[-1]) < 5:
                        crudeKbju = self.session.query(KBJU).filter(KBJU.recipe_id == final[itr].get("rid")).first()
                        final[itr]["kbju"] = KbjuDTO(k=crudeKbju.k, b=crudeKbju.b, j=crudeKbju.j, u=crudeKbju.u)
                        final[itr]["step"] = self.session.query(Step).filter(Step.recipe_id == final[itr].get("rid")).all()
                        final[itr]["picture"] = row.get("picture")
                        final[itr]["weight"] = row.get("weight")
                except IndexError:
                    pass
            itr -= -1

        return JSONResponse(content=jsonable_encoder(final))

    def initBaseData(self):
        products = [
            Product(name="фундук"),  # index 0
            Product(name="картофель"),  # index 1
            Product(name="ветчина"),  # index 2
            Product(name="телятина"),  # index 3
            Product(name="курица"),  # index 4
            Product(name="подсолнечное масло"),  # index 5
            Product(name="яйца"),  # index 6
            Product(name="хлеб формовой"),  # index 7
            Product(name="уксус"),  # index 8
            Product(name="соль"),  # index 9
            Product(name="сок лимонный"),  # index 10
            Product(name="вино белое сухое"),  # index 11
            Product(name="масло сливочное"),  # index 12
            Product(name="зелень"),  # index 13
            Product(name="пряности"),  # index 14
            Product(name="перец душистый молотый"),  # index 15
            Product(name="Чеснок гранулированный"),  # index 16
        ]
        for p in products:
            self.session.add(p)
        self.session.commit()

        recipes = [
            Recipe(name="Яйца Бенедикт",
                   text="Яйца Бенедикт — это прекрасный завтрак, представляющий собой бутерброд из поджаренного тоста или булочки с яйцами-пашот, беконом или ветчиной и голландским соусом. Существует несколько версий возникновения этого блюда, согласно которым впервые блюдо появилось в Нью-Йорке (разные версии говорят о разных людях, разных именах и разных ситуациях возникновения яиц Бенедикт, однако все они утверждают, что появилось оно именно в Нью-Йорке). Несмотря на это, блюдо часто относят к французской кухне из-за того, что яйца Бенедикт стали готовить в лучших ресторанах Парижа.",
                   weight=200,
                   picture="Eggs_Benedict_main.webp"),
            Recipe(name="Картошка по-деревенски в духовке",
                   text="Картошка по-деревенски будет прекрасным гарниром к мясу, рыбе и различным бургерам. Кроме того, картофель, запеченный в духовке, намного полезнее жареного картофеля и, тем более, картофеля фри.",
                   weight=200,
                   picture="kartoshka_po_derevencky_v_duhovke_main.webp")
        ]
        for r in recipes:
            self.session.add(r)
        self.session.commit()

        recipes[0].products = [products[6], products[2], products[7], products[8], products[9], products[12],
                               products[11], products[10]]
        recipes[0].kbju = KBJU(k=123, b=43.2, j=45.6, u=32.2)
        recipes[1].products = [products[1], products[5], products[7], products[13], products[14], products[15]]
        recipes[1].kbju = KBJU(k=350, b=12.1, j=32.2, u=51.5)
        self.session.commit()

        steps = [
            Step(recipe_id=recipes[0].id, picture="", sentence="Почистите, помойте лук и нарежьте мелко. Так же небольшими брусочками нарежьте 50 г бекона."),
            Step(recipe_id=recipes[0].id, picture="", sentence="В кастрюлю налейте воду, доведите до кипения, убавьте огонь и влейте туда 1 ст. л. уксуса. Размешайте воду, сделав воронку. Аккуратно разбейте в воронку воды яйцо, чуть-чуть перемешайте и варите 2-3 минуты. Достаньте шумовкой и выложите на плотное бумажное полотенце, чтобы яйцо просушить. Можно использовать черствый кусок хлеба. Он тоже хорошо впитывает воду."),
            Step(recipe_id=recipes[0].id, picture="", sentence="На сковороде растопите сливочное масло и поджарьте тосты. Лук обжарьте с беконом."),
            Step(recipe_id=recipes[0].id, picture="", sentence="Приготовьте голландский соус. Поставьте кастрюлю на паровую баню – на кастрюлю с водой поставьте миску, чтобы она не касалась воды. В миску положите 65 г сливочного масла, растопите его, помешивая венчиком, и посолите. В отдельной миске взбейте 3 яичных желтка и тонкой струйкой влейте их в масло, взбейте и добавьте 1 ст. л. лимонного сока."),
            Step(recipe_id=recipes[0].id, picture="", sentence="Сформируйте блюдо: на хлебные тосты выложите бекон с луком, сверху яйцо и полейте голландским соусом."),
            Step(recipe_id=recipes[1].id, picture="kartoshka_po_derevencky_v_duhovke_1.webp", sentence="Картофель тщательно вымойте с жёсткой щеткой, не очищайте от кожуры."),
            Step(recipe_id=recipes[1].id, picture="kartoshka_po_derevencky_v_duhovke_2.webp", sentence="Нарежьте длинными дольками вдоль."),
            Step(recipe_id=recipes[1].id, picture="kartoshka_po_derevencky_v_duhovke_3.webp", sentence="Сложите дольки в большой контейнер или пакет, добавьте оливковое масло и приправу. Закройте контейнер или пакет и тщательно встряхните, чтобы равномерно распределить специи по картошке."),
            Step(recipe_id=recipes[1].id, picture="kartoshka_po_derevencky_v_duhovke_4.webp", sentence="Выложите картофель на противень в один слой и запекайте в духовке при 180 °C 30-40 минут до готовности."),
            Step(recipe_id=recipes[1].id, picture="kartoshka_po_derevencky_v_duhovke_5.webp", sentence="Картофель по-деревенски готов."),
        ]
        for step in steps:
            self.session.add(step)
        self.session.commit()

        return JSONResponse(content=jsonable_encoder(status.HTTP_201_CREATED))