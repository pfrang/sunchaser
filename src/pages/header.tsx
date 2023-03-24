import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { theme } from "../ui-kit/theme/theme";

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 2px solid ${theme.colors.greenDark};
  justify-content: center;
  padding: 6px;
`;

//NOT USED CURRENTLY
export default function HeaderComponent() {
  return (
    <Header>
      <Link href="/" passHref>
        <a className="h-20 mr-auto">
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
