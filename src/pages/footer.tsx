import Image from "next/image";
import { useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { capitalize } from "lodash";

import { Flex } from "../ui-kit/flex";
import { Text } from "../ui-kit/text";
import { FooterItems, useDisplayFooter } from "../states/footer";

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const footerItems = ["forecast", "sunchaser", "location", "date"];

  return (
    <>
      <Box
        sx={{
          position: isExpanded ? "fixed" : "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#f5f5f5",
          padding: "8px",
          borderTop: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <Button fullWidth onClick={handleToggle}>
          {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </Button>

        <Collapse style={{ width: "100%" }} in={isExpanded}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Flex justifyContent={"space-between"} height={"100%"}>
              {footerItems.map((item: FooterItems) => {
                return createFooterItem(item);
              })}
            </Flex>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

const createFooterItem = (item: FooterItems) => {
  const { footerItem, setFooterItem } = useDisplayFooter();

  return (
    <Button
      style={{ height: "100%" }}
      fullWidth
      onClick={() => setFooterItem(item)}
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Image
          alt="partlySunny"
          src={
            footerItem === item
              ? "/icons/white/svg/partlysunny.svg"
              : "/icons/black/svg/partlysunny.svg"
          }
          width={64}
          height={64}
        />
        <Text color={footerItem === item ? "white" : "black"} noWrap>
          {capitalize(item)}
        </Text>
      </Flex>
    </Button>
  );
};
