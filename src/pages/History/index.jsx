import React, {useState, useEffect } from 'react'
import Header from '../../Compoments/Header'
import HistoryList from '../../Compoments/History'
import './index.css'
import {testHistory} from './testHistory'

export default function History() {
  // const [time, setTime] = useState()
  // const [userHistory, setUserHistory] = userHistory()
  const historys= testHistory
  // useEffect(()=>{
  //   const interval = setInterval(()=>{
  //     setTime(new Date().toISOString())
  //   },1000)
  //   return ()=>{
  //     clearInterval(interval)
  //   }
  // },[])
  return (
    <div className='history-container'>
        <Header></Header>
        <main>
          <aside>
            <label>查詢</label>
            <input type='date'></input>
            </aside>
          <HistoryList historys={historys}></HistoryList>
        </main>
    </div>
  )
}
