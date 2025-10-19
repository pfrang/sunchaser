import { AppConfig } from "app-config";
import { IosInstallPrompt } from "pwa/ios-install-prompt";
import { Suspense } from "react";

import { Spinner } from "../ui-kit/spinner/spinner";

import MapRenderer from "./components/map-renderer";
import { Footer } from "./components/sunchaser/components/footer/footer";
import { RightButtonsWrapper } from "./components/sunchaser/components/filter-buttons/form";
import { SettingsButton } from "./components/settings-button";

// export const revalidate = 0; // Disable caching, always fetch a fresh version

export default function Page() {
  const mapboxKey = new AppConfig().mapBox.key;

  return (
    <>
      <div className="flex w-full h-full flex-col bg-white">
        <main className="h-full">
          <div className="fixed top-6 z-30 flex w-full flex-col items-end gap-4 px-2">
            <Suspense fallback={null}>
              <RightButtonsWrapper />
              <SettingsButton />
            </Suspense>
          </div>

          <Suspense
            fallback={
              <div className="flex size-full items-center justify-center">
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
