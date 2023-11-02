import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { theme } from "../ui-kit/theme";
import { Flex } from "../ui-kit/flex";

import { WhereAreYou } from "./components/where-are-you";

export const Header = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <Flex
      bg={theme.color.blues[5]}
      height={80}
      // paddingX={[2, 14]}
      // paddingTop={10}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex width={"auto"} top={0}>
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

      <Flex justifyContent={"center"} alignContent={"center"}>
        <WhereAreYou />
      </Flex>
      {/* <Flex paddingY={2} justifyContent={"flex-end"}>
        <Button
          style={{ height: "100%" }}
          onClick={() => setOpenDrawer(!drawerIsOpen)}
        >
          <Image
            alt="Menu"
            fill
            tabIndex={0}
            className="cursor-pointer"
            src="/icons/black/svg/menu.svg"
            style={{ objectFit: "contain" }}
          />
        </Button>
        <Drawer anchor={"left"}>
          <UserForm />
        </Drawer>
      </Flex> */}
    </Flex>
  );
};
