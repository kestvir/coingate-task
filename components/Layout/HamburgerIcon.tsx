import { styled } from "@mui/material/styles";

const StyledHamburger = styled("i")({
  height: "28px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  justifyContent: "center",
});

const StyledLine = styled("span")({
  width: "28px",
  height: "2px",
  backgroundColor: "#c7c7c7",
  display: "block",
});

const StyledShorterLine = styled(StyledLine)({
  width: "16px",
});

export default function HamburgerIcon() {
  return (
    <StyledHamburger>
      <StyledLine />
      <StyledLine />
      <StyledShorterLine />
    </StyledHamburger>
  );
}
