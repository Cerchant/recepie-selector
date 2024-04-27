import { Autocomplete, TextField } from "@mui/material";
import styles from "./Select.module.css";

const Select = (props) => {
  return (
    <label className={styles.select + " " + props.className}>
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
        options={props.options}
        value={props.value}
        onChange={props.changeValueHandler}
        inputValue={props.inputValue}
        onInputChange={props.changeInputValueHandler}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} placeholder="Имеющиеся продукты" />
        )}
      />
    </label>
  );
};

export default Select;
