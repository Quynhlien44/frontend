import axiosClient from './axiosClient';
import { BASE_URL, USER_ENDPOINT } from './configApi';

const userApi = {
    getUser: () => axiosClient.get(`${BASE_URL}${USER_ENDPOINT}/`),
};

export default userApi;