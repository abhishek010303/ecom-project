import { useState } from "react";
import AllRouting from "./AllRouting";
import AuthRouting from "./AuthRouting";

function CombineRouting({countofcart}){
    
    return(
        (!localStorage.getItem('auth_id') ?<AuthRouting/>:<AllRouting countofcart={countofcart}/>)
    

    )
    
}

export default CombineRouting

