import SubmitButton from "../../../UI/Buttons/SubmitButton/SubmitButton";
import Check from "../../../UI/Check/Check";
import Select from "../../../UI/Select/Select";
import styles from "./FindRecipesForm.module.css";
import { useState } from "react";

const FindRecipesForm = (props) => {
  const options = [
    { title: "рыба" },
    { title: "молоко" },
    { title: "хлеб" },
    { title: "курица" },
  ];

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const changeValueHandler = (_, value) => {
    setValue(value.title);
  };
  const changeInputValueHandler = (_, value) => {
    setInputValue(value);
  };
  const changeCheckHandler = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.form__title}>Имеющиеся продукты</h2>
      <div className={styles.form__container}>
        <Select
          className={styles.form__select}
          options={options}
          value={value}
          onChange={changeValueHandler}
          inputValue={inputValue}
          onInputChange={changeInputValueHandler}
        />
        <SubmitButton className={styles.form__submit} color="#C5C484">
          Найти рецепты
        </SubmitButton>
      </div>
      <Check
        onChange={changeCheckHandler}
        checked={isChecked}
        className={styles.form__ckeck}
      >
        Исключить рецепты с непереносимыми продуктами
      </Check>
    </form>
  );
};

export default FindRecipesForm;
