import { Metadata } from "next";

import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Sunchaser",
  description: "Sunchaser",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Sunchaser" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-iphone.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* <{!-- Google tag (gtag.js) -->} */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NN9D9GF44W"
        ></script>
        <script>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NN9D9GF44W');
            `}
        </script> */}
      </head>
      <body>
        {/* @ts-ignore*/}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
