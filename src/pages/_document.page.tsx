import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {/* <link rel="stylesheet" href="../styles/globals.css" /> */}
        {/* <link
            rel="stylesheet"
            href="https://unpkg.com/react-day-picker/lib/style.css"
          /> */}
        {/* <link rel="shortcut icon" type="image/png" href="sunny.png" /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
