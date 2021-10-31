import { ReactNode } from "react";

import { styled } from "@mui/material/styles";
import Button, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type Props = MuiButtonProps & {
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
  "&:hover": {
    background: theme.palette.primary.main,
    boxShadow: `0 3px 11px ${theme.palette.primary.main}`,
  },
}));

export default function StyledButton({ children, icon, ...rest }: Props) {
  return (
    <StyledEmotionButton {...rest} endIcon={icon}>
      {children}
    </StyledEmotionButton>
  );
}
