//包含n个reducer函数的模块
import {combineReducers} from 'redux'
import {ActionTypes} from "./actionType";

const routerInfo = (state={route:{}},action:ActionTypes) =>{
    switch(action.type){
        case 'UPDATE_ROUTE':
            return action.data
        default:
            return state
    }
}

const authState = (state={onLogin:false},action:ActionTypes) =>{
    switch(action.type){
        case 'AUTH_CHANGE':
            localStorage.setItem('onLogin',action.data)
            return action.data
        default:
            return state
    }
}

export const finalReducer = combineReducers({
    routerInfo,
    authState
})