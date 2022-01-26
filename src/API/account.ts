import api from "../Utils/apiCore";

export const signIn =(data:any) => api.post('/signIn',data) // 登陆

export const signOut =(data:any) => api.post('/signOut',data) // 登出

export const getUserInfo =() => api.get('/getUserInfo') // 获取用户信息