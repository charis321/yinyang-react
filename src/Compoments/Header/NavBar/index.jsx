import React, { Fragment, useContext } from 'react'
import {Link} from "react-router-dom"
import {authContent} from "../../../plugin/auth"
import './index.css'
import { useDevice, useScreenOrientation } from '../../../plugin/useRWD'
// import useRWD from '../../../useRWD'
export default function NavBar() {
  const {user} = useContext(authContent) 

  return (
      <ul className='navbar-container'>
        <li><Link to="/home">首頁</Link></li>
        <li><Link to="/about">關於周易</Link></li>
        <li><Link to="/gua">算卦</Link></li>
        <li><Link to="/history">歷史紀錄</Link></li>
        { 
          user?
          <li>登出</li>
          :
          <Fragment>
            <li><Link to="/login">登入</Link></li>
            <li><Link to="/register">註冊</Link></li>
          </Fragment>
        }
        
      </ul>

  )
}
