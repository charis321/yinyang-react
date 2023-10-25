import React, { Component } from 'react'
import Header from '../../Compoments/Header'
import './index.css'

export default class Register extends Component {
  render() {
    return (
      <div className='register-container'>
        <Header></Header>
        <main>
          <form className='register'>
            <h2>註冊</h2>
            <label>帳號</label>
            <input type="text" placeholder='請輸入帳號'/> 
            <label>密碼</label>
            <input type="password" placeholder='請輸入密碼'/> 
            <label>再次輸入密碼</label>
            <input type="password" placeholder='重新輸入密碼'/> 
            <button type='button'>完成</button>
            <p>已有帳號?在此登入</p>
          </form>
        </main>
        
      </div>
    )
  }
}
