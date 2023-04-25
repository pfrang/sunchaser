import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { useEffect } from "react";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme/theme";

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  /* min-height: 100vh; */
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grey[3]};
`;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Sunchaser</title>
      </Head>
      <Wrapper>
        {/* <HeaderComponent /> */}
        <Component {...pageProps} />
        <Spacer height={64} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default MyApp;
