import styles from "./RecipePage.module.css";
import PageHeader from "../../UI/PageHeader/PageHeader";
import Title from "../../UI/Title/Title";
import PageFooter from "../../UI/PageFooter/PageFooter";
import PageBody from "../../UI/PageBody/PageBody";

import RecipeSummary from "../../UI/RecipeSummary/RecipeSummary";
import RecipeInstruction from "./RecipeInstruction/RecipeInstruction";
import CommitButton from "./CommitButton/CommitButton";

const RecipePage = (props) => {
  // recipe = GET('recipe/{props.id}')
  // https://daily-menu.ru/dailymenu/recipes/view/4454
  const recipe = {
    id: 1,
    recipeName: "Сырники",
    imageLink: "https://daily-menu.ru/public/modules/dailymenu/dailymenurecipes/4454/cab3242b52e212f15bc8775cb37b0e9a.JPG",
    ingridients: [
      "творог",
      "мука пшеничная",
      "яйцо куриное",
      "сахар",
      "масло подсолнечное",
    ],
    portionMass: 285,
    kbju: {
      k: 654,
      b: 38.4,
      j: 13.2,
      u: 96.4
    },
    instruction: [
      {
        text: "Взбить 2 небольших яйца с сахаром.",
        images: []
      },
      {
        text: "Растереть творог и добавить в яичную смесь.",
        images: []
      },
      {
        text: "Вымесить плотное, но мягкое тесто, понемногу добавляя муку.",
        images: []
      },
      {
        text: "Сформировать сырники и обжарить на сковороде по 4 минуты с каждой стороны при среднем огне.",
        images: ["https://daily-menu.ru/public/modules/dailymenu/dailymenurecipes/4454/cab3242b52e212f15bc8775cb37b0e9a.JPG"]
      },
    ]
  }
  return (
    <div className={`${styles.content} ${props.className}`}>
      <PageHeader className={styles["content__page-header"]} />
      <main className={styles["content__main"]}>
        <div className={styles["content__container"]}>
          <Title className={styles["content__title"]}>Пошаговая инструкция</Title>
          <PageBody>
            <h2>{recipe.recipeName}</h2>
            <RecipeSummary imageLink={recipe.imageLink} ingridients={recipe.ingridients} portionMass={recipe.portionMass} kbju={recipe.kbju}/>
            <RecipeInstruction instruction={recipe.instruction}/>
            <CommitButton />
          </PageBody>
        </div>
      </main>
      <PageFooter className={styles["content__page-footer"]} />
    </div>
  );
};

export default RecipePage;
