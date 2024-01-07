import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { Flex } from "../ui-kit/flex";

import { WhereAreYou2 } from "./routes/_shared/components/where-are-you2";

export const Header2 = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <Flex
      position={"relative"}
      top={20}
      // left={"200px"}
    >
      <Flex px={[2, 3]} position={"absolute"} justifyContent={"space-between"}>
        <Flex
          zIndex={99}
          // top={-10}
          // position={"absolute"}
          // left={3}
          width={"auto"}
        >
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

        <Flex justifyContent={"flex-end"} alignItems={"center"}>
          <WhereAreYou2 />
        </Flex>
      </Flex>
    </Flex>
  );
};
