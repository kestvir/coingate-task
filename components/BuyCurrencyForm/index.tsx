import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Paper,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import BuyCurrencyInput from "./BuyCurrencyInput";
import BuyCurrencyPaymentMethodSelect from "./BuyCurrencyPaymentMethodSelect";

import StyledButton from "../UI/StyledButton";

const StyledFormBackground = styled("div")({
  position: "absolute",
  top: "-50px",
  left: "-48px",
  background: "#E9F6FF",
  border: "1px solid #E8E8E8",
  boxSizing: "border-box",
  borderRadius: "20px",
  transform: "rotate(-5.53deg)",
  minHeight: "28vw",
  width: "20vw",
  zIndex: -1000,
  "@media (max-width: 1199px)": {
    display: "none",
  },
});

const StyledFormWrapper = styled(Paper)({
  padding: "30px 20px",
  borderRadius: "20px",
  display: "flex",
  minHeight: "20vw",
  flexDirection: "column",
  "@media (max-width: 1199px)": {
    marginTop: "60px",
  },
});

const StyledForm = styled("form")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "20px",
  marginTop: "5vw",
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

  const router = useRouter();

  const [crypto, setCrypto] = useState<Array<string>>([]);
  const [fiat, setFiat] = useState<Array<string>>([]);
  const [payCurrency, setPayCurrency] = useState("USD");
  const [buyCurrency, setBuyCurrency] = useState("BTC");
  const [paymentMethod, setPaymentMethod] = useState("sepa");

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

  const BuyCurrencySchema = yup.object().shape({
    pay: yup.string().required("Required."),
    buy: yup.string().required("Required."),
  });

  const formik = useFormik({
    initialValues: {
      pay: "",
      buy: "",
    },
    validationSchema: BuyCurrencySchema,
    onSubmit: () => {
      router.push("/hello");
    },
  });

  function handleChangeCurrency(
    event: SyntheticEvent<Element, Event>,
    value: any
  ) {
    const { currentTarget } = event;
    const currencyType = value;

    if (currentTarget.id.includes("buyCurrency")) {
      setBuyCurrency(currencyType);

      if (!formik.values.pay) return;

      const payValue = calcPayValue(
        formik.values.buy,
        currencyType,
        payCurrency
      );

      formik.setFieldValue("pay", payValue);
    } else if (currentTarget.id.includes("payCurrency")) {
      setPayCurrency(currencyType);

      if (!formik.values.buy) return;

      const buyValue = calcBuyValue(
        formik.values.pay,
        buyCurrency,
        currencyType
      );

      formik.setFieldValue("buy", buyValue);
    }
  }

  function handleCurrencyValueChange(event: ChangeEvent<any>) {
    const { name, value } = event.target;

    if (isNaN(value)) return;
    if (!value) {
      formik.setFieldValue(name, 0);
    } else {
      formik.setFieldValue(name, value, true);
    }

    if (name === "pay") {
      const buyValue = calcBuyValue(value, buyCurrency, payCurrency);
      formik.setFieldValue("buy", buyValue);
    } else {
      const payValue = calcPayValue(value, buyCurrency, payCurrency);
      formik.setFieldValue("pay", payValue);
    }
  }

  function calcBuyValue(
    payValue: string,
    buyCurrency: string,
    payCurrency: string
  ) {
    return (
      parseFloat(payValue) /
      parseFloat(ratesData.merchant[buyCurrency][payCurrency])
    );
  }

  function calcPayValue(
    buyValue: string,
    buyCurrency: string,
    payCurrency: string
  ) {
    return (
      parseFloat(ratesData.merchant[buyCurrency][payCurrency]) *
      parseFloat(buyValue)
    );
  }

  function handleChangePaymentMethod(event: SelectChangeEvent<unknown>) {
    setPaymentMethod(event.target.value as string);
  }

  if (currenciesData || !ratesData)
    return (
      <Box
        display="flex"
        height="100%"
        my={3}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress
          sx={{ width: "100px !important", height: "100px !important" }}
        />
      </Box>
    );

  return (
    <Box position="relative">
      <StyledFormBackground />
      <StyledFormWrapper>
        {currenciesError || ratesError ? (
          <Box
            display="flex"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography color="error.main">
              Something went wrong. Try refreshing the page.
            </Typography>
          </Box>
        ) : (
          <StyledForm onSubmit={formik.handleSubmit}>
            <BuyCurrencyInput
              value={formik.values.pay}
              inputId="pay"
              name="pay"
              autocompleteId="payCurrency"
              startAdormentText="Pay"
              error={formik.touched.pay && Boolean(formik.errors.pay)}
              helperText={formik.touched.pay && formik.errors.pay}
              currency={payCurrency}
              currencies={fiat}
              handleChangeCurrency={handleChangeCurrency}
              handleChangeValue={handleCurrencyValueChange}
            />

            <BuyCurrencyInput
              value={formik.values.buy}
              inputId="buy"
              name="buy"
              autocompleteId="buyCurrency"
              startAdormentText="Buy"
              error={formik.touched.buy && Boolean(formik.errors.buy)}
              helperText={formik.touched.buy && formik.errors.buy}
              currency={buyCurrency}
              currencies={crypto}
              handleChangeCurrency={handleChangeCurrency}
              handleChangeValue={handleCurrencyValueChange}
            />

            <Typography>Payment method</Typography>

            <BuyCurrencyPaymentMethodSelect
              value={paymentMethod}
              handleChange={handleChangePaymentMethod}
            />

            <StyledButton
              type="submit"
              disabled={!formik.values.buy || !formik.values.pay}
              sx={{ marginTop: "auto" }}
              fullWidth={true}
            >
              Buy {buyCurrency}
            </StyledButton>
          </StyledForm>
        )}
      </StyledFormWrapper>
    </Box>
  );
}
