import React from 'react'
import {Link} from "react-router-dom"
import './index.css'
export default function NavBar() {
  return (

      <ul className='navbar-container'>
        <li><Link to="/home">首頁</Link></li>
        <li><Link to="/about">關於周易</Link></li>
        <li><Link to="/gua">算卦</Link></li>
        <li><Link to="/login">登入</Link></li>
      </ul>

  )
}
