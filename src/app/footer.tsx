"use client";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { capitalize } from "lodash";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Box, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { theme } from "ui-kit/theme";

import {
  FooterItems,
  FooterSubItems,
  footerSubItemsForecast,
  footerSubItemsSunchaser,
  useDisplayFooter,
  useDisplayFooterSubItems,
} from "../states/footer";

import { SunchaserListWrapper } from "./components/sunchaser/components/result-list-wrapper";

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { footerItem } = useDisplayFooter();
  // how to only destruct setBoxPosition from useState?
  const [, setBoxPosition] = useState("sticky");
  const boxRef = useRef(null);

  const { footerSubItem } = useDisplayFooterSubItems();

  const isOnSunChaserResult =
    footerItem === "sunchaser" && footerSubItem === "result";

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const subFooterItems =
    footerItem === "sunchaser"
      ? footerSubItemsSunchaser
      : footerSubItemsForecast;

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isExpanded) {
        setBoxPosition("sticky");
      } else {
        setBoxPosition("fixed");
      }
      // set position sticky to this useRef below
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [isExpanded]);

  const handlers = useSwipeable({
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false),
    trackMouse: true,
  });

  return (
    <footer>
      <Box
        ref={boxRef}
        sx={{
          // position: isExpanded ? "sticky" : "fixed",
          position: "fixed",
          // position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: "36px 36px 0px 0px",
          // padding: "8px",
          borderTop: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 9,
          backgroundColor: theme.color.blues[4],
        }}
      >
        {isOnSunChaserResult && (
          <SunchaserListWrapper expandFooter={setIsExpanded} />
        )}
        <>
          <div className="w-full rounded-custom bg-blues-200">
            <Button fullWidth {...handlers} onClick={handleToggle}>
              {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
          </div>

          <Collapse
            style={{
              width: "100%",
            }}
            in={isExpanded}
          >
            <span className="block h-4 w-full border-t-2 border-greys-100"></span>

            <div className="w-full">
              <span className="h-2 w-full"></span>

              <div className="w-full px-4">
                <div className="flex w-full justify-between gap-4">
                  <FooterButton text="forecast" />
                  <FooterButton text="sunchaser" />
                </div>

                <span className="block h-3 w-full" />

                <span className="block h-3 w-full rounded-md bg-blues-200 shadow-custom-inner"></span>

                <div className="flex h-full w-full justify-between">
                  {subFooterItems.map((item, index) => {
                    return (
                      <React.Fragment key={item + index}>
                        {createFooterSubItems(item)}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </Collapse>
        </>
      </Box>
    </footer>
  );
};

const FooterButton = ({ text }: { text: FooterItems }) => {
  const { footerItem, setFooterItem } = useDisplayFooter();
  const { setFooterSubItem } = useDisplayFooterSubItems();

  const handleClick = () => {
    setFooterItem(text);
    setFooterSubItem("result");
  };

  return (
    <div
      className={`flex h-full w-full rounded-3xl border-2 border-greys-200 shadow-custom-inner ${
        text === footerItem ? "bg-blues-200" : "bg-inherit"
      }`}
    >
      <button className="w-full p-0" onClick={handleClick}>
        <div className="flex w-full cursor-pointer flex-col items-center justify-center">
          <p className="text-variant-regular whitespace-nowrap text-white">
            {capitalize(text)}
          </p>
        </div>
      </button>
    </div>
  );
};

const createFooterSubItems = (item: FooterSubItems) => {
  const { footerSubItem, setFooterSubItem } = useDisplayFooterSubItems();

  return (
    <Button
      style={{ height: "100%" }}
      fullWidth
      onClick={() => setFooterSubItem(item)}
    >
      <div className="flex flex-col items-center hover:backdrop-brightness-100">
        <Image
          alt="partlySunny"
          src={
            footerSubItem === item
              ? "/icons/white/svg/partlysunny.svg"
              : "/icons/black/svg/partlysunny.svg"
          }
          width={64}
          height={64}
        />
        <p
          className={`text-variant-base text-variant-regular whitespace-nowrap text-white
            ${footerSubItem === item ? "text-white" : "text-black"}
            `}
        >
          {capitalize(item)}
        </p>
      </div>
    </Button>
  );
};
