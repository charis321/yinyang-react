import React from 'react'
import {nanoid} from 'nanoid'
import './index.css'
import { handleUserHistory } from '../../plugin/webAPI'


function HistoryList(props) {


  return (
    <ul className='history-list'>
        {
            props.historys.map(historyObj=>{
                return <HistoryItem {...historyObj} key={nanoid()}></HistoryItem>
            })
        }
    </ul>
  )  
}

function HistoryItem(historyObj) {
  const {historyId, title, yaosList, createTime} = historyObj

  const handleDeleteHistory = ()=>{
    const data = {
      historyId
    }
    handleUserHistory("delete", data).then(data=>{
      if(data.code === 200){
         console.log("success",data)

      }else{
        console.log("fail",data)
      }

     
    }).catch(err=>{
      console.log(err.msg)
    })
  }

  return (
    <li className='history-item'> 
        <h1 className='history-title'>{title}</h1>
        <h2 className='history-time'>{createTime}</h2>

        <button className='danger-btn' onClick={handleDeleteHistory}>刪除</button>
    </li>
  )
}
export default HistoryList
