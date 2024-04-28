import styles from "./NarrowOrangeButton.module.css";

const NarrowOrangeButton = (props) => {
  return (
    <button
      className={styles["narrow-orange-button"] + " " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default NarrowOrangeButton;
