import React, {  useState } from 'react'
import { useNavigate} from "react-router-dom";
import Header from '../../Compoments/Header'
// import {useUser} from '../../plugin/useUserData'
import {logIn} from '../../plugin/webAPI'

import './index.css'
import { setUserAuth } from '../../plugin/authUtils';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [warming, setWarming]  = useState("")
  const [loading, setLoading] = useState(false)


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
    setLoading(true)
    setWarming("")
    logIn(username, password).then(res=>{
      if(res.code===400){
        setWarming(res.msg)
      }else{

        const userData ={"status": 1,...res.data}
        console.log(res.data,"data")
        setWarming(res.msg)
        setUserAuth(userData)
        
        window.alert(`登入成功! ${username},歡迎回來`)
        navigate('/home');
      }
    })
    .catch((err)=>{
      console.log(err)
      setWarming("連線發生問題")
    })
    .finally(()=>{
      setLoading(false)
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
            <button className='default' type='submit'>
              <span className='loading-icon' style={{display: loading?"inline-block":"none"}}></span>
              登入
            </button>
            <p>還沒有帳號?在此註冊</p>
          </form>
        </main>
        
      </div>
    )
  
}
