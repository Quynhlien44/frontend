import axiosClient from "./utils/axiosClient";
import { BASE_URL, PET_ENDPOINT } from "./utils/configApi";

const petApi = {
  create: (params) => axiosClient.post(`${BASE_URL}${PET_ENDPOINT}`, params),
  getAll: () => axiosClient.get(`${BASE_URL}${PET_ENDPOINT}`),
  getOne: (id) => axiosClient.get(`${BASE_URL}${PET_ENDPOINT}/${id}`),
  update: (id, params) =>
    axiosClient.put(`${BASE_URL}${PET_ENDPOINT}/${id}`, params),
};

export default petApi;
