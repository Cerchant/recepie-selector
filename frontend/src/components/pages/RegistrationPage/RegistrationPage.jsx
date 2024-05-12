import styles from "./RegistrationPage.module.css";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

const RegistrationPage = (props) => {
  return (
    <div className={styles["registration-page"]}>
        <picture className={styles["page-header__logo"]}>
          <img
            className={styles["page-header__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>

      <div className={styles["registration-page__content"]}>
        <div className={styles["registration-page__tabs"]}>
          <button className={styles["registration-page__tab-button"]}>Вход</button>
          <button className={styles["registration-page__tab-button__active"]}>Регистрация</button>
        </div>

        <RegistrationForm />

  
      </div>
    </div>
  );
};

export default RegistrationPage;