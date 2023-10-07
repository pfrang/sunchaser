import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { theme } from "../ui-kit/theme";
import { Flex } from "../ui-kit/flex";
import { Text } from "../ui-kit/text";

import UserForm from "./components/search-criterias";
import SwipeableTemporaryDrawer from "./search/components/drawer";

export default function HeaderComponent() {
  const router = useRouter();
  const modal = useRef<HTMLDialogElement>(null);

  const onClick = () => {
    modal.current.showModal();
  };

  const isHomePage = router.pathname === "/";

  return (
    <Flex
      bg={theme.colors.green}
      height={[48, 60]}
      paddingX={[2, 14]}
      justifyContent={"space-between"}
    >
      <Flex paddingY={2} position={"relative"} alignItems={"center"}>
        <Link href="/" tabIndex={0}>
          <Image
            style={{ cursor: "pointer" }}
            width={250}
            height={60}
            // sizes="(max-width: 800px) 100px, 50px"
            alt="Logo"
            src={"/logo.svg"}
          />
        </Link>
        {/* <Text variant="body-large-bold">Sunchaser</Text> */}
      </Flex>
      {/* <dialog className="p-0 rounded-md" ref={modal}>
        <div
          className={`h-[500px] w-[300px]`}
          style={{
            backgroundColor: theme.colors.whiteSmoke,
            borderColor: theme.color.white,
          }}
        >
          <UserForm header={modal} />
          <span
            onClick={() => modal.current.close()}
            className="absolute right-0 top-0 cursor-pointer border-l-2 border-b-2 border-black w-6 text-center hover:bg-gray-600 hover:border-none  transition-all duration-300 ease-in-out "
          >
            <Text variant="subtitle-small">X</Text>
          </span>
        </div>
      </dialog> */}
      {!isHomePage && (
        <Flex paddingY={2} justifyContent={"flex-end"}>
          <SwipeableTemporaryDrawer />
        </Flex>
      )}
    </Flex>
  );
}
