import React from 'react'
import {nanoid} from 'nanoid'
import './index.css'
import { handleUserHistory } from '../../plugin/webAPI'


function HistoryList(props) {
  return (
    <ul className='history-list'>
        {
            props.historys.map(historyObj=>{
                return <HistoryItem {...historyObj} key={nanoid()} deleteHistory={props.deleteHistory}></HistoryItem>
            })
        }
    </ul>
  )  
}
function HistoryItem(props) {
  const {history_id, title, yaos_list, create_time} = props

  const handleDelete = ()=>{  
     props.deleteHistory(history_id)
  }

  return (
    <li className='history-item'> 
        <h1 className='history-title'>{title}</h1>
        <h2 className='history-time'>{create_time}</h2>

        <button className='danger-btn' onClick={handleDelete}>刪除</button>
    </li>
  )
}
export default HistoryList
