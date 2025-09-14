"use client";

import { useState, useEffect } from "react";
import IosShareIcon from "ui-kit/ios-share";

import { shouldDisplayIphonePwaPrompt } from "./pwa-helper";

export const IosInstallPrompt = () => {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  useEffect(() => {
    const shouldDisplay = shouldDisplayIphonePwaPrompt();
    setDisplayPrompt(shouldDisplay);
  }, []);

  return (
    <>
      {displayPrompt && (
        <div className="fixed bottom-0 z-10 block w-full">
          <div className="rounded-sm bg-green-500 p-1 text-lg">
            Install this webapp on your iPhone: tap <IosShareIcon />
            and then Add to home-screen{" "}
            <button onClick={() => setDisplayPrompt(false)}>[close]</button>
          </div>
          <div className="m-auto -mt-1 size-0 border-x-30 border-b-0 border-t-30 border-solid border-green-400" />
        </div>
      )}
    </>
  );
  // TODO: nice styling of course
  // TODO: remember state of closed prompt on page change
};
