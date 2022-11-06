import "../styles/globals.css";
import type { AppProps } from "next/app";

import HeaderComponent from "./components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <HeaderComponent />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
