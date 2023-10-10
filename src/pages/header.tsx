import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import { theme } from "../ui-kit/theme";
import { Flex } from "../ui-kit/flex";

import SwipeableTemporaryDrawer from "./search/components/drawer";

export default function HeaderComponent() {
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  return (
    <Flex
      bg={theme.colors.green}
      height={60}
      paddingX={[2, 14]}
      justifyContent={"space-between"}
    >
      <Flex paddingY={1} position={"relative"} justifyContent={"flex-start"}>
        <Link href="/" tabIndex={0}>
          <Image
            width={56}
            height={56}
            // sizes="(max-width: 800px) 100px, 50px"
            // fill
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
