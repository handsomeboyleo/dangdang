import axios from 'axios';
import { Toast } from 'antd-mobile';
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
const handleErrorToast = (err:ResponseDataType<any>) => {
  Toast.show({
    content: `${err.code}: ${err.msg}`,
  });
};
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
