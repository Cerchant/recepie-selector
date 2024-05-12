import styles from "./EditButton.module.css";

const EditButton = (props) => {
  return (
    <div className={styles.btn + " " + props.className} onClick={props.onClick}>
      <svg width="25" height="25" className={styles.btn__container}>
        <use xlinkHref="/src/assets/edit.svg#edit"></use>
      </svg>
    </div>
  );
};

export default EditButton;
