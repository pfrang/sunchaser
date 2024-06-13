import { AppConfig } from "app-config";
import { IosInstallPrompt } from "pwa/ios-install-prompt";
import { Suspense } from "react";

import { Spinner } from "../ui-kit/spinner/spinner";

import Router from "./components/map-renderer";
import { Header } from "./header";
import { Footer } from "./components/footer";
import { UserLocationButton } from "./components/user-location-button";

export default function Page() {
  const mapboxKey = new AppConfig().mapBox.key;

  // if (!session) throw new Error("Session not found");
  return (
    <>
      <div className="flex h-dvh w-full flex-col">
        <Suspense fallback={<Spinner />}>
          {/* <Header /> */}
          <main className="h-full">
            <Router mapboxKey={mapboxKey} />
          </main>

          <Footer />
          <IosInstallPrompt />
        </Suspense>
      </div>

      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </>
  );
}
