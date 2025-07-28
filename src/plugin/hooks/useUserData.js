import { useState, useEffect } from 'react'
import {setUserAuth ,getUserAuth, getHistoryAuth,setHistoryAuth} from '../authUtils'
import { handleUserHistory } from '../webAPI'
// import { MAX_LOCAL_HISTORY } from "../../configure"

// const UNAUTH_USER = {
//     "userId"   :  -1,
//     "username"  : "遊客",
//     "token"     : "",
//     "status"    : "1",
//     "userHistory": "[]"
// }

export const useUser = ()=>{
    const [user, setUser] = useState(getUserAuth())
    useEffect(()=>{
        setUserAuth(user)
        console.log("userchange",user)
    },[user]) 
    return [user, setUser]
}

export const useHistory = ()=>{ 
    const [history, setHistory] = useState(getHistoryAuth()) 
    useEffect(()=>{
        setHistoryAuth(history)
        console.log("history", history)
    },[history])


    return [history, setHistory]
}