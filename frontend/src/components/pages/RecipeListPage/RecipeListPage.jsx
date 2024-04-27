import styles from "./RecipeListPage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageBody from "../../UI/PageBody/PageBody";
import Container from "../../UI/Container/Container";
import Content from "../../UI/Content/Content";
import RecipeCard from "./RecipeCard/RecipeCard";
import RecipeCardList from "./RecipeCardList/RecipeCardList";
import NarrowOrangeButton from "../../UI/Buttons/NarrowOrangeButton/NarrowOrangeButton";

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
            <h1>ВОТ ТУТ ДОЛЖНА БЫТЬ ФОРМА</h1>

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
