import "react-day-picker/dist/style.css";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { GlobalStyle } from "ui-kit/styles/global-style";
import { useRouter } from "next/router";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme";

import HeaderComponent from "./header";
import { Footer } from "./footer";

const Wrapper = styled.div`
  height: 100dvh; /* new browsers */
  /* overflow-y: hidden; */
  /* min-height: 100vh; */
  /* min-height: -moz-available;
  min-height: -webkit-fill-available; */
  /* min-height: fill-available; */
  display: flex;
  flex-direction: column;
`;

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   let vh = window.innerHeight * 0.01;

  //   // Then we set the value in the --vh custom property to the root of the document
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, []);

  const router = useRouter();

  const isHomePage = router.pathname === "/";

  return (
    <>
      {/* @ts-ignore*/}
      <ThemeProvider theme={theme}>
        <Head>
          <title>Sunchaser</title>
          <meta name="description" content="Sunchaser" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* @ts-ignore*/}
        <GlobalStyle />
        <Wrapper>
          <HeaderComponent />
          <Component {...pageProps} />
          <Spacer height={[32, 64]} />
          {!isHomePage && <Footer />}
        </Wrapper>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
