import {useState, useEffect, useRef, Fragment} from 'react'
import {nanoid} from 'nanoid'
import './index.css'
import { handleUserHistory } from '../../plugin/webAPI'


export const HistoryList = (props)=>{
  return (
    <ul className='history-list'>
        {  
          props.historys.map(historyObj=>{
              return <HistoryItem history={historyObj} key={nanoid()}
                                  showHistory = {props.showHistory} 
                                  deleteHistory={props.deleteHistory}></HistoryItem>
          })
        }
    </ul>
  )  
}

function HistoryItem(props) {
  const {historyId, title, yaosList, createTime} = props.history
  const [isClosed, setIsclosed] = useState(false)
  const handleDelete = ()=>{
    setIsclosed(true)
    setTimeout(()=>{
      props.deleteHistory(historyId)
    }, 500)  
    
  }
  const create_time_local = new Date(createTime)
  const handleShowHistory = ()=>{
    const {showHistory} = props
    showHistory(props.history)
  }


  return (
    <li className={'history-item'+(isClosed?" closing":"")}> 
        <h3 className='history-title'>{title}</h3>
        <div className='history-time'>
          <p>{create_time_local.toLocaleDateString()}</p>
          <p>{create_time_local.toLocaleTimeString()}</p>
        </div>
        <div className='history-btn'>
          <button className='primary-btn' onClick={handleShowHistory}>查看</button>
          <button className='danger-btn' onClick={handleDelete}>刪除</button>
        </div>
        
    </li>
  )
}


export const EmtryHistory = ()=>{
    return <Fragment>
                <h1>無歷史紀錄</h1>
            </Fragment>
}
