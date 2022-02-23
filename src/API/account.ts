import api from '../Utils/apiCore';

// 注册
export const register = <T>(data:any) => api.post<T>('/account/register', data);
// 登陆
export const signIn = (data:any) => api.post('/account/signIn', data);
// 登出
export const signOut = (data:any) => api.post('/account/signOut', data);
// 获取用户信息
export const getUserInfo = () => api.get('/account/getUserInfo');
// 获取所有用户
export const getAllUsers = () => api.get('/account/getAllUsers');
