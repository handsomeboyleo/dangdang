import React, {FC, useState} from "react";
import SignIn from "./SignIn";
import Register from "./Register";

const Authorization:FC =()=>{
    const [mode,setMode] = useState(true)
    return <>
        {
            mode?<SignIn change={setMode} />:<Register change={setMode}/>
        }
    </>
}
export default Authorization