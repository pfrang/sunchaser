import { AppConfig } from "app-config";
import { IosInstallPrompt } from "pwa/ios-install-prompt";

import Router from "./components/router";
import { Footer } from "./footer";
import { Header } from "./header";

export default function Page() {
  const mapBoxKey = new AppConfig().mapBox.key;
  // if (!session) throw new Error("Session not found");
  return (
    <>
      <div className="flex h-dvh w-[100%] flex-col bg-[#173755]">
        <Header />
        <main className="h-full">
          <Router mapBoxKey={mapBoxKey} />
        </main>
        {/* <Spacer height={[48, 64]} width={"100%"} /> */}

        <Footer />
        <IosInstallPrompt />
      </div>

      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </>
  );
}
