import { styled } from "@mui/system";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import Image from "next/image";

const StyledSelect = styled(Select)({
  borderRadius: "20px",
  marginTop: "20px",
  marginBottom: "40px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
});

type Props = {
  value: string;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
};

const PAYMENT_METHODS = [
  {
    label: "Bank Transfer",
    value: "sepa",
    imgSrc: "/sepa.svg",
  },
  {
    label: "Bank Transfer",
    value: "paypal",
    imgSrc: "/paypal.svg",
  },
  {
    label: "Bank Transfer",
    value: "apple pay",
    imgSrc: "/apple-pay.svg",
  },
];

export default function BuyCurrencyPaymentMethodSelect({
  value,
  handleChange,
}: Props) {
  return (
    <StyledSelect value={value} onChange={handleChange}>
      {PAYMENT_METHODS.map((method) => {
        return (
          <MenuItem
            sx={{ display: "flex" }}
            key={method.value}
            value={method.value}
          >
            <Image width={30} height={30} src={method.imgSrc} />
            <Typography ml={2}>{method.label}</Typography>
          </MenuItem>
        );
      })}
    </StyledSelect>
  );
}
