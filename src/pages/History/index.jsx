import React, {useState, useEffect ,useContext} from 'react'
import Header from '../../Compoments/Header'
import HistoryList from '../../Compoments/History'
import { EmtryHistory } from './historyDOM'
import {testHistory} from './testHistory'
import {authContent} from '../../plugin/auth'
import {getUserId} from '../../plugin/authUtils'
import {handleUserHistory} from '../../plugin/webAPI'
import './index.css'
export default function History() {
  const [userHistory, setUserHistory] = useState([])
  // const { user } = useContext(authContent)
  /*
    history: {
      historyId,
      userId,
      createTime,
      title,
      yaosList,
    }
  */
  useEffect(()=>{  
    const data = {
      userId: getUserId()
    }
    handleUserHistory("list", data).then((data)=>{
        if(data.code===200){
          const history = data.data
          console.log(history)
          setUserHistory(history)
        }else{
          console.log(data)
        }
    })
    .catch(err => {
        console.log(err)
        setUserHistory(testHistory)
    })

  },[])

  const handleSortHistory=()=>{
    
  }


  return (
    <div className='history-container'>
        <Header></Header>
        <main>
          <aside>
            <label>查詢</label>
            <input type='date'></input>
          </aside>
          <div className="history-frame"> 
            {
              userHistory.length===0?
              <EmtryHistory></EmtryHistory>:
              <HistoryList historys={userHistory}></HistoryList>
            }
            
          </div>
        </main>
    </div>
  )
}
