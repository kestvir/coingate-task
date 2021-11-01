import RouterLink from "next/link";

import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
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
