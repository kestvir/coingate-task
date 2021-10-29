import { ReactNode } from "react";

import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
};

const StyledEmotionButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "#fff",
  fontSize: "1.2em",
  fontWeight: 500,
  minWidth: "145px",
  borderRadius: "4px 50px 50px 50px",
  textTransform: "none",
  height: "50px",
  paddingLeft: "25px",
  "&:hover": {
    background: theme.palette.primary.main,
    boxShadow: `0 3px 11px ${theme.palette.primary.main}`,
  },
}));

export default function StyledButton({ children, icon }: Props) {
  return <StyledEmotionButton endIcon={icon}>{children}</StyledEmotionButton>;
}
