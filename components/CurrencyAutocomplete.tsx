import { SyntheticEvent } from "react";
import {
  Autocomplete,
  Typography,
  TextField,
  Box,
  Popper,
  PopperProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CurrencyImage from "./CurrencyImage";

type Props = {
  currencies: Array<string>;
  handleChangeCurrency: (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  id: string;
  value: string;
};

const CustomPopper = function (props: PopperProps) {
  return (
    <Popper
      {...props}
      style={{
        width: "120px",
      }}
      placement="bottom-start"
    />
  );
};

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export default function StyledAutocomplete({
  currencies,
  handleChangeCurrency,
  id,
  value,
}: Props) {
  return (
    <Autocomplete
      id={id}
      PopperComponent={CustomPopper}
      value={value}
      disableClearable
      onChange={handleChangeCurrency}
      options={currencies}
      autoHighlight
      renderOption={(props, option: any) => {
        return (
          <Box component="li" px={1} key={Math.random()} {...props}>
            <CurrencyImage currency={option} />

            <Typography component="span" ml={1}>
              {option}
            </Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          inputProps={{ ...params.inputProps, style: { fontSize: "14px" } }}
        />
      )}
    />
  );
}
