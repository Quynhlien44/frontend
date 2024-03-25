import axiosClient from './axiosClient';
import { BASE_URL, USER_ENDPOINT } from './configApi';

const userApi = {
    getUser: (id) => axiosClient.get(`${BASE_URL}${USER_ENDPOINT}/${id}`),
};

export default userApi;