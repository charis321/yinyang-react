import React, { Component } from 'react'
import Header from '../../Compoments/Header'
import './index.css'

export default class Login extends Component {
  render() {
    return (
      <div className='login-container'>
        <Header></Header>
        <main>
          <form className='login'>
            <h2>登入</h2>
            <label>帳號</label>
            <input type="text" placeholder='請輸入帳號'/> 
            <label>密碼</label>
            <input type="password" placeholder='請輸入密碼'/> 
            <button type='button'>登入</button>
            <p>還沒有帳號?在此註冊</p>
          </form>
        </main>
        
      </div>
    )
  }
}
