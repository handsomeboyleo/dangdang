import {MessageType} from '../Pages/Messages/type';
import {UserType} from '../Types/accountTypes';

export const fakeMsgs = (user: UserType) => {
  const baseMsg = [] as MessageType[];
  for (let i = 0; i < 100; i++) {
    baseMsg.push({
      id: `${i % 3 === 0 ? '620d193d62e1df1971e7100d' : i}`,
      send: `${i % 3 === 0 ? '620d193d62e1df1971e7100d' : user.id}`,
      receive: `${i % 3 === 0 ? user.id : '620d193d62e1df1971e7100d'}`,
      msg: 'camiodvnma',
      type: 'dsadfcdsa',
      sendTime: '123123',
      isRead: false,
      belong: 'xxx',
    });
  }
  localStorage.setItem(`CHAT_${user.name}`, JSON.stringify(baseMsg));
  return baseMsg;
};
