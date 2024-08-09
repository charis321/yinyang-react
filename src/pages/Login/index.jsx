import React, { useContext, useState } from 'react'
import { useNavigate} from "react-router-dom";
import Header from '../../Compoments/Header'
import {setAuthToken, setUserInfo} from '../../plugin/authUtils'
import {logIn} from '../../plugin/webAPI'
import {authContent} from '../../plugin/auth'
import './index.css'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [warming, setWarming]  = useState("")

  const {setUser} = useContext(authContent)
  const navigate = useNavigate() 
  
  const handleChange = (input_type)=>{
    return (e)=>{
      if(input_type==="username"){
        setUsername(e.target.value)
      }else if(input_type==="password"){
        setPassword(e.target.value)
      }else{
        return false
      }
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username,password)
    logIn(username, password).then(data=>{
      if(data.code===400){
        setWarming(data.msg)
      }else{
        
        setWarming(data.msg)
        console.log(data.data)
        setUserInfo(data.data)
        setUser(data.data.username)
        setAuthToken(data.data.token)
        window.alert(`登入成功! ${username},歡迎回來`)
        navigate('/home');
      }
    }).catch((err)=>{
      console.log(err)
      setWarming(err.message)
    })
    
  }

  return (
      <div className='login-container'>
        <Header></Header>
        <main>
          <form className='login' onSubmit={handleSubmit}>
            <h2>登入</h2>
            <span style={{color: "red"}}>{warming}</span>
            <label>帳號</label>
            <input  type="text" placeholder='請輸入帳號' value={username} onChange={handleChange('username')} maxLength="20"/> 
            <label>密碼</label>
            <input type="password" placeholder='請輸入密碼' value={password} onChange={handleChange('password')} maxLength="20"/> 
            <button className='default' type='submit'>登入</button>
            <p>還沒有帳號?在此註冊</p>
          </form>
        </main>
        
      </div>
    )
  
}
