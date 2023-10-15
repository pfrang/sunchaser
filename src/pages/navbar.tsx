import { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDisplayNavbar } from "../states/navbar";
import { Drawer } from "../ui-kit/drawer/drawer";

export const Navbar = () => {
  const { navbarIsOpen, setOpenNavbar } = useDisplayNavbar();

  const handleToggle = () => {
    setOpenNavbar(!navbarIsOpen);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Escape"
      ) {
        setOpenNavbar(false);
      } else if (
        event &&
        event.type === "click" &&
        event.target instanceof HTMLElement &&
        event.target.closest("#box-layout")
      ) {
        return;
      } else if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof SVGElement
      ) {
        return;
      } else {
        setOpenNavbar(open);
      }
    };

  const BoxLayout = () => (
    <Box
      id="box-layout"
      sx={{ width: "full" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      height={"100%"}
    >
      <Button onClick={handleToggle} fullWidth>
        {navbarIsOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Button>
      <Box sx={{ height: "auto", overflowY: "auto" }}>
        <Typography variant="body1" align="center">
          This is the collapsible content. It can be any HTML element or React
          component.
        </Typography>
      </Box>
    </Box>
  );
  return (
    <>
      <Box sx={{ height: "50px" }} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#f5f5f5",
          padding: "16px",
          borderTop: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Collapse in={!navbarIsOpen}>
          <Button onClick={handleToggle} fullWidth>
            <ExpandLessIcon />
          </Button>
        </Collapse>
        <Collapse in={navbarIsOpen}>
          {/* @ts-ignore */}
          <SwipeableDrawer
            variant="persistent"
            anchor={"bottom"}
            open={navbarIsOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <BoxLayout />
          </SwipeableDrawer>
        </Collapse>
      </Box>
    </>
  );
};
