import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { theme } from "../ui-kit/theme/theme";
import { Flex } from "../ui-kit/components/flex";

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 2px solid ${theme.colors.greenDark};
  justify-content: center;
  padding: 6px;
`;

//NOT USED CURRENTLY
export default function HeaderComponent({ isHomePage }) {
  const onClick = () => {
    alert("Header nav item coming soon!");
    return;
  };

  return (
    <Flex
      bg={theme.colors.pink}
      height={[48, 60]}
      paddingX={[2, 14]}
      justifyContent={"space-between"}
    >
      <Flex paddingY={2} position={"relative"} alignItems={"center"}>
        <Link href="/">
          <a>
            <Image
              style={{ cursor: "pointer" }}
              layout="fixed"
              objectFit="contain"
              width={150}
              height={"100%"}
              // sizes="(max-width: 800px) 100px, 50px"
              alt="Logo"
              src={
                "/logo/sunchaser-high-resolution-logo-color-on-transparent-background.png"
              }
            />
          </a>
        </Link>
      </Flex>
      {!isHomePage && (
        <Flex paddingY={2} justifyContent={"flex-end"}>
          <img
            onClick={onClick}
            className="cursor-pointer"
            src="/icons/black/svg/menu.svg"
          />
        </Flex>
      )}
    </Flex>
  );
}
