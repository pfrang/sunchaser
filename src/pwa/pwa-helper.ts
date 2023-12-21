import { AppConfig } from "app-config";

const IS_BROWSER = typeof window !== "undefined";

// only Safari supports PWA on iOS
const isSafariOnIphone = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    /iphone/.test(userAgent) &&
    /applewebkit/.test(userAgent) &&
    /chrome/.test(userAgent) &&
    /crios/.test(userAgent) &&
    /fxios/.test(userAgent) &&
    /opera/.test(userAgent)
  );
};
const isInStandaloneMode = () => {
  return "standalone" in window.navigator && window.navigator.standalone;
};

export const shouldPwaBeEnabled = () => {
  return [
    "http://localhost:3000/",
    "https://sio-t-app-newsiono.azurewebsites.net/",
  ].includes(new AppConfig().next.host);
};

export const shouldDisplayIphonePwaPrompt = () => {
  return (
    IS_BROWSER &&
    // shouldPwaBeEnabled() &&
    isSafariOnIphone() &&
    !isInStandaloneMode()
  );
};
