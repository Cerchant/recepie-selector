import styles from "./RegistrationPage.module.css";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

import { Link } from "react-router-dom";

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
          <Link to='/login' className={styles["registration-page__tab-button"]}>Вход</Link>
          <Link to='/registration' className={styles["registration-page__tab-button__active"]}>Регистрация</Link>
        </div>

        <RegistrationForm />

  
      </div>
    </div>
  );
};

export default RegistrationPage;