import styles from "./MiddleColumn.module.css";

const MiddleColumn = (props) => {
  return (
    <div className={styles["middle-column"] + " " + props.className}>
      <p className={styles["middle-column__text"]}>Список продуктов</p>
      <ul className={styles["middle-column__list"]}>
        {props.ingridients.map((ingridient, index) => (
          <li className={styles["middle-column__list-item"]} key={index}>
            {ingridient}
          </li>
        ))}
      </ul>
      <p>Масса одной порции:</p>
      <p>{props.portionMass} грам</p>
    </div>
  );
};

export default MiddleColumn;
