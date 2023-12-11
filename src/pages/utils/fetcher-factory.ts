import { Capacitor } from "@capacitor/core";
import axios from "axios";
import { NextApiRequest } from "pages/hooks/common-types";

export const fetcherFactory = async (requestConfig: NextApiRequest) => {
  const baseUrl = Capacitor.isNativePlatform()
    ? `https://sunchaser.vercel.app/api/`
    : `/api/`;

  const response = await axios({ ...requestConfig, baseURL: baseUrl });
  return response.data;
};
