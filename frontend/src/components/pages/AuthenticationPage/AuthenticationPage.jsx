import styles from "./AuthenticationPage.module.css";
import AuthenticationForm from "./AuthenticationForm/AuthenticationForm";

import { Link } from "react-router-dom";

const AuthenticationPage = (props) => {
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
          <Link to='/login' className={styles["authentication-page__tab-button__active"]}>Вход</Link>
          <Link to='/registration' className={styles["authentication-page__tab-button"]}>Регистрация</Link>
        </div>

        <AuthenticationForm />

        <p className={styles["authentication-page__agreement-text"]}>Регистрируясь, я принимаю условия Политики конфиденциальности и Пользовательского соглашения</p>

      </div>
    </div>
  );
};

export default AuthenticationPage;