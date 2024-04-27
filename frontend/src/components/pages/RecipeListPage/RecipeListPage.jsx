import styles from "./RecipeListPage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";

const RecipeListPage = (props) => {
  return (
    <div className={`${styles.content} ${props.className}`}>
      <PageHeader className={styles["content__page-header"]} />
      <main className={styles["content__main"]}>
        <div className={styles["content__container"]}>
          <Title className={styles["content__title"]}>Подбор рецептов</Title>
        </div>
      </main>
      <PageFooter className={styles["content__page-footer"]} />
    </div>
  );
};

export default RecipeListPage;
