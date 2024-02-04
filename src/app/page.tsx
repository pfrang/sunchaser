import { AppConfig } from "app-config";
import { IosInstallPrompt } from "pwa/ios-install-prompt";

import Router from "./components/router";
import { Footer } from "./footer";
import { Header } from "./header";
import { Footer2 } from "./footer2";

export default function Page() {
  const mapBoxKey = new AppConfig().mapBox.key;
  // if (!session) throw new Error("Session not found");
  return (
    <>
      <div className="flex h-dvh w-[100%] flex-col ">
        <Header />
        <main className="h-full">
          <Router mapBoxKey={mapBoxKey} />
        </main>
        {/* <Spacer height={[48, 64]} width={"100%"} /> */}

        {/* <Footer /> */}
        <Footer2 />
        <IosInstallPrompt />
      </div>

      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </>
  );
}
