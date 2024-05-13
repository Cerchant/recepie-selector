import styles from "./RecipePage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageBody from "../../UI/PageBody/PageBody";
import Content from "../../UI/Content/Content";

import RecipeSummary from "../../UI/RecipeSummary/RecipeSummary";
import RecipeInstruction from "./RecipeInstruction/RecipeInstruction";
import NarrowOrangeButton from "../../UI/Buttons/NarrowOrangeButton/NarrowOrangeButton";
import Container from "../../UI/Container/Container";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const RecipePage = (props) => {
  const params = useParams();
  params.recipeId;
  const recipe = props.recipe;
  console.log(recipe);

  const commitRecipeHandler = (event) => {
    alert("Currenty not implemented");
    props.commitRecipeHandler();
  };

  return (
    <>
      <PageHeader />
      <PageBody>
        <Container>
          <Title className={styles.content__title}>Пошаговая инструкция</Title>
          <Content>
            <h2 className={styles["content__recipe-title"]}>
              {recipe.recipeName}
            </h2>
            <RecipeSummary recipe={recipe} />
            <RecipeInstruction instruction={recipe.instruction} />
            <NarrowOrangeButton onClick={commitRecipeHandler}>
              Завершить
            </NarrowOrangeButton>
          </Content>
        </Container>
      </PageBody>
      <PageFooter />
    </>
  );
};

export default RecipePage;
