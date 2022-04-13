import api from '../Utils/apiCore';

export const sendMessage = (msg:any) => api.post('/chat/message', msg);

export const getUserChat = (chat:{send:string, receive:string}) => api.post('/chat/getUserChat', chat);

export const getFriendChat = () => api.get('friendChat');
