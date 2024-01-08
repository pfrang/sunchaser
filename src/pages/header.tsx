import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Spacer } from "ui-kit/spacer/spacer";

import { theme } from "../ui-kit/theme";
import { Flex } from "../ui-kit/flex";

import { WhereAreYou } from "./routes/_shared/components/where-are-you";

export const Header = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <Flex bg={theme.color.blues[5]} flexDirection={"column"} py={[2, 3]}>
      <Flex
        height={80}
        // as="header"
        // paddingX={[2, 14]}
        // paddingTop={10}
        // alignItems={"center"}
      >
        <Flex position={"absolute"} left={1} width={"auto"}>
          <Link href={{ pathname: "/", query }} tabIndex={0}>
            <Image
              width={56}
              height={56}
              // sizes="(max-width: 800px) 100px, 50px"
              // fill
              alt="Logo"
              src={"/logo.svg"}
            />
          </Link>
        </Flex>

        <Flex height={"64px"} flexDirection={"column"}>
          <Spacer height={"8px"} />
          <WhereAreYou />
        </Flex>
      </Flex>
    </Flex>
  );
};
