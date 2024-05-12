import styles from "./RegistrationPage.module.css";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

import { useHistory } from "react-router-dom";

const RegistrationPage = (props) => {
  const history = useHistory();

  const toLoginHandler = () => {
    history.push("/login");
  };

  const toRegistrationHandler = () => {
    history.push("/registration");
  };

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
          <button className={styles["registration-page__tab-button"]} type="button" onClick={toLoginHandler}>Вход</button>
          <button className={styles["registration-page__tab-button__active"]} type="button" onClick={toRegistrationHandler}>Регистрация</button>
        </div>

        <RegistrationForm />

  
      </div>
    </div>
  );
};

export default RegistrationPage;