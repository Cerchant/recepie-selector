import { useState } from "react";
import styles from "./ArrowButton.module.css";

const ArrowButton = (props) => {
  const [isActive, setIsactive] = useState(false);
  const onClickHandler = () => {
    setIsactive((prevState) => !prevState);
    if (props.onClick !== undefined) {
      props.onClick();
    }
  };
  return (
    <button
      onClick={onClickHandler}
      className={
        styles.btn +
        " " +
        props.className +
        ` ${isActive && styles["btn--active"]}`
      }
    ></button>
  );
};

export default ArrowButton;
