import styles from "./ExtendedRegistrationPage.module.css";
import ExtendedRegistrationForm from "./ExtendedRegistrationForm/ExtendedRegistrationForm";

const ExtendedRegistrationPage = (props) => {
  return (
    <div className={styles["extended-registration-page"]}>
        <picture className={styles["page-header__logo"]}>
          <img
            className={styles["page-header__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>

      <div className={styles["extended-registration-page__content"]}>
        <p className={styles["extended-registration-page__title-text"]}>Пожалуйста, укажите дополнительную информацию о себе</p>

        <ExtendedRegistrationForm />

      </div>
    </div>
  );
};

export default ExtendedRegistrationPage;