import { useState,useContext } from 'react'
import {getUser, getUserHistory} from 'webAPI.js'
import { authContent } from './auth'

// export const useUserHistory = ()=>{
//     const user = getUser() 
//     const [userHistory, setUserHistory] = useState(user.history)

//     return [userHistory, setUserHistory]
// }

// export const useUserHistory = async()=>{
//     const { user } = useContext(authContent)
//     getUserHistory(user).then((data)=>{
//         if(data===200){
//             console.log(data.data)
//         }else{
//             console.log(data.msg)
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })

//     const [userHistory, setUserHistory] = useState()

//     return {userHistory, setUserHistory}
// }