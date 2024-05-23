import { useHistory } from "react-router-dom/";
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
  const history = useHistory();
  const token = localStorage.getItem("token");
  const user = props.user;

  const emailError = "Некорректный email";
  const oldPasswordError = "Неверный пароль";
  const passwordError = "Пароль должен быть длинее 8 символов";
  const confirmPasswordError = "Пароли должны совпадать";
  const samePasswordsError = "Новый пароль должен отличаться от старого";

  const [isEdit, setIsEdit] = useState(false);

  const [emailInput, setEmailInput] = useState(user.email);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [passwordInput, setPasswordInput] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordIsValid, setNewPasswordIsValid] = useState(true);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);
  const [isSamePasswords, setIsSamePasswords] = useState(false);

  const [ageInput, setAgeInput] = useState(user.age);
  const [ageIsValid, setAgeIsValid] = useState(true);

  const [heightInput, setHeightInput] = useState(user.height);
  const [heightIsValid, setHeightIsValid] = useState(true);

  const [weightInput, setWeightInput] = useState(user.weight);
  const [weightIsValid, setWeightIsValid] = useState(true);

  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    user.intolerableProducts.map((product) => ({
      title: product.name,
    }))
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      const fetchedOptions = (
        await axios.put(
          "http://127.0.0.1:8000/business/products",
          { intolerable: false },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).data.productList;
      console.log(fetchedOptions);
      setOptions(fetchedOptions.map((option) => ({ title: option })));
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
    setPasswordIsValid(true);
  };

  const ageInputChangeHandler = (e) => {
    setAgeInput(e.target.value);
    setAgeIsValid(e.target.value >= 3 && e.target.value <= 130);
  };

  const heightInputChangeHandler = (e) => {
    setHeightInput(e.target.value);
    setHeightIsValid(e.target.value >= 60 && e.target.value <= 270);
  };

  const weightInputChangeHandler = (e) => {
    setWeightInput(e.target.value);
    setWeightIsValid(e.target.value >= 8 && e.target.value <= 700);
  };

  const newPasswordInputChangeHandler = (e) => {
    setNewPasswordInput(e.target.value);
    setNewPasswordIsValid(e.target.value.length >= 8);

    setIsSamePasswords(false);
  };

  const confirmPasswordInputChangeHandler = (e) => {
    setConfirmPasswordInput(e.target.value);
    setConfirmPasswordIsValid(e.target.value === newPasswordInput);
  };

  const editClickHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEdit) {
      try {
        const { data } = await axios.put(
          "http://127.0.0.1:8000/auth/change-password",
          {
            old_password: passwordInput,
            new_password: newPasswordInput,
            repeat_new_password: confirmPasswordInput,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        setIsEdit(false);
      } catch (ex) {
        const { response } = ex;
        console.log(response);
        if (response?.data.detail.includes("new")) {
          setIsSamePasswords(true);
        } else {
          setPasswordIsValid(false);
        }
      }
    }
    const { data } = await axios.post(
      "http://127.0.0.1:8000/business/start",
      {
        age: ageInput,
        height: heightInput,
        weight: weightInput,
        intolerableProducts: selectedProducts.map((product) => ({
          name: product.title,
        })),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const logoutHandler = (e) => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
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
            placeholder="Пароль"
            defaultValue={passwordInput}
            value={passwordInput}
            onChange={passwordInputChangeHandler}
            type="password"
            disabled={!isEdit}
            required={isEdit}
            error={isEdit && !passwordIsValid}
            helperText={isEdit && !passwordIsValid && oldPasswordError}
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
                error={!newPasswordIsValid || isSamePasswords}
                label="Новый пароль"
                placeholder="Новый пароль"
                defaultValue={newPasswordInput}
                value={newPasswordInput}
                onChange={newPasswordInputChangeHandler}
                helperText={
                  (!newPasswordIsValid && passwordError) ||
                  (isSamePasswords && samePasswordsError)
                }
                type="password"
                required
              />
              <TextField
                className={styles.form__field}
                sx={muiStyles}
                error={!confirmPasswordIsValid}
                label="Подтвердите пароль"
                placeholder="Подтвердите пароль"
                defaultValue={confirmPasswordInput}
                value={confirmPasswordInput}
                onChange={confirmPasswordInputChangeHandler}
                helperText={!confirmPasswordIsValid && confirmPasswordError}
                type="password"
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

        <button
          className={styles.form__logout}
          type="button"
          onClick={logoutHandler}
        >
          Выйти
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
