import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';
import { apiBaseUrl, AppConfig } from '../config';

interface ResponseDataType<T> {
  code: number,
  data: T,
  msg: string
}
interface RequestOptionType{
  auth: boolean,
  header: AxiosRequestConfig
}
const request = (opt: RequestOptionType) => {
  const {
    auth, header = {},
  } = opt;
  const headers: any = {
    'Content-Type': 'application/json',
    ...header,
  };
  if (auth) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Bearer ${AppConfig.get('token')}`;
  }
  const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    headers,
  });
  return instance;
};
const handleErrorToast = (err: ResponseDataType<any>) => {
  Toast.show({
    content: `${err.code}: ${err.msg}`,
  });
};
const get = async <T>(url: string, params?: string, options?: any) => new Promise<ResponseDataType<T>>((resolve, reject) => {
  request({ auth: true, ...options }).get(url, {
    params,
    ...options,
  }).then((res) => { resolve(res.data); }).catch((e) => {
    reject(e);
  });
});
const post = async <T>(url: string, body?: any, options?: any) => new Promise<ResponseDataType<T>>((resolve, reject) => {
  request({ auth: true, ...options }).post(url, body, options).then(
    (res) => {
      if (res.data.code !== 200) {
        handleErrorToast(res.data);
      }
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
