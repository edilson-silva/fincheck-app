import axios from "axios";
import { CONFIG } from "../config/constants";
import { StorageUtil } from "../utils/storage";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = StorageUtil.getItem(CONFIG.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
