import { AppConfig } from "app-config";
import { IosInstallPrompt } from "pwa/ios-install-prompt";
import { Suspense } from "react";

import { Spinner } from "../ui-kit/spinner/spinner";

import MapRenderer from "./components/map-renderer";
import { Footer } from "./components/sunchaser/components/footer/footer";

export default function Page() {
  const mapboxKey = new AppConfig().mapBox.key;

  return (
    <>
      <div className="flex h-dvh w-full flex-col">
        <main className="h-full">
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <MapRenderer mapboxKey={mapboxKey} />
          </Suspense>
        </main>

        <Footer />
        <IosInstallPrompt />
      </div>

      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </>
  );
}
