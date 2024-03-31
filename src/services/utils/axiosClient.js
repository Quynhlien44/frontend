import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "./configApi";

let accessToken = localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Set the access token dynamically
    },
  };
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
