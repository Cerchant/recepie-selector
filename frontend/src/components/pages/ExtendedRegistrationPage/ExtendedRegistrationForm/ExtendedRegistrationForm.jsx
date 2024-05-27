import styles from "./ExtendedRegistrationForm.module.css";
import Button from "../../../UI/Buttons/Button/Button";

import { useHistory } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ExtendedRegistrationForm = (props) => {
  const history = useHistory();

  const [ageInput, setAgeInput] = useState();
  const [ageIsValid, setAgeIsValid] = useState(true);

  const [heightInput, setHeightInput] = useState();
  const [heightIsValid, setHeightIsValid] = useState(true);

  const [weightInput, setWeightInput] = useState();
  const [weightIsValid, setWeightIsValid] = useState(true);

  const [options, setOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      const fetchedOptions = (
        await axios.put(
          "http://127.0.0.1:8000/business/products",
          { intolerable: false },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
      ).data.productList;
      console.log(fetchedOptions);
      setOptions(fetchedOptions.map((option) => ({ title: option })));
    }
    fetchOptions();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!(ageIsValid && weightIsValid && heightIsValid)) {
      alert("Необходимо исправить ошибки в форме");
      return;
    }
    try {
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
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      history.push("/recipe");
    } catch (ex) {
      const { response } = ex;
      console.log(response);
      if (response?.data.detail === "Could not validate credentials") {
        alert("Сессия истекла");
      } else {
        alert("Что-то пошло не так");
      }
    }
  };

  const changeSelectedProductsHandler = (_, value) => {
    setSelectedProducts(value);
  };
  const changeInputValueHandler = (_, value) => {
    setInputValue(value);
  };

  const muiStyles = {
    maxWidth: "345px",
    margin: "0 auto",
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

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.form__wrapper}>
        <div className={styles.form__fields}>
          <div className={styles.form__group}>
            <TextField
              className={styles["form__field--w100"]}
              sx={{ ...muiStyles, maxWidth: "80px" }}
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
              sx={{ ...muiStyles, maxWidth: "80px" }}
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
              sx={{ ...muiStyles, maxWidth: "80px" }}
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
          Далее
        </Button>
      </div>
    </form>
  );
};

export default ExtendedRegistrationForm;
