import styles from "./PageBody.module.css";

const PageBody = (props) => {
  const classes = props.className;
  return (
    <main className={styles["page-body"] + " " + classes}>
      {props.children}
    </main>
  );
};

export default PageBody;
