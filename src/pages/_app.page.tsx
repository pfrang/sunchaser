import "swiper/css";
import "swiper/css/pagination";
import "react-day-picker/dist/style.css";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import "swiper/css/navigation";
// import "swiper/css/bundle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled, { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { GlobalStyle } from "ui-kit/styles/global-style";
import { IosInstallPrompt } from "pwa/ios-install-prompt";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme";

import { Footer } from "./footer";
import { Header } from "./header";
import { Header2 } from "./header2";

const Layout = styled.div`
  height: 100dvh; /* new browsers */
  /* overflow-y: hidden; */
  /* min-height: 100vh; */
  /* min-height: -moz-available;
  min-height: -webkit-fill-available; */
  /* min-height: fill-available; */
  display: flex;
  flex-direction: column;
  background-color: #173755;
`;

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   let vh = window.innerHeight * 0.01;

  //   // Then we set the value in the --vh custom property to the root of the document
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, []);

  return (
    <>
      {/* @ts-ignore*/}
      <ThemeProvider theme={theme}>
        <Head>
          <title>Sunchaser</title>
          <meta name="description" content="Sunchaser" />
          {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        {/* @ts-ignore*/}
        <GlobalStyle />
        <Layout>
          {/* <Header /> */}
          <Header2 />
          {/* <Spacer height={[8]} width={"100%"} /> */}
          <Component {...pageProps} />
          <Spacer height={[48, 64]} width={"100%"} />
          <Footer />
          <IosInstallPrompt />
        </Layout>
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default MyApp;
