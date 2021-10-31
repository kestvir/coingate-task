import { SyntheticEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider, InputBase, Select, Typography } from "@mui/material";

import StyledButton from "./StyledButton";
import CurrencyAutocomplete from "./CurrencyAutocomplete";
import CurrencyImage from "./CurrencyImage";

const StyledFormBackground = styled("div")({
  position: "absolute",
  top: "-50px",
  left: "-48px",
  background: "#E9F6FF",
  border: "1px solid #E8E8E8",
  boxSizing: "border-box",
  borderRadius: "20px",
  transform: "rotate(-5.53deg)",
  minHeight: "30vw",
  width: "20vw",
  zIndex: -1000,
});

const StyledFormWrapper = styled(Paper)({
  padding: "30px 20px",
  borderRadius: "20px",
  minHeight: "30vw",
  display: "flex",
  flexDirection: "column",
});

const StyledForm = styled("form")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "20px",
  marginTop: "5vw",
});

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

const StyledSelect = styled(Select)({
  borderRadius: "20px",
  marginTop: "20px",
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BuyCurrencyForm() {
  const { data: currencyData, error } = useSWR(
    "https://api.codetabs.com/v1/proxy?quest=https://api.coingate.com/v2/currencies",
    fetcher
  );

  const [crypto, setCrypto] = useState<Array<string>>([]);
  const [fiat, setFiat] = useState<Array<string>>([]);
  const [pay, setPay] = useState({ currency: "USD", value: null });
  const [buy, setBuy] = useState({ currency: "BTC", value: null });

  useEffect(() => {
    const cryptoCurrencies: Array<string> = [];
    const fiatCurrencies: Array<string> = [];

    if (currencyData) {
      currencyData.forEach((currency: any) => {
        if (currency.kind === "crypto") {
          cryptoCurrencies.push(currency.symbol);
        } else fiatCurrencies.push(currency.symbol);
      });
    }

    setCrypto(cryptoCurrencies);
    setFiat(fiatCurrencies);
  }, [currencyData]);

  function handleChangeCurrency(
    event: SyntheticEvent<Element, Event>,
    value: any
  ) {
    const { currentTarget } = event;

    if (currentTarget.id.includes("buyCurrency")) {
      setBuy((prevState) => ({
        ...prevState,
        currency: value,
      }));
    } else if (currentTarget.id.includes("payCurrency")) {
      setPay((prevState) => ({
        ...prevState,
        currency: value,
      }));
    }
  }

  return (
    <Box position="relative">
      <StyledFormBackground />
      <StyledFormWrapper>
        <StyledForm>
          <StyledInputWrapper>
            <StyledInputField
              inputProps={{ style: { textAlign: "center" } }}
              startAdornment={
                <InputAdornment position="start">Pay</InputAdornment>
              }
            />

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              width={"30%"}
            >
              <StyledDivider orientation="vertical" />
              {pay.currency && <CurrencyImage currency={pay.currency} />}
              <CurrencyAutocomplete
                id="payCurrency"
                value={pay.currency}
                currencies={fiat}
                handleChangeCurrency={handleChangeCurrency}
              />
            </Box>
          </StyledInputWrapper>

          <StyledInputWrapper>
            <StyledInputField
              inputProps={{ style: { textAlign: "center" } }}
              startAdornment={
                <InputAdornment position="start">Buy</InputAdornment>
              }
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              width={"30%"}
            >
              <StyledDivider orientation="vertical" />
              {buy.currency && <CurrencyImage currency={buy.currency} />}
              <CurrencyAutocomplete
                id="buyCurrency"
                value={buy.currency}
                currencies={crypto}
                handleChangeCurrency={handleChangeCurrency}
              />
            </Box>
          </StyledInputWrapper>

          <Typography>Payment method</Typography>

          <StyledSelect></StyledSelect>

          <StyledButton sx={{ marginTop: "auto" }} fullWidth={true}>
            Buy {buy.currency}
          </StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </Box>
  );
}
