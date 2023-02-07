import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
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
