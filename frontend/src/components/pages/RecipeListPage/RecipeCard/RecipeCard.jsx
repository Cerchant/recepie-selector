import { useState } from "react";
import ArrowButton from "../ArrowButton/ArrowButton";
import styles from "./RecipeCard.module.css";
import Img from "../../../UI/Image/Img";
import CardDescription from "./CardDescription/CardDescription";

const RecipeCard = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const recipe = props.recipe;

  const openHandler = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <article className={styles.card}>
      <div
        className={
          styles.card__wrapper +
          ` ${isOpened && styles["card__wrapper--active"]}`
        }
      >
        <div className={styles.card__container}>
          <Img width={76} minHeight={76} radius={50} src={recipe.imageLink} />
          <h3 className={styles.card__title}>{recipe.recipeName}</h3>
          <ArrowButton className={styles.card__btn} onClick={openHandler} />
        </div>
      </div>
      <CardDescription
        startCookingHandler={props.startCookingHandler}
        recipe={recipe}
        isOpened={isOpened}
      />
    </article>
  );
};

export default RecipeCard;
