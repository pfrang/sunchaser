"use client";
import { AppConfig } from "app-config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IosInstallPrompt } from "pwa/ios-install-prompt";
import { ThemeProvider } from "styled-components";
import { Flex } from "ui-kit/flex";
import { Spacer } from "ui-kit/spacer/spacer";
import { GlobalStyle } from "ui-kit/styles/global-style";
import { theme } from "ui-kit/theme";

import Router from "./router";
import { Footer } from "./footer";

export default function Page() {
  const mapBoxKey = new AppConfig().mapBox.key;
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* @ts-ignore*/}
        <GlobalStyle />
        <Flex
          height={"100dvh"}
          flexDirection={"column"}
          backgroundColor={"#173755"}
        >
          <Router mapBoxKey={mapBoxKey} />
          <Spacer height={[48, 64]} width={"100%"} />
          <Footer />
          <IosInstallPrompt />
        </Flex>
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
