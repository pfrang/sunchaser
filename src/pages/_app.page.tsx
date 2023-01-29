import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import HeaderComponent from "./components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sunchaser</title>
      </Head>
      <div className="h-screen">
        <HeaderComponent />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
