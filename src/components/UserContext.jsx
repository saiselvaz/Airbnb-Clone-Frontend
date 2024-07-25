import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [redirect, setRedirect] = useState(null);

    useEffect(()=>{
        if(!user){
            axios.get('/isAuth')
                .then((response) =>{
                    if(response.data === 'Unauthorized'){
                        // console.log('helo')
                        return;
                    }
                        setUser(response.data);
                        setReady(true);
                   
                 })
                 .catch((error) => {
                   
                        console.log(error)
                      
                  
                 });
        }else{
            setReady(true);
        }
    },[user])

   
    return(
        <UserContext.Provider value = {{user,setUser,ready}}>
           
                {children}
    
        </UserContext.Provider>
    )
}