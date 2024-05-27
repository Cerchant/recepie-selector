import styles from "./RecipeListPage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageBody from "../../UI/PageBody/PageBody";
import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import RecipeCardList from "./RecipeCardList/RecipeCardList";
import FindRecipesForm from "./FindRecipesForm/FindRecipesForm";
import { useState } from "react";

const RecipeListPage = (props) => {
  const [recipes, setRecipes] = useState([]);

  const handleRecipes = (recipes) => {
    const dto = recipes.map((model) => {
      return {
        id: model.rid,
        recipeName: model.rname,
        description: model.rtext,
        imageLink: `http://127.0.0.1:8000/images/${model.rpicture}`,
        ingridients: model.productList,
        portionMass: model.rweight,
        kbju: {
          k: model.kbju.k,
          b: model.kbju.b,
          j: model.kbju.j,
          u: model.kbju.u,
        },
        instruction: model.step.map((steps) => {
          return {
            text: steps.sentence,
            images: steps.picture ? [`http://127.0.0.1:8000/images/${steps.picture}`] : [],
          }
        })
        // instruction: [
        //   {
        //     text: "Взбить 2 небольших яйца с сахаром.",
        //     images: [],
        //   },
        //   {
        //     text: "Растереть творог и добавить в яичную смесь.",
        //     images: [],
        //   },
        //   {
        //     text: "Вымесить плотное, но мягкое тесто, понемногу добавляя муку.",
        //     images: [],
        //   },
        //   {
        //     text: "Сформировать сырники и обжарить на сковороде по 4 минуты с каждой стороны при среднем огне.",
        //     images: [
        //       "https://proprikol.ru/wp-content/uploads/2021/01/kartinki-syrniki-3.jpg",
        //     ],
        //   },
        // ],
      };
    });
    setRecipes(dto);
    props.handleRecipes(dto);
  };

  //const recipes = props.recipes;

  return (
    <>
      <PageHeader />
      <PageBody>
        <Container>
          <Title className={styles["recipe-list-page__title"]}>
            Подбор рецептов
          </Title>
          <Content>
            <FindRecipesForm handleRecipes={handleRecipes} />

            <RecipeCardList
              startCookingHandler={props.startCookingHandler}
              recipes={recipes}
            />
          </Content>
        </Container>
      </PageBody>
      <PageFooter />
    </>
  );
};

export default RecipeListPage;
