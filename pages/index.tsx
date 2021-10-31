import { styled } from "@mui/material/styles";

import IntroText from "../components/IntroText";
import BuyCurrencyForm from "../components/BuyCurrencyForm";

const StyledWrapper = styled("div")({
  maxWidth: "1510px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "80px",
});

const StyledSection = styled("section")({
  paddingTop: "250px",
  position: "relative",
  height: "1260px",
  overflow: "hidden",
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
});

export default function Home() {
  return (
    <main>
      <StyledSection>
        <StyledBackground />
        <StyledWrapper>
          <IntroText />
          <BuyCurrencyForm />
        </StyledWrapper>
      </StyledSection>
    </main>
  );
}
