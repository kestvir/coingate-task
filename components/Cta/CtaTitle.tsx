import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const StyledPrimaryColorBoldText = styled("b")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

export default function CtaTitle() {
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        fontWeight="bold"
        fontSize={{ lg: 60, xs: 45 }}
        color="#fff"
      >
        <StyledPrimaryColorBoldText>Buy Bitcoin, </StyledPrimaryColorBoldText>
        Ethereum, Litecoin and other crypto
        <StyledPrimaryColorBoldText> online</StyledPrimaryColorBoldText>
      </Typography>
    </>
  );
}
