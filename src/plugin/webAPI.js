import 'axios'
import axios from 'axios'
import {setAuthToken, getAuthToken} from './utils'
const BASE_URL = "localhost:3306/api"

export const logIn=(username, password)=>{
    const body = {
        username, 
        password,
    }
    axios.post(BASE_URL+"/login", body)
         .then((response)=>{
            console.log(response.data)
         })
         .catch((err)=>{
            console.log(err)
        })
}
export const getUser = ()=>{
    const token = getAuthToken()
    return axios.post(BASE_URL+"/login", body)
    .then((response)=>{
       response.json()
    })
    .catch((err)=>{
       console.log(err)
   })
}