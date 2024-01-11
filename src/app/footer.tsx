"use client";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { capitalize } from "lodash";
import React, { useEffect, useRef } from "react";
import { Spacer } from "ui-kit/spacer/spacer";
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
import { Text } from "../ui-kit/text";
import { Flex } from "../ui-kit/flex";

import { SunchaserListWrapper } from "./components/sunchaser/components/carousell-wrapper";

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
    <>
      <Box
        {...handlers}
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
          <Flex
            borderRadius={"36px 36px 0px 0px"}
            backgroundColor={theme.color.blues[2]}
          >
            <Button fullWidth onClick={handleToggle}>
              {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
          </Flex>

          <Collapse
            style={{
              width: "100%",
            }}
            in={isExpanded}
          >
            <Spacer
              height={8}
              borderTop={"2px"}
              borderTopStyle={"solid"}
              borderColor={theme.color.grey[1]}
            />

            <Flex flexDirection={"column"}>
              <Spacer height={4} />

              <Flex flexDirection={"column"} paddingX={[4, 8]}>
                <Flex justifyContent={"space-between"} gap={4}>
                  <FooterButton text="forecast" />
                  <FooterButton text="sunchaser" />
                </Flex>

                <Spacer height={8} />

                <Spacer
                  borderRadius={8}
                  borderColor={`${theme.color.blues[2]}`}
                  style={{ backgroundColor: theme.color.blues[2] }}
                  height={14}
                  boxShadow={"inset 0em 6px rgba(0, 0, 0, 0.25)"}
                />

                <Flex justifyContent={"space-between"} height={"100%"}>
                  {subFooterItems.map((item, index) => {
                    return (
                      <React.Fragment key={item + index}>
                        {createFooterSubItems(item)}
                      </React.Fragment>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Collapse>
        </>
      </Box>
    </>
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
    <Flex
      height={"100%"}
      borderRadius={"48px"}
      backgroundColor={text === footerItem ? theme.color.blues[2] : "inherit"}
      borderColor={theme.color.grey[2]}
      borderWidth={"2px"}
      boxShadow={"inset 2px 2px 2px 2px rgba(0, 0, 0, 0.25)"}
    >
      <button onClick={handleClick} style={{ padding: 0, width: "100%" }}>
        <Flex
          clickable
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"white"} noWrap>
            {capitalize(text)}
          </Text>
        </Flex>
      </button>
    </Flex>
  );
};

export const createFooterSubItems = (item: FooterSubItems) => {
  const { footerSubItem, setFooterSubItem } = useDisplayFooterSubItems();

  return (
    <Button
      style={{ height: "100%" }}
      fullWidth
      onClick={() => setFooterSubItem(item)}
    >
      <Flex flexDirection={"column"} alignItems={"center"} clickable>
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
        <Text color={footerSubItem === item ? "white" : "black"} noWrap>
          {capitalize(item)}
        </Text>
      </Flex>
    </Button>
  );
};
