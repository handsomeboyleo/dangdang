//包含所有的action creator
export const routerUpdate = (route: {  }) =>({type:'UPDATE_ROUTE',data:route})

export const detectLoginAction=(data:{onLogin:boolean})=>({type: 'AUTH_CHANGE',data:data})