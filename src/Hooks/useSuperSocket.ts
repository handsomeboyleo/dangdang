import { useCallback, useMemo, useState } from 'react';
import { wsBaseUrl } from '../config';
import { superSocket } from '../Utils/superSocket';
import { MessageType, OptionMessageType } from '../Pages/Messages/type';

export const useSuperSocket = (id:string) => {
  const [ss, setSS] = useState<WebSocket>();
  const wsConnect = useCallback(() => {
    const ws = superSocket.init(wsBaseUrl + id);
    setSS(ws);
    return ws;
  }, [id]);
  const wsSend = useCallback((msg:MessageType|OptionMessageType) => {
    if (ss) {
      ss.send(JSON.stringify(msg));
    }
  }, [ss]);
  return useMemo(() => ({
    wsConnect,
    wsSend,
  }), [wsConnect, wsSend]);
};
