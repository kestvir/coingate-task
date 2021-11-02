import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

import Cta from "../components/Cta";
import BuyCurrencyForm from "../components/BuyCurrencyForm";
import CtaParagraph from "../components/Cta/CtaParagraph";

const StyledSection = styled("section")({
  paddingTop: "250px",
  position: "relative",
  height: "1260px",
  overflow: "hidden",
  "@media (max-width: 1199px)": {
    paddingTop: "200px",
  },
});

const StyledBackground = styled("div")({
  position: "absolute",
  height: "1200px",
  right: "-15vw",
  top: "-20px",
  left: "15.75%",
  zIndex: -10000,
  background: "#5022ED",
  borderRadius: "53px",
  transform: "matrix(1, -0.04, -0.04, -1, 0, 0);",
  "@media (max-width: 1199px)": {
    left: "-39px",
    top: "10px",
    borderRadius: "0",
  },
});

const StyledCtaParagraphGrid = styled(Grid)({
  display: "none",
  "@media (max-width: 1199px)": {
    display: "block",
  },
});

export default function Home() {
  return (
    <main>
      <StyledSection>
        <StyledBackground />
        <Grid container mx="auto" maxWidth="80vw">
          <Grid item lg={8} md={12}>
            <Cta />
          </Grid>
          <Grid item lg={4} md={12} flexBasis="100%">
            <BuyCurrencyForm />
          </Grid>
          <StyledCtaParagraphGrid item md={12}>
            <CtaParagraph />
          </StyledCtaParagraphGrid>
        </Grid>
      </StyledSection>
    </main>
  );
}
