import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 2px solid green;
  justify-content: center;
  padding: 6px;
`;

export default function HeaderComponent() {
  return (
    <Header>
      <Link href="/" passHref>
        <a className="h-20">
          <Image
            className="cursor-pointer"
            width={200}
            height={50}
            src={
              "/logo/sunchaser-high-resolution-logo-color-on-transparent-background.png"
            }
          />
        </a>
      </Link>
    </Header>
  );
}
