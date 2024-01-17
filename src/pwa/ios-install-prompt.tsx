"use client";

import { useState, useEffect } from "react";
import IosShareIcon from "ui-kit/ios-share";

import { shouldDisplayIphonePwaPrompt } from "./pwa-helper";
import { IosInstallPromptStyles as s } from "./ios-install-prompt.style";

export const IosInstallPrompt = () => {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  useEffect(() => {
    const shouldDisplay = shouldDisplayIphonePwaPrompt();
    setDisplayPrompt(shouldDisplay);
  }, []);

  return (
    <>
      {displayPrompt && (
        <s.PromptWrapper>
          <s.Prompt>
            Install this webapp on your iPhone: tap <IosShareIcon />
            and then Add to home-screen{" "}
            <button onClick={() => setDisplayPrompt(false)}>[close]</button>
          </s.Prompt>
          <s.ArrowDown />
        </s.PromptWrapper>
      )}
    </>
  );
  // TODO: nice styling of course
  // TODO: remember state of closed prompt on page change
};
