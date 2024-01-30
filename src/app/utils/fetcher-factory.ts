import { Capacitor } from "@capacitor/core";
import { NextApiRequest } from "app/hooks/common-types";
import axios from "axios";

export const fetcherFactory = async (requestConfig: NextApiRequest) => {
  const baseUrl = Capacitor.isNativePlatform()
    ? `https://sunchaser.vercel.app/api/`
    : `/api/`;

  const response = await axios({ ...requestConfig, baseURL: baseUrl });
  return response.data;
};
