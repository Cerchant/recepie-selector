import styles from "./PageFooter.module.css";

const PageFooter = (props) => {
  return (
    <footer className={`${styles["page-footer"]} ${props.className}`}>
      <div className={styles["page-footer__container"]}>
        <picture className={styles["page-footer__logo"]}>
          <img
            className={styles["page-footer__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>
      </div>
    </footer>
  );
};

export default PageFooter;
