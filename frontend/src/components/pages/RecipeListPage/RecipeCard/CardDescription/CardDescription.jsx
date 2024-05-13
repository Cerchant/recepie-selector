import NarrowOrangeButton from "../../../../UI/Buttons/NarrowOrangeButton/NarrowOrangeButton";
import RecipeSummary from "../../../../UI/RecipeSummary/RecipeSummary";
import styles from "./CardDescription.module.css";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CardDescription = (props) => {
  const history = useHistory()
  const recipe = props.recipe;

  const startCookingHandler = () => {
    history.push(`/recipe/${recipe.id}`)
  };

  return (
    <div
      className={
        styles.content + " " + `${props.isOpened && styles["content--opened"]}`
      }
    >
      <RecipeSummary recipe={recipe} />

      <p className={styles.content__description}>{recipe.description}</p>

      <NarrowOrangeButton
        className={styles.content__btn}
        onClick={startCookingHandler}
      >
        Начать
      </NarrowOrangeButton>
    </div>
  );
};

export default CardDescription;
