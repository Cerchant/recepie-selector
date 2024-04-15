import styles from "./Title.module.css";

const Title = (props) => {
  return (
    <h1 className={`${styles.title} ${props.className}`}>{props.children}</h1>
  );
};

export default Title;
