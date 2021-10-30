import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StyledPrimaryColorBoldText = styled("b")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

export default function IntroText() {
  return (
    <Box ml={"12vw"} pr={"5vw"}>
      <Typography variant="h2" component="h1" fontWeight="bold" color="#fff">
        <StyledPrimaryColorBoldText>Buy Bitcoin, </StyledPrimaryColorBoldText>
        Ethereum, Litecoin and other crypto
        <StyledPrimaryColorBoldText> online</StyledPrimaryColorBoldText>
      </Typography>
      <Typography my={5} color="#fff" fontSize={"24px"}>
        Why bother going through complicated exchanges? Buy cryptocurrency with
        top payment methods like SEPA bank transfer, Credit and Debit Card,
        Apple Pay, Mobile balance or Klarna. You can buy Bitcoin, Ethereum or
        any other popular crypto directly to your personal wallet without making
        any initial deposits. It's as easy as it gets!
      </Typography>
      <Box display="flex">
        <Typography color="primary.main">Start Now</Typography>
        <KeyboardArrowRightIcon sx={{ color: "primary.main" }} />
      </Box>
    </Box>
  );
}
