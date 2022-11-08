import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import HeaderComponent from "./components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="h-screen">
        <HeaderComponent />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
