"use client";
import { AppConfig } from "app-config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IosInstallPrompt } from "pwa/ios-install-prompt";

import Router from "./router";
import { Footer } from "./footer";
import { Header } from "./header";

export default function Page() {
  const mapBoxKey = new AppConfig().mapBox.key;

  return (
    <>
      <div className=" flex h-dvh w-[100%] flex-col  bg-[#173755]">
        <Header />
        <div style={{ height: "calc(100% - 68px)" }}>
          <Router mapBoxKey={mapBoxKey} />
        </div>
        {/* <Spacer height={[48, 64]} width={"100%"} /> */}

        <Footer />
        <IosInstallPrompt />
      </div>

      <SpeedInsights />
      <Analytics />
    </>
  );
}