import { ChangeEvent, SyntheticEvent } from "react";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import BuyCurrencyAutocomplete from "./BuyCurrencyAutocomplete";

import CurrencyImage from "../UI/CurrencyImage";

const StyledInputWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #D9D9D9",
  borderRadius: "20px",
  maxHeight: "48px",
});

const StyledInputField = styled(TextField)({
  width: "70%",
  paddingLeft: "20px",
});

const StyledDivider = styled(Divider)({
  height: "28px",
  margin: "4px",
  color: "#D9D9D9",
});

type Props = {
  value: string;
  inputId: string;
  name: string;
  autocompleteId: string;
  startAdormentText: string;
  currency: string;
  currencies: Array<string>;
  error: boolean | undefined;
  helperText: string | false | undefined;
  handleChangeCurrency: (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => void;
  handleChangeValue: (e: ChangeEvent<any>) => void;
};

export default function BuyCurrencyInput({
  value,
  inputId,
  name,
  autocompleteId,
  startAdormentText,
  currency,
  currencies,
  error,
  helperText,
  handleChangeCurrency,
  handleChangeValue,
}: Props) {
  return (
    <>
      <StyledInputWrapper>
        <StyledInputField
          id={inputId}
          name={name}
          value={value}
          variant="standard"
          onChange={handleChangeValue}
          inputProps={{ style: { textAlign: "center" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {startAdormentText}
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          width={"30%"}
        >
          <StyledDivider orientation="vertical" />
          {currency && <CurrencyImage currency={currency} />}
          <BuyCurrencyAutocomplete
            id={autocompleteId}
            value={currency}
            currencies={currencies}
            handleChangeCurrency={handleChangeCurrency}
          />
        </Box>
      </StyledInputWrapper>
      {error && (
        <Typography ml="5px" mt="-17px" variant="body2" color="error.main">
          {helperText}
        </Typography>
      )}
    </>
  );
}
