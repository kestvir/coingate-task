import RouterLink from "next/link";

import { MenuItem, Link } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import StyledButton from "../UI/StyledButton";

interface NavLinkProps {
  label: string;
}

export default function NavLink({ label }: NavLinkProps) {
  return (
    <RouterLink href="#">
      <Link
        {...{
          color: "inherit",
          style: { textDecoration: "none" },
          key: label,
        }}
      >
        {label === "Sign up" ? (
          <StyledButton icon={<KeyboardArrowRightIcon />}>{label}</StyledButton>
        ) : (
          <MenuItem>{label}</MenuItem>
        )}
      </Link>
    </RouterLink>
  );
}
