import styles from "./RecipeListPage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageBody from "../../UI/PageBody/PageBody";
import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import RecipeCardList from "./RecipeCardList/RecipeCardList";
import FindRecipesForm from "./FindRecipesForm/FindRecipesForm";

const RecipeListPage = (props) => {
  const recipes = props.recipes;

  return (
    <>
      <PageHeader />
      <PageBody>
        <Container>
          <Title className={styles["recipe-list-page__title"]}>
            Подбор рецептов
          </Title>
          <Content>
            <FindRecipesForm />

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
