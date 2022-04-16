import api from '../Utils/apiCore';

// 上传头像
export const uploadAvatar = (file: any) => api.post('/upload/avatar', file, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
