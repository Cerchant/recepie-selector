import styles from "./Content.module.css";

const Content = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};

export default Content;
