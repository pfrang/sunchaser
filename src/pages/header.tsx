import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { theme } from "../ui-kit/theme/theme";
import { Flex } from "../ui-kit/components/flex";
import { Text } from "../ui-kit/components/text";

import UserForm from "./components/search-criterias";

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
  const modal = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    modal.current.showModal();
    setIsOpen(true);
    return;
  };

  const onClose = () => {
    modal.current.close();
    setIsOpen(false);
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
              width={250}
              height={"60px"}
              // sizes="(max-width: 800px) 100px, 50px"
              alt="Logo"
              src={"/logo.svg"}
            />
          </a>
        </Link>
        {/* <Text variant="body-large-bold">Sunchaser</Text> */}
      </Flex>
      <dialog className="p-0 rounded-md" ref={modal}>
        <div
          className={`h-[500px] w-[300px]`}
          style={{
            backgroundColor: theme.colors.whiteSmoke,
            borderColor: theme.color.white,
          }}
        >
          <UserForm header={modal} />
          <span
            onClick={() => onClose()}
            className="absolute right-0 top-0 cursor-pointer border-l-2 border-b-2 border-black w-6 text-center hover:bg-gray-600 hover:border-none  transition-all duration-300 ease-in-out "
          >
            <Text variant="subtitle-small">X</Text>
          </span>
        </div>
      </dialog>
      {!isHomePage && (
        <Flex paddingY={2} justifyContent={"flex-end"}>
          <img
            tabIndex={0}
            onClick={onClick}
            className="cursor-pointer"
            src="/icons/black/svg/menu.svg"
          />
        </Flex>
      )}
    </Flex>
  );
}
