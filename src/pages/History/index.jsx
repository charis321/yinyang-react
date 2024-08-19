import React, {useState, useEffect, useRef} from 'react'
import Header from '../../Compoments/Header'
import HistoryList from '../../Compoments/History'
import {EmtryHistory} from './historyDOM'
// import {testHistory} from './testHistory'
// import Spinner from '../../Compoments/Loading/Spinner'
import {getUserId, setHistoryAuth, getHistoryAuth} from '../../plugin/authUtils'
import { useHistory } from '../../plugin/useUserData'
import {handleUserHistory} from '../../plugin/webAPI'
import {descriptionGua, getGuaLiteByStr} from '../../Compoments/GuaArea/Logic'
import { nanoid } from 'nanoid'
import './index.css'
import GuaResultBoardcast from '../../Compoments/GuaArea/GuaResultBoardcast'
export default function History() {
  // const [localHistory, setLocalHistory] = useState([])

  const [history,setHistory] = useHistory()
  const [message, setMessage] = useState("")
  const frame_ref = useRef()
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
  const selectHistory = ()=>{
    
  }

  const addHistory = ()=>{
    const guaLite = getGuaLiteByStr("699966")
    const currTime =  new Date().toISOString()
    const user_id = getUserId()
    const history_id = nanoid()
    
    console.log(user_id)
    const  new_history = {
      history_id,
      user_id,
      "title": guaLite.title,
      "yaos_list":  guaLite.yaos_list,
      "create_time": currTime
    }
    let history = getHistoryAuth()
    console.log(history,"addHistory")
    setHistoryAuth([...history, new_history])
    setHistory([...history, new_history])
    
  }
  const deleteHistory = (history_id)=>{
    const new_history = history.filter(historyObj=> historyObj.history_id !== history_id)
    setHistoryAuth(new_history)
    setHistory(new_history)
    console.log(new_history)
    console.log('delete')
  }
  const handleTouch = (start_e)=>{
    let startY = start_e.touches[0].screenY
    frame_ref.current.addEventListener("touchmove",(end_e)=>{
      let endY = end_e.touches[0].screenY
      frame_ref.current.scrollTop-=(endY - startY)
      frame_ref.current.onTouchMove = null
    })    
  }

  return (
    <div className='history-container'>
        <Header></Header>
        <main>
          <h1 className='history-msg'>{message}</h1>
          <aside>
            <label>查詢</label>
            <input type='date'></input>
            <button onClick={addHistory}>新增</button>
          </aside>
          {/* <GuaResultBoardcast yaos_list={this.state.yaos_list}
                              data={this.data}
                              handleStoreHistory={this.addNewHistory}></GuaResultBoardcast> */}
          <div className="history-frame" onTouchStart={handleTouch} ref={frame_ref} > 
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
