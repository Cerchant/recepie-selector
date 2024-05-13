import axios from "axios";
import Button from "../../../UI/Buttons/Button/Button";
import Check from "../../../UI/Check/Check";
import styles from "./FindRecipesForm.module.css";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const FindRecipesForm = (props) => {
  const token = localStorage.getItem("token");
  const [options, setOptions] = useState([]);

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    console.log(isChecked);
    async function fetchOptions() {
      const fetchedOptions = (
        await axios.put(
          "http://127.0.0.1:8000/business/products",
          {
            intolerable: isChecked,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).data.productList;

      setOptions(fetchedOptions.map((opt) => ({ title: opt })));
      setValue(fetchedOptions.map((opt) => ({ title: opt })));
    }
    fetchOptions();
  }, [isChecked]);

  // const options = [
  //   { title: "рыба" },
  //   { title: "молоко" },
  //   { title: "хлеб" },
  //   { title: "курица" },
  // ];

  const changeValueHandler = (_, value) => {
    setValue(value);
  };
  const changeInputValueHandler = (_, value) => {
    setInputValue(value);
  };

  const changeCheckHandler = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = {
      ProductsList: value.map((v) => v.title),
    };
    console.log(body);
    const fetchedRecipes = (
      await axios.post("http://127.0.0.1:8000/business/recipes", body, config)
    ).data;

    props.handleRecipes(fetchedRecipes);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.form__title}>Имеющиеся продукты</h2>
      <div className={styles.form__container}>
        <label className={styles.form__select}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C0D899",
                  },
                },
              },
            }}
            multiple
            id="tags-outlined"
            options={options}
            value={value}
            onChange={changeValueHandler}
            inputValue={inputValue}
            onInputChange={changeInputValueHandler}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} placeholder="Имеющиеся продукты" />
            )}
          />
        </label>
        <Button className={styles.form__submit} color="#C5C484" type="submit">
          Найти рецепты
        </Button>
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
