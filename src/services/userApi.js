import axiosClient from "./utils/axiosClient";
import { BASE_URL, USER_ENDPOINT } from "./utils/configApi";

const userApi = {
  getUser: () => axiosClient.get(`${BASE_URL}${USER_ENDPOINT}/`),
};

export default userApi;
