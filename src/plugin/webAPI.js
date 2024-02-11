import 'axios'
import axios from 'axios'
import {setAuthToken, getAuthToken} from './authUtils'
const BASE_URL = "http://127.0.0.1:3007"


export const reguser = async(username, password)=>{
    const data = {
        "username": username,
        "password": password
    }

    return axios.post(BASE_URL+"/api/reguser",data ,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then((response)=>{return response.data})
}
export const logIn = async(username, password)=>{
    const data = {
        "username": username,
        "password": password
    }

    return axios.post(BASE_URL+"/api/login",data ,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then((response)=>{
            setAuthToken(response.data.token)
            return response.data
        })
        .catch((err)=>{
            return err
        })
}
export const getUser = async()=>{
    const token = getAuthToken()
    // 身分驗證
    // 從 localStorage 讀取 token
    console.log(token)
    return axios.post(BASE_URL+"/my/userinfo",{
        headers: {
            Authorization: token,
        }
    })
    .then((res) =>{return res.data})
};