import Image from "next/image";
import { useState, useRef } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { Flex } from "../ui-kit/flex";
import { Text } from "../ui-kit/text";
import { useDisplayFooter } from "../states/footer";

export const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
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
              {createNavItems()}
            </Flex>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

const createNavItems = () => {
  const { footerItem, setFooterItem } = useDisplayFooter();

  return (
    <>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Button onClick={() => setFooterItem("weather")}>
          <Image
            alt="partlySunny"
            src={
              footerItem === "weather"
                ? "/icons/white/svg/partlysunny.svg"
                : "/icons/black/svg/partlysunny.svg"
            }
            width={64}
            height={64}
          />
        </Button>
        <Text color={footerItem === "weather" ? "white" : "black"} noWrap>
          SOmeting
        </Text>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Button onClick={() => setFooterItem("result")}>
          <Image
            alt="partlySunny"
            src={
              footerItem === "result"
                ? "/icons/white/svg/partlysunny.svg"
                : "/icons/black/svg/partlysunny.svg"
            }
            width={64}
            height={64}
          />
        </Button>
        <Text color={footerItem === "result" ? "white" : "black"} noWrap>
          SOmeting
        </Text>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Button onClick={() => setFooterItem("location")}>
          <Image
            alt="partlySunny"
            src={
              footerItem === "location"
                ? "/icons/white/svg/partlysunny.svg"
                : "/icons/black/svg/partlysunny.svg"
            }
            width={64}
            height={64}
          />
        </Button>
        <Text color={footerItem === "location" ? "white" : "black"} noWrap>
          SOmeting
        </Text>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Button onClick={() => setFooterItem("date")}>
          <Image
            alt="partlySunny"
            src={
              footerItem === "date"
                ? "/icons/white/svg/partlysunny.svg"
                : "/icons/black/svg/partlysunny.svg"
            }
            width={64}
            height={64}
          />
        </Button>
        <Text color={footerItem === "date" ? "white" : "black"} noWrap>
          SOmeting
        </Text>
      </Flex>
    </>
  );
};
