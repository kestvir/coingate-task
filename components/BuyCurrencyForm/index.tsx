import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { styled } from "@mui/material/styles";
import { Select, Typography, Box, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import StyledButton from "../UI/StyledButton";
import BuyCurrencyInput from "./BuyCurrencyInput";

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

const StyledSelect = styled(Select)({
  borderRadius: "20px",
  marginTop: "20px",
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BuyCurrencyForm() {
  const { data: currenciesData, error: currenciesError } = useSWR(
    "https://api.codetabs.com/v1/proxy?quest=https://api.coingate.com/v2/currencies",
    fetcher
  );
  const { data: ratesData, error: ratesError } = useSWR(
    "https://api.codetabs.com/v1/proxy?quest=https://api.coingate.com/v2/rates",
    fetcher
  );

  const [crypto, setCrypto] = useState<Array<string>>([]);
  const [fiat, setFiat] = useState<Array<string>>([]);
  const [pay, setPay] = useState({ currency: "USD", value: "" });
  const [buy, setBuy] = useState({ currency: "BTC", value: "" });

  useEffect(() => {
    const cryptoCurrencies: Array<string> = [];
    const fiatCurrencies: Array<string> = [];

    if (currenciesData) {
      currenciesData.forEach((currency: any) => {
        if (currency.kind === "crypto") {
          cryptoCurrencies.push(currency.symbol);
        } else fiatCurrencies.push(currency.symbol);
      });
    }

    setCrypto(cryptoCurrencies);
    setFiat(fiatCurrencies);
  }, [currenciesData]);

  const validationSchema = yup.object({});

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Box position="relative">
      <StyledFormBackground />
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <BuyCurrencyInput
            value={pay.value}
            id="payCurrency"
            startAdormentText="Pay"
            currency={pay.currency}
            currencies={fiat}
            handleChangeCurrency={handleChangeCurrency}
          />

          <BuyCurrencyInput
            value={buy.value}
            id="buyCurrency"
            startAdormentText="Buy"
            currency={buy.currency}
            currencies={crypto}
            handleChangeCurrency={handleChangeCurrency}
          />

          <Typography>Payment method</Typography>

          <StyledSelect></StyledSelect>

          <StyledButton
            disabled={!buy.value}
            sx={{ marginTop: "auto" }}
            fullWidth={true}
          >
            Buy {buy.currency}
          </StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </Box>
  );
}
