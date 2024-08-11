import { useState, useEffect } from 'react'
import {setUserAuth ,getUserAuth, getHistoryAuth,setHistoryAuth} from './authUtils'


const MAX_LOCAL_HISTORY = 10;

const UNAUTH_USER = {
    "user_id"   : "-1",
    "username"  : "遊客",
    "token"     : "",
    "status"    : "1",
}

export const useUser = ()=>{
    const [user, setUser] = useState(UNAUTH_USER)
   
    useEffect(()=>{
        const localUser = getUserAuth()

        setUser(localUser)
        setUserAuth(localUser)
    },[]) 

    const clearUser = ()=>{setUserAuth(UNAUTH_USER)}
    return [user, setUser, clearUser]
}

export const useHistory = ()=>{ 
    const [history, setHistory] = useState([]) 
   
    useEffect(()=>{
        const localHistory = getHistoryAuth()

        setHistory(localHistory)
        setHistoryAuth(localHistory)
    },[])


    return [history, setHistory]



    // handleUserHistory("list", data).then((data)=>{
    //     if(data.code===200){
    //       const history = data.data
    //       console.log(history)
    //       setUserHistory(history)
          
    //     }else{
    //       console.log(data)
    //     }
    // })
    // .catch(err => {
    //     console.log(err)
    //     if(err.code==="ERR_NETWORK"){
    //       setMessage("目前處於離線狀態")
    //       setUserHistory(testHistory)
    //     }
       
    // })

    // const [userHistory, setUserHistory] = useState()

    // return {userHistory, setUserHistory}
}