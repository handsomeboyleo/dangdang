import axios from 'axios';
import { apiBaseUrl } from '../config';

interface ResponseDataType<T> {
    code: number,
    data: T,
    msg: string
}

const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  // headers: {}
});

const get = async <T>(url: string, params?: string, options?: any) => new Promise<ResponseDataType<T>>((resolve, reject) => {
  instance.get(url, {
    params,
    ...options,
  }).then((res) => { resolve(res.data); }).catch((e) => {
    reject(e);
  });
});
const post = async <T>(url: string, body?: any, options?: any) => new Promise<ResponseDataType<T>>((resolve, reject) => {
  instance.post(url, body, options).then(
    (res) => {
      resolve(res.data);
    },
  ).catch((e) => {
    reject(e);
  });
});

export default {
  get,
  post,
};
