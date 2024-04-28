import styles from "./NarrowOrangeButton.module.css";

const NarrowOrangeButton = (props) => {
<<<<<<< HEAD
  return (
    <button
      className={styles["narrow-orange-button"] + " " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
=======
    return <button className="narrow-orange-button" onClick={props.onClick}>{props.text}</button>;
}
>>>>>>> e50d37de3a026563083c4877786a22fa4933f540

export default NarrowOrangeButton;