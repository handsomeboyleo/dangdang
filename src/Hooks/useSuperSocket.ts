import { useCallback, useMemo, useState } from 'react';
import { wsBaseUrl } from '../config';
import { MessageType, OptionMessageType } from '../Pages/Messages/type';
import { SuperSocket } from '../Utils/superSocket';

export const useSuperSocket = (id:string) => {
  const [ss, setSS] = useState<WebSocket>();
  const wsConnect = useCallback(() => {
    const ws = SuperSocket.init(wsBaseUrl + id);
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
