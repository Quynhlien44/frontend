import axiosClient from "./utils/axiosClient";
import { BASE_URL, VISIT_ENDPOINT } from "./utils/configApi";

const visitApi = {
  create: (params) => axiosClient.post(`${BASE_URL}${VISIT_ENDPOINT}`, params),
  getAll: () => axiosClient.get(`${BASE_URL}${VISIT_ENDPOINT}`),
};

export default visitApi;
