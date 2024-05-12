
import styles from "./RegistrationForm.module.css";
import Button from "../../../UI/Buttons/Button/Button";

import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const RegistrationForm = (props) => {
  const token = localStorage.getItem("token");
  const user = props.user;

  const emailError = "Неверный email";
  const passwordError = "Пароль должен быть длиной не менее 8 символов";
  const confirmPasswordError = "Пароли должны совпадать";

  const [emailInput, setEmailInput] = useState();
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [passwordInput, setPasswordInput] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);

  const emailInputChangeHandler = (e) => {
    setEmailInput(e.target.value);
    setEmailIsValid(validateEmail(e.target.value));
  };

  const passwordInputChangeHandler = (e) => {
    setPasswordInput(e.target.value);
    setPasswordIsValid(e.target.value.length >= 8);
    setConfirmPasswordIsValid(e.target.value === confirmPasswordInput);
  };

  const confirmPasswordInputChangeHandler = (e) => {
    setConfirmPasswordInput(e.target.value);
    setConfirmPasswordIsValid(e.target.value === passwordInput);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('username', emailInput);
    bodyFormData.append('username', emailInput);
    bodyFormData.append('password', passwordInput);
    bodyFormData.append('password', passwordInput);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/auth/sing-up",
        {
          email: emailInput,
          username: emailInput,
          password: passwordInput,
          repeatPassword: confirmPasswordInput
        },
      );
      localStorage.setItem(
        "token", data.access_token
      );
      setPasswordIsValid(true);
    } catch (ex) {
      const { response } = ex;
      console.log(response);
      if (response?.data.detail === "A user with this name already exists. Use a different name.") {
        setEmailIsValid(false);
      } else {
        alert("Что-то пошло не так")
      }
    }
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

  return (
    <form className={styles.form} onSubmit={submitHandler}>
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
        error={!passwordIsValid}
        helperText={!passwordIsValid && passwordError}
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

      <Button className={styles.form__submit} color="#F2AA55" type="submit">
        Зарегестрироваться
      </Button>
      
    </form>
  );
};

export default RegistrationForm;
