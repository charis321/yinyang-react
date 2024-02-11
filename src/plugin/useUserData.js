import { useState } from 'react'
import {getUser} from 'webAPI.js'

export const useUserHistory = ()=>{
    const user = getUser() 
    const [userHistory, setUserHistory] = useState(user.history)

    return [userHistory, setUserHistory]
}

