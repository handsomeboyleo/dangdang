import api from '../Utils/apiCore'


export const sendMessage =(msg:any) =>api.post('/chat/message',msg)