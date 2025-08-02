import React, { useState, useReducer} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Header from '../../Compoments/Header'
import {reguser, logIn} from '../../plugin/webAPI.js'
import { setUserAuth } from '../../plugin/authUtils.js'
// import { AuthContext } from "../../contexts";
import './index.css'



export default function Register(props){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordR, setPasswordR] = useState("")
  const [warming, setWarming]  = useState("")
  const [showPassword, setShowPassword] = useState([false, false])
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const navigate = useNavigate()

  // const {setUser} = useContext(AuthContext)
  
  // const passwordRef = useRef(null)

  const handleChange = (type)=>{
    return e => { 
      switch(type){
        case "username":
          setUsername(e.target.value)
          break
        case "password":
          setPassword(e.target.value)
          break
        case "passwordR":
          setPasswordR(e.target.value)
          break
        default:
          break
      }
    }
  }
  const handleShowPasseord = (type)=>{
    return (e)=>{
      if(e.keyCode === 13) return
  
      const tmp = showPassword
      if(type==="password"){
        tmp[0] = !tmp[0]
      }else{
        tmp[1] = !tmp[1]
      }
      setShowPassword(tmp)
      forceUpdate()
    }
  }
  const handleSubmit = ()=>{
    if(!isInputVaild()){
      return setWarming("密碼不符合規定")
    }

    reguser(username, password).then((data)=>{
      console.log(data)
      if(data.code===400){
        setWarming(data.msg)
      }else{
        alert("註冊成功!")
        logIn(username, password).then(res=>{
          if(res.code===400){
            setWarming(res.msg)
          }else{
    
            const userData ={"status": 1,...res.data}
    
            setWarming(res.msg)
            setUserAuth(userData)
    
            window.alert(`登入成功! ${username},歡迎回來`)
            navigate('/home');
          }
        }).catch((err)=>{
          console.log(err)
          setWarming(err.message)
        })
      }
    })
    .catch((err)=>{
      console.log(err)
      setWarming(err.message)
    })
     
    
  }
  const isInputVaild = ()=>{
    if(password!==passwordR) return false
    return true
  } 


  return (
    <div className='register-container'>
      <Header></Header>
      <main>
        <form className='register'>
          <h2>註冊</h2>
          <span style={{color: "red"}}>{warming}</span>
          <label>
            帳號
            <input type="text" placeholder='請輸入帳號' value={username} onChange={handleChange("username")}/>
          </label>
          <label>
            密碼
            <input  type={showPassword[0] ? "text" : "password"} 
                    placeholder='請輸入密碼' 
                    value={password} 
                    onChange={handleChange("password")}/> 
            <button type = "button"
                    className = "default show-password"
                    onClick={handleShowPasseord("password")} 
                    style={{backgroundColor: showPassword[0]?"rgba(0, 0, 0, 0.5)":"rgba(255, 255, 255, 0.5)"}}
                    tabIndex = "-1">
              <img alt='查看密碼' src={"/images/icons/eye.svg"} />
            </button>
          </label>
          
         
          <label>
            再次輸入密碼
            <input type={showPassword[1] ? "text" : "password"}  
                    placeholder='重新輸入密碼' 
                    value={passwordR} 
                    onChange={handleChange("passwordR")}/> 
            <button type = "button"
                    className = "default show-password"
                    onClick={handleShowPasseord("passwordR")}
                    style={{backgroundColor: showPassword[1]?"rgba(0, 0, 0, 0.5)":"rgba(255, 255, 255, 0.5)"}}
                    tabIndex = "-1">
              <img alt='查看密碼' src={"/images/icons/eye.svg"} />
            </button>
          </label>
         
          <button className='default' type='button' tabIndex = "-1" onClick={handleSubmit}>完成</button>
          <p>已有帳號?在此<Link to={'/login'}>登入</Link></p>
        </form>
      </main>
      
    </div>
    )
  
}
