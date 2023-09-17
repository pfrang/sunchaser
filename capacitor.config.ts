import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "sunchaser",
  webDir: "out",
  server: {
    // androidScheme: "https",
    url: "http://172.20.80.1:3000/",
    cleartext: true,
  },
};

export default config;
