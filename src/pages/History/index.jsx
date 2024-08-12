import React, {useState, useEffect} from 'react'
import Header from '../../Compoments/Header'
import HistoryList from '../../Compoments/History'
import {EmtryHistory} from './historyDOM'
// import {testHistory} from './testHistory'
// import Spinner from '../../Compoments/Loading/Spinner'
import {getUserId, setHistoryAuth, setUserAuth, setUserHistory} from '../../plugin/authUtils'
import { useHistory } from '../../plugin/useUserData'
import {handleUserHistory} from '../../plugin/webAPI'
import './index.css'
export default function History() {
  // const [localHistory, setLocalHistory] = useState([])

  const [history] = useHistory()
  const [message, setMessage] = useState("")
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
    console.log(history)
    // initialHistory() 
    // handleUserHistory("list", {user_id}).then((data)=>{
    //     if(data.code===200){
    //       const history = data.data
    //       console.log(history)
    //       setLocalHistory(history)
    //       setLocal
    //     }else{
    //       console.log(data)
    //     }
    // })
    // .catch(err => {
    //     console.log(err)
    //     if(err.code==="ERR_NETWORK"){
    //       setMessage("目前處於離線狀態")
    //       setUserHistory(testHistory)
    //     }
       
    // })
  },[])
  // const data = {
  //   historyId
  // }
  // handleUserHistory("delete", data).then(data=>{
  //   if(data.code === 200){
  //      console.log("success",data)
  //   }else{
  //     console.log("fail",data)
  //   }
  // }).catch(err=>{
  //   console.log(err.msg)
  // })
  // const initialHistory=()=>{
  //   // if(parseInt(getUserId())===-1) {
  //   //   setUserHistory(testHistory)
  //   //   return
  //   // }
  //   const user_id = getUserId()
  //   if(user_id===-1) 

   
  // }

  // const handleSortHistory=()=>{
    
  // }
  const deleteHistory = (history_id)=>{
    const new_history = history.filter(historyObj=> historyObj.history_id === history_id)
    setHistoryAuth(new_history)
    console.log(new_history)
  }

  return (
    <div className='history-container'>
        <Header></Header>
        <main>
          <h1 className='history-msg'>{message}</h1>
          <aside>
            <label>查詢</label>
            <input type='date'></input>
          </aside>
          <div className="history-frame"> 
            {
              history.length === 0 ?
              <EmtryHistory></EmtryHistory>
              :
              <HistoryList historys={history}
                           deleteHistory={deleteHistory}></HistoryList>
            }
            
          </div>
        </main>
    </div>
  )
}
