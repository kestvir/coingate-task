import { SyntheticEvent } from "react";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider, InputBase, Box } from "@mui/material";

import CurrencyAutocomplete from "./CurrencyAutocomplete";
import CurrencyImage from "./CurrencyImage";

const StyledInputWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #D9D9D9",
  borderRadius: "20px",
  maxHeight: "48px",
});

const StyledInputField = styled(InputBase)({
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
  id: string;
  startAdormentText: string;
  currency: string;
  currencies: Array<string>;
  handleChangeCurrency: (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => void;
};

export default function CurrenciesInput({
  value,
  id,
  startAdormentText,
  currency,
  currencies,
  handleChangeCurrency,
}: Props) {
  return (
    <StyledInputWrapper>
      <StyledInputField
        value={value}
        inputProps={{ style: { textAlign: "center" } }}
        startAdornment={
          <InputAdornment position="start">{startAdormentText}</InputAdornment>
        }
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        width={"30%"}
      >
        <StyledDivider orientation="vertical" />
        {currency && <CurrencyImage currency={currency} />}
        <CurrencyAutocomplete
          id={id}
          value={currency}
          currencies={currencies}
          handleChangeCurrency={handleChangeCurrency}
        />
      </Box>
    </StyledInputWrapper>
  );
}
