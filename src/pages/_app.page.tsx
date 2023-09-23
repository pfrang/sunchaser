import "react-day-picker/dist/style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { SWRConfig } from "swr";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme/theme";

import HeaderComponent from "./header";

const Wrapper = styled.div`
  height: 100svh;
  /* min-height: 100vh; */
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grey[3]};
`;

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   let vh = window.innerHeight * 0.01;

  //   // Then we set the value in the --vh custom property to the root of the document
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, []);

  const isHomePage = pageProps.currentUrl === "/";

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Sunchaser</title>
          <meta name="description" content="Sunchaser" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SWRConfig value={{}}>
          <Wrapper>
            <HeaderComponent isHomePage={isHomePage} />
            <Component {...pageProps} />
            <Spacer height={32} />
          </Wrapper>
        </SWRConfig>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
