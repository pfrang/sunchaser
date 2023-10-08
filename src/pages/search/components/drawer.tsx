import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import UserForm from "pages/components/search-criterias";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Flex } from "ui-kit/flex";
import { IconButton } from "@mui/material";
import Image from "next/image";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const [drawerIsOpen, setOpenDrawer] = React.useState(false);

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
      <UserForm setOpenDrawer={setOpenDrawer} />
    </Box>
  );

  return (
    <div>
      <Button style={{ height: "100%" }} onClick={toggleDrawer(!drawerIsOpen)}>
        <Image
          alt="Menu"
          fill
          tabIndex={0}
          className="cursor-pointer"
          src="/icons/black/svg/menu.svg"
          style={{ objectFit: "contain" }}
        />
      </Button>
      {/* @ts-ignore */}
      <SwipeableDrawer
        variant="temporary"
        anchor={"left"}
        open={drawerIsOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {BoxLayout()}
        <IconButton onClick={() => setOpenDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </SwipeableDrawer>
    </div>
  );
}
