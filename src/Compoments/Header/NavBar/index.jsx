import React, { Fragment, useContext } from 'react'
import {Link} from "react-router-dom"
import {authContent} from "../../../plugin/auth"
import { resetAuth } from '../../../plugin/authUtils'
import './index.css'
import { useDevice, useScreenOrientation } from '../../../plugin/useRWD'
// import useRWD from '../../../useRWD'
export default function NavBar() {
  const {user, setUser} = useContext(authContent) 

  const handleLogout = (e)=>{
    console.log("Log out", user)
    setUser("遊客")
    resetAuth()
    window.alert(`登出成功!`)
  }

  return (
      <ul className='navbar-container'>
        <li><Link to="/home">首頁</Link></li>
        <li><Link to="/about">關於周易</Link></li>
        <li><Link to="/gua">算卦</Link></li>
        <li><Link to="/history">歷史紀錄</Link></li>
        { 
          user!=="遊客"?
          <Fragment>
            <li>身分: { user }</li>
            <li className='logout' onClick={handleLogout}>登出</li>
          </Fragment>
          
          :
          <Fragment>
            <li><Link to="/login">登入</Link></li>
            <li><Link to="/register">註冊</Link></li>
          </Fragment>
        }
        
      </ul>

  )
}
