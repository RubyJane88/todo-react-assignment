import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { Country } from "../models/country";

type Props = {
  handleSelectCountry: (country: Country) => void;
  countries: Country[];
};

const ChooseCountry = ({ handleSelectCountry, countries }: Props) => {
  const classes = useStyles();

  const handleOnChange = ({ target }: ChangeEvent<any>) => {
    const selectedCountry = countries.find(
      (country) => country.name === target.innerText
    );

    if (!selectedCountry) return;

    selectedCountry.id = selectedCountry.name;
    handleSelectCountry(selectedCountry);
  };

  const renderInputTextField = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label="Country I want to visit ✈️"
        variant="outlined"
        inputProps={{
          ...params.inputProps,
        }}
      />
    );
  };

  return (
    <Autocomplete
      autoHighlight
      style={{ width: "auto", marginBottom: "1rem" }}
      classes={{
        option: classes.option,
      }}
      options={countries}
      getOptionLabel={(option) => option.name}
      renderOption={(option) => <span>{option.name}</span>}
      onChange={handleOnChange}
      renderInput={renderInputTextField}
    />
  );
};

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default ChooseCountry;
