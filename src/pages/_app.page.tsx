import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
`;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <>
      <Head>
        <title>Sunchaser</title>
      </Head>
      <Wrapper>
        {/* <HeaderComponent /> */}
        <Component {...pageProps} />
        {/* <Spacer line vertical={64} /> */}
      </Wrapper>
    </>
  );
}

export default MyApp;
