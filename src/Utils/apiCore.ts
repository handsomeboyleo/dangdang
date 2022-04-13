import axios, { AxiosRequestConfig } from 'axios';
import { Dialog, Toast } from 'antd-mobile';
import { AppConfig } from '../config';
import { onSignOut } from '../Redux/actions';

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
    headers.Authorization = `Bearer ${AppConfig.get('token')}`;
  }
  return axios.create({
    // baseURL: apiBaseUrl,
    baseURL: '/dingServer',
    timeout: 10000,
    headers,
  });
};

const handleError = (err: ResponseDataType<any>) => {
  if (err.code === 401) {
    const handle = Dialog.show({
      content: '登陆信息过期，请重新登录',
      actions: [
        {
          key: 'close',
          text: '关闭',
          onClick: () => {
            onSignOut();
            handle.close();
          },
        },
      ],
    });
  }
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
        handleError(res.data);
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
