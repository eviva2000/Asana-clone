import axios, { AxiosInstance } from 'axios';
import { auth } from '../firebase_config';

interface RequestParams {
  noAuth?: boolean;
}

const api = async (params?: RequestParams): Promise<AxiosInstance> => {
  const tokenResult = await auth.currentUser?.getIdTokenResult();
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/api',
    headers: {
      Authorization: !params?.noAuth ? `Bearer ${tokenResult?.token}` : '',
    },
  });
};
export default api;
