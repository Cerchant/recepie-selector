import styles from "./RecipeSummary.module.css";
import MiddleColumn from "./MiddleColumn/MiddleColumn";
import KBJUInfo from "./KBJUInfo/KBJUInfo";
import Img from "../Image/Img";

const RecipeSummary = (props) => {
  const recipe = props.recipe;
  return (
    <div className={styles.content}>
      <Img width={"45%"} height={333} src={recipe.imageLink} />
      <MiddleColumn
        className={styles.content__middle}
        ingridients={recipe.ingridients}
        portionMass={recipe.portionMass}
      />
      <KBJUInfo
        className={styles.content__kbju}
        kbju={recipe.kbju}
        portionMass={recipe.portionMass}
      />
    </div>
  );
};

export default RecipeSummary;
