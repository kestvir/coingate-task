import { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/system";
import { AppBar, Drawer, Toolbar, Box, IconButton, Link } from "@mui/material";

import NavLink from "./NavLink";
import HamburgerIcon from "./HamburgerIcon";
import RouterLink from "next/link";

const navigationLinksData = ["Products", "Resources", "Buy Instantly"];
const authLinksData = ["Log In", "Sign up"];

const StyledAppBar = styled(AppBar)({
  height: "100px",
  color: "#7F88A0",
  backgroundColor: "#fff",
  justifyContent: "center",
  boxShadow: "0 5px 11px 0 rgb(29 0 62 / 7%)",
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

export default function Header() {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const brandLogo = (
    <RouterLink href="/">
      <Link sx={{ cursor: "pointer" }}>
        <Image src="/logo.png" alt="brand logo" width={157} height={33} />
      </Link>
    </RouterLink>
  );

  const displayDesktop = () => {
    return (
      <StyledToolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
          {brandLogo}
          <Box sx={{ display: "flex", gap: "30px" }}>{getNavLinks()}</Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {getAuthMenuLinks()}
        </Box>
      </StyledToolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <StyledToolbar>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <Box pt={2} px={2}>
            <Box pb={5}>{brandLogo}</Box>
            {getNavLinks()}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              mt={2}
            >
              {getAuthMenuLinks()}
            </Box>
          </Box>
        </Drawer>

        {brandLogo}

        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <HamburgerIcon />
        </IconButton>
      </StyledToolbar>
    );
  };

  const getNavLinks = () => {
    return navigationLinksData.map((label) => (
      <NavLink key={label} label={label} />
    ));
  };

  const getAuthMenuLinks = () => {
    return authLinksData.map((label) => <NavLink key={label} label={label} />);
  };

  return (
    <StyledAppBar>
      {mobileView ? displayMobile() : displayDesktop()}
    </StyledAppBar>
  );
}
