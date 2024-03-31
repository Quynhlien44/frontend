import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "./configApi";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  try {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  } catch (error) {
    console.error("Error setting Authorization header:", error);
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (err.response) {
      console.error("Error! Network error!", err.response);
    }
    throw err;
  }
);

export default axiosClient;
