import React, { Fragment, useContext } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useUser} from "../../../plugin/hooks/useUserData"
// import {authContent} from "../../../plugin/auth"
import { resetAuth, setUserAuth } from '../../../plugin/authUtils'
import './index.css'
// import { useDevice, useScreenOrientation } from '../../../plugin/useRWD'
// import useRWD from '../../../useRWD'
export default function NavBar() {
  const [ user, setUser] = useUser()
  const navigate = useNavigate() 


  const handleLogout = (e)=>{
    setUserAuth({
      "userId"   : -1,
      "username"  : "遊客",
      "token"     : "",
      "status"    : "1",
      "userHistory": "[]"
    })
    window.alert(`登出成功!`)
    navigate("/")
    // console.log("Log out", user)
  }

  return (
      <ul className='navbar-container'>
        <li><Link to="/home">首頁</Link></li>
        <li><Link to="/about">關於周易</Link></li>
        <li><Link to="/gua">算卦</Link></li>
        <li><Link to="/history">歷史紀錄</Link></li>
        <li>身分: { user.username }</li>
        { 
          user.userId!==-1?
          <Fragment>
            <li className='logout' onClick={handleLogout}>登出</li>
          </Fragment>
          
          :
          <Fragment>
            <li><Link to="/login">登入</Link></li>
            <li><Link to="/register">註冊</Link></li>
          </Fragment>
        }
        <li><Link to="/intro">本站資訊</Link></li>
        
      </ul>

  )
}
