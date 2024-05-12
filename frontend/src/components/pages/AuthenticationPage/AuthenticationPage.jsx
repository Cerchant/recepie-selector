import styles from "./AuthenticationPage.module.css";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm";

import { useHistory } from "react-router-dom";

const AuthenticationPage = (props) => {
  const history = useHistory();

  const toLoginHandler = () => {
    history.push("/login");
  };

  const toRegistrationHandler = () => {
    history.push("/registration");
  };

  return (
    <div className={styles["authentication-page"]}>
        <picture className={styles["page-header__logo"]}>
          <img
            className={styles["page-header__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>

      <div className={styles["authentication-page__content"]}>
        <div className={styles["authentication-page__tabs"]}>
          <button className={styles["authentication-page__tab-button__active"]} type="button" onClick={toLoginHandler}>Вход</button>
          <button className={styles["authentication-page__tab-button"]} type="button" onClick={toRegistrationHandler}>Регистрация</button>
        </div>

        <AuthenticationForm />

        <p className={styles["authentication-page__agreement-text"]}>Регистрируясь, я принимаю условия Политики конфиденциальности и Пользовательского соглашения</p>

      </div>
    </div>
  );
};

export default AuthenticationPage;