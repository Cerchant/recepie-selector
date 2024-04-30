import { Autocomplete, TextField } from "@mui/material";
import Img from "../../../UI/Image/Img";
import styles from "./ProfileForm.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../UI/Buttons/Button/Button";
import EditButton from "../../../UI/Buttons/EditButton/EditButton";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ProfileForm = (props) => {
  const user = props.user;

  const emailError = "Некорректный email";
  const passwordError = "Пароль должен быть длинее 8 символов";
  const confirmPasswordError = "Пароли должны совпадать";

  const [isEdit, setIsEdit] = useState(false);

  const [emailInput, setEmailInput] = useState(user.email);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [passwordInput, setPasswordInput] = useState();
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordIsValid, setNewPasswordIsValid] = useState(true);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  const [ageInput, setAgeInput] = useState(user.age);
  const [ageIsValid, setAgeIsValid] = useState(true);

  const [heightInput, setHeightInput] = useState(user.height);
  const [heightIsValid, setHeightIsValid] = useState(true);

  const [weightInput, setWeightInput] = useState(user.weight);
  const [weightIsValid, setWeightIsValid] = useState(true);

  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    user.intolerantProducts.map((product) => ({
      title: product,
    }))
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      const fetchedOptions = (
        await axios.get("http://127.0.0.1:8000/business/products")
      ).data.productList;

      setOptions(() => {
        const data = [];
        for (let i = 0; i < fetchedOptions.length; i++) {
          data.push({
            title: fetchedOptions[i],
          });
        }
        return data;
      });
    }
    fetchOptions();
  }, []);

  const changeSelectedProductsHandler = (_, value) => {
    setSelectedProducts(value);
  };
  const changeInputValueHandler = (_, value) => {
    setInputValue(value);
  };

  const muiStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#C0D899",
        },
      },
    },
    "& .MuiFormLabel-root": {
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "#C0D899",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#C0D899",
        },
      },
    },
  };

  const emailInputChangeHandler = (e) => {
    setEmailInput(e.target.value);
    setEmailIsValid(validateEmail(e.target.value));
  };

  const passwordInputChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };

  const ageInputChangeHandler = (e) => {
    setAgeInput(e.target.value);
    setAgeIsValid(+e.target.value > 0);
  };

  const heightInputChangeHandler = (e) => {
    setHeightInput(e.target.value);
    setHeightIsValid(+e.target.value > 0);
  };

  const weightInputChangeHandler = (e) => {
    setWeightInput(e.target.value);
    setWeightIsValid(+e.target.value > 0);
  };

  const newPasswordInputChangeHandler = (e) => {
    setNewPasswordInput(e.target.value);
    setNewPasswordIsValid(e.target.value.length >= 8);
  };

  const confirmPasswordInputChangeHandler = (e) => {
    setConfirmPasswordInput(e.target.value);
    setConfirmPasswordIsValid(e.target.value === newPasswordInput);
  };

  const editClickHandler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <form className={styles.form}>
      <div className={styles.form__avatar}>
        <Img
          className={styles.form__photo}
          minHeight={200}
          height={300}
          width={300}
          radius={50}
          src={
            "https://shapka-youtube.ru/wp-content/uploads/2020/08/man-silhouette.jpg"
          }
        />
        <Button
          className={styles["form__change-photo"]}
          color="#C5C484"
          type="button"
        >
          Изменить фото
        </Button>
      </div>

      <div className={styles.form__wrapper}>
        <div className={styles.form__fields}>
          <TextField
            className={styles.form__field}
            sx={muiStyles}
            error={!emailIsValid}
            label="Электронная почта"
            defaultValue={emailInput}
            value={emailInput}
            onChange={emailInputChangeHandler}
            helperText={!emailIsValid && emailError}
            required
          />

          <TextField
            className={styles.form__field}
            sx={muiStyles}
            label="Пароль"
            defaultValue={passwordInput}
            value={passwordInput}
            onChange={passwordInputChangeHandler}
            type="password"
            disabled={!isEdit}
            required={isEdit}
          />

          <EditButton
            className={
              styles.form__edit + " " + (isEdit && styles["form__edit--active"])
            }
            onClick={editClickHandler}
          />

          {isEdit && (
            <>
              <TextField
                className={styles.form__field}
                sx={muiStyles}
                error={!newPasswordIsValid}
                label="Новый пароль"
                defaultValue={newPasswordInput}
                value={newPasswordInput}
                onChange={newPasswordInputChangeHandler}
                helperText={!newPasswordIsValid && passwordError}
                type="password"
                disabled={!isEdit}
                required
              />
              <TextField
                className={styles.form__field}
                sx={muiStyles}
                error={!confirmPasswordIsValid}
                label="Подтвердите пароль"
                defaultValue={confirmPasswordInput}
                value={confirmPasswordInput}
                onChange={confirmPasswordInputChangeHandler}
                helperText={!confirmPasswordIsValid && confirmPasswordError}
                type="password"
                disabled={!isEdit}
                required
              />
            </>
          )}

          <div className={styles.form__group}>
            <TextField
              className={styles["form__field--w100"]}
              sx={muiStyles}
              error={!ageIsValid}
              label="Возраст"
              defaultValue={ageInput}
              value={ageInput}
              onChange={ageInputChangeHandler}
              type="number"
              required
            />
            <TextField
              className={styles["form__field--w100"]}
              sx={muiStyles}
              error={!heightIsValid}
              label="Рост"
              defaultValue={heightInput}
              value={heightInput}
              onChange={heightInputChangeHandler}
              type="number"
              required
            />
            <TextField
              className={styles["form__field--w100"]}
              sx={muiStyles}
              error={!weightIsValid}
              label="Вес"
              defaultValue={weightInput}
              value={weightInput}
              onChange={weightInputChangeHandler}
              type="number"
              required
            />
          </div>
          <label className={styles.form__select}>
            <Autocomplete
              sx={muiStyles}
              multiple
              options={options}
              value={selectedProducts}
              onChange={changeSelectedProductsHandler}
              inputValue={inputValue}
              onInputChange={changeInputValueHandler}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Непереносимые продукты"
                  label="Непереносимые продукты"
                />
              )}
            />
          </label>
        </div>
        <Button className={styles.form__submit} color="#F2AA55" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
