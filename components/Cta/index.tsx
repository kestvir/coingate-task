import RouterLink from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/system";
import { Link, Box } from "@mui/material";

import CtaTitle from "./CtaTitle";
import CtaParagraph from "./CtaParagraph";

const StyledWrapper = styled(Box)({
  marginLeft: "12vw",
  paddingRight: "7vw",
  "@media (max-width: 1199px)": {
    marginLeft: 0,
    paddingRight: 0,
  },
});

const StyledLinkWrapper = styled(Box)({
  "@media (max-width: 1199px)": {
    display: "none",
  },
});

const StyledCtaParagraphWrapper = styled(Box)({
  "@media (max-width: 1199px)": {
    display: "none",
  },
});

export default function Cta() {
  return (
    <StyledWrapper>
      <CtaTitle />
      <StyledCtaParagraphWrapper>
        <CtaParagraph />
      </StyledCtaParagraphWrapper>
      <StyledLinkWrapper display="flex">
        <RouterLink href="/hello">
          <Link
            sx={{ cursor: "pointer" }}
            color="primary.main"
            underline="none"
          >
            Start Now
          </Link>
        </RouterLink>
        <KeyboardArrowRightIcon sx={{ color: "primary.main" }} />
      </StyledLinkWrapper>
    </StyledWrapper>
  );
}
