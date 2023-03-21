import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";
import { useEffect } from "react";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme/theme";

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background-color: ${theme.grey};
`;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  // typeof window !== "undefined" &&
  //   window.addEventListener("resize", () => {
  //     // We execute the same script as before
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty("--vh", `${vh}px`);
  //   });
  return (
    <>
      <Head>
        <title>Sunchaser</title>
      </Head>
      <Wrapper>
        {/* <HeaderComponent /> */}
        <Component {...pageProps} />
        {/* <Spacer line vertical={64} /> */}
        <Spacer vertical={64} />
      </Wrapper>
    </>
  );
}

export default MyApp;
