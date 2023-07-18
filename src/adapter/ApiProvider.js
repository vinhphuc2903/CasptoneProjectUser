import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { setupInterceptersTo } from './AxiosConfig';
import Cookies from 'js-cookie';

// const BASE_URL = 'https://phuc-api.hoangbkdn.tech/';
const BASE_URL = 'https://localhost:8080/';

// Tạo một axios instance mới với các interceptors
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'XApiKey': 'S4R13E7?J5bjp7{!CZMADnGwhC8FGZZ2p5MBH0qk',
    'x-requestid': uuidv4(),
    'Authorization': '',
  },
});

// Thiết lập interceptors để cập nhật token trước mỗi yêu cầu
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
  }
  return config;
});

const api = setupInterceptersTo(axiosInstance);

export const fetchAll = (path, params) => {
  return api
    .get(`${BASE_URL}/${path}`, { params })
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
};

export const fetchSingle = (path, id) => {
  return api
    .get(`${path}/${id}`)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
};

export const post = (path, model) => {
  return api
    .post(`${BASE_URL}/${path}`, model)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
};

export const patch = (path, model) => {
  return api
    .patch(`${BASE_URL}/${path}`, model)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
};

export const remove = (path, id) => {
  return api
    .delete(`${BASE_URL}/${path}/${id}`)
    .then((resp) => resp.data)
    .catch((error) => console.log(error));
};

export const request = ({ url = '', method = 'GET', data = {}, params = {} }) => {
  return api
    .request({
      url: url,
      method: method,
      data: data,
      params: params,
    })
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      return error;
    });
};
