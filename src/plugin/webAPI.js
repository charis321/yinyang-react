import 'axios'
import axios from 'axios'
import { getAuthToken} from './authUtils'
const BASE_URL = "http://127.0.0.1:8080"


export const reguser = async(username, password)=>{
    const currTime =  new Date().toISOString()
    const data = JSON.stringify({
        "username": username,
        "password": password,
        "createTime": currTime,
        "updateTime": currTime
    })
    
    console.log(data)

    return axios.post(BASE_URL+"/api/user/regist", data, {
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000,
    })
    .then((response)=>{return response.data})
}
export const logIn = async(username, password)=>{
    const data = JSON.stringify({
        "username": username,
        "password": password
    })

    return axios.post(BASE_URL+"/api/user/login", data, {
        headers: {
            "Content-Type": "application/json"
        },
        timeout: 10000,
    })
    .then(res => {return res.data})
}

export const handleUserHistory = async(action, data={})=>{    
    const token = getAuthToken()
    console.log(token)
    return axios.post(BASE_URL+"/api/user/history/" + action, JSON.stringify(data),{
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    })
    .then(res => {return res.data})
}

export const loadData = async(dataPath)=>{
    return axios.get(`${process.env.PUBLIC_URL}/${dataPath}`)
    .then(res=>{return res.data})
    .catch(err=>{
      console.log(err);
    });
}





