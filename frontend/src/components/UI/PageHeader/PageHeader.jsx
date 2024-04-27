import styles from "./PageHeader.module.css";

const PageHeader = (props) => {
  return (
    <header className={`${styles["page-header"]} ${props.className}`}>
      <div className={styles["page-header__container"]}>
        <picture className={styles["page-header__logo"]}>
          <img
            className={styles["page-header__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>
        <picture className={styles["page-header__user"]}>
          <img
            className={styles["page-header__user-img"]}
            src="/src/assets/user.svg"
            alt="logo"
          />
        </picture>
      </div>
    </header>
  );
};

export default PageHeader;
