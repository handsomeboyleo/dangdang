import axios from "axios";
import { apiBaseUrl } from "../const";

const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 20000,
    headers: {}
});

const get = async (url: string, params?: string, options?: any) => {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params,
            ...options
        }).then(res => resolve(res)).catch((e) =>
            reject(e))
    })
}
const post = async (url: string, body?: any, options?: any) => {
    return new Promise((resolve, reject) => {
        instance.post(url, body, options).then(
            res => resolve(res)).catch((e) =>
                reject(e))
    })
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get,
    post
}