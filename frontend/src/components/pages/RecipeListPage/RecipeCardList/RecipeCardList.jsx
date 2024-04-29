import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipeCardList.module.css";

const RecipeCardList = (props) => {
  const recipes = props.recipes;

  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => {
        return (
          <li key={recipe.id} className={styles.list__item}>
            <RecipeCard
              startCookingHandler={props.startCookingHandler}
              recipe={recipe}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeCardList;
