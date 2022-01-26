// import {userGetOnlineUsers} from '../api/user.js'

import {wsBaseUrl} from "../const";

const initWS = (name:string, token:string) => {
    const ws = new WebSocket(wsBaseUrl+ token)
    ws.onopen = () => {
        console.info(`%c-- ${name} websocket connected --`,'color:green');
    }
    ws.onclose = () => {
        console.warn('ws连接已断开！')
    }
    ws.onerror = () => {
        console.warn('ws连接异常！')
    }
    ws.onmessage =async (e) => {
        let message = JSON.parse(e.data)
        if (message.type === 'OPERATION') {
            // await userGetOnlineUsers().then((data) => {
            //     store.commit('updateOnlineUser', data.data.filter((item) => item !== store.state.user))
            // })
        }
        // store.commit('updateDialogs',message)
    }
    return ws
}

export default initWS