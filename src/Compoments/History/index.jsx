import {useState, useEffect, useRef} from 'react'
import {nanoid} from 'nanoid'
import './index.css'
import { handleUserHistory } from '../../plugin/webAPI'


function HistoryList(props) {
  // const [list] = useRef()
  // useEffect(()=>{
    
  // },[])
  const handleTouch = (e)=>{
    
  }
  const handleScroll = (e)=>{
    console.log(e)
  }

  return (
    <ul className='history-list' onTouchMove={handleTouch} onScroll={handleScroll}>
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
  const [isClosed, setIsclosed] = useState(false)
  const handleDelete = ()=>{
    setIsclosed(true)
    setTimeout(()=>{
      props.deleteHistory(history_id)
    }, 500)  
    
  }
  const create_time_local = new Date(create_time)


  return (
    <li className={'history-item'+(isClosed?" closing":"")}> 
        <h3 className='history-title'>{title}</h3>
        <div className='history-time'>
          <p>{create_time_local.toLocaleDateString()}</p>
          <p>{create_time_local.toLocaleTimeString()}</p>
        </div>
        
        <button className='danger-btn' onClick={handleDelete}>刪除</button>
    </li>
  )
}
export default HistoryList
