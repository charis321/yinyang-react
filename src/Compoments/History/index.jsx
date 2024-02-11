import React from 'react'
import {nanoid} from 'nanoid'
function HistoryItem(props) {
 return (
    <li className='history-item'>
        <p className='history-time'>{`${props.date.year}/${props.date.month}/${props.date.day}`}</p>
        <p className='history-info'>{props.info}</p>
    </li>
  )
}
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
export default HistoryList
