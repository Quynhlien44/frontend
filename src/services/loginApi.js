import axiosClient from "./utils/axiosClient";
import { BASE_URL, LOGIN_ENDPOINT } from "./utils/configApi";

const loginApi = {
  login: (params) => axiosClient.post(`${BASE_URL}${LOGIN_ENDPOINT}`, params),
};

export default loginApi;
