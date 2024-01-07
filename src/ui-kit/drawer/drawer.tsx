import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useDisplayDrawer } from "../../states/drawer";

type Anchor = "top" | "left" | "bottom" | "right";

interface DrawerProps {
  children: React.ReactNode;
  anchor: Anchor;
}

export const Drawer = ({ anchor, children }: DrawerProps) => {
  const { drawerIsOpen, setOpenDrawer } = useDisplayDrawer();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Escape"
      ) {
        setOpenDrawer(false);
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
        setOpenDrawer(open);
      }
    };

  const BoxLayout = () => (
    <Box
      id="box-layout"
      sx={{ width: 320 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      height={"100%"}
    >
      {children}
    </Box>
  );

  return (
    <>
      {/* @ts-ignore */}
      <SwipeableDrawer
        variant="temporary"
        anchor={anchor}
        open={drawerIsOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {BoxLayout()}
        {/* <IconButton onClick={() => setOpenDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton> */}
      </SwipeableDrawer>
    </>
  );
};
