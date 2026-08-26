import axios from "axios";
import Cookies from "js-cookie";

export const nextApi = axios.create({
  baseURL: "http://localhost:3002/",
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("@SaturnChat:token");

      if (token) {
        config.headers.authorization = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
