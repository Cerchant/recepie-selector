import styles from "./PageHeader.module.css";
import { useHistory } from "react-router-dom";

const PageHeader = (props) => {
  const history = useHistory();

  const logoHandler = () => {
    history.push('/recipe');
  };

  const profileHandler = () => {
    history.push('/profile');
  };

  return (
    <header className={`${styles["page-header"]} ${props.className}`}>
      <div className={styles["page-header__container"]}>
        <picture className={styles["page-header__logo"]} onClick={logoHandler}>
          <img
            className={styles["page-header__logo-img"]}
            src="/public/logo.svg"
            alt="logo"
          />
        </picture>
        <picture className={styles["page-header__user"]} onClick={profileHandler}>
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
