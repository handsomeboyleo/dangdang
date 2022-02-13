import {MessageType} from "../Pages/Messages/type";

export const fakeMsgs = ()=>{
    const baseMsg=[] as MessageType[]
    for(let i = 0;i<100;i++){
        baseMsg.push({
            id: `${i}`,
            from:'dxx',
            to:'cxsa',
            msg:'camiodvnma',
            type:'dsadfcdsa',
            time:'123123'
        })
    }
    localStorage.setItem('CHAT_Novalee Spicer',JSON.stringify(baseMsg))
    return baseMsg
}