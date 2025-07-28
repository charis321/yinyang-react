import React, {useState, useEffect, useRef} from 'react'
import { nanoid } from 'nanoid'
import Header from '../../Compoments/Header'
import GuaResultBoardcast from '../../Compoments/GuaArea/GuaResultBoardcast'
import {HistoryList,EmtryHistory} from '../../Compoments/History'
import {descriptionGua, getGuaLiteByStr, getYaosListByStr} from '../../Compoments/GuaArea/Logic'
import { useHistory, useUser } from '../../plugin/hooks/useUserData'
import {handleUserHistory} from '../../plugin/webAPI'
import {getUserId, setHistoryAuth, getHistoryAuth} from '../../plugin/authUtils'
import setScrollMobile from '../../plugin/scrollDom'
import './index.css'
import { GuaDescribe } from '../../Compoments/GuaArea/GuaDescribe'
// import Spinner from '../../Compoments/Loading/Spinner'
// import GuaResultBoardcast from '../../Compoments/GuaArea/GuaResultBoardcast'


export default function History(props) {
  // const [localHistory, setLocalHistory] = useState([])

  const [history,setHistory] = useHistory() 
  const [user] = useUser()
  const [targetHistory, setTargetHistory] = useState(false)
  const [message, setMessage] = useState("")
  const [isDescribeClosed , setIsDescribeClosed] = useState(true)
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
    setScrollMobile(frame_ref.current)
    console.log("history", history)
    console.log("user", user)
   
    if(user.userId!==-1){
      handleUserHistory("list", {userId: user.userId}).then((data)=>{
        if(data.code===200){
            const history = data.data
            console.log("get history succ", history)
            setHistory(history)
        }else{
            console.log("get history fail", data)
            setMessage(data.msg)
        }
      }) 
      .catch(e=>{
          console.log("Network problem", e)
          setMessage(e.message)
      })
    }else{
      setMessage(" # 您現在是 <遊客> 身分")
    }
    
    // initialHistory() 
    // handleUserHistory("list", {userId}).then((data)=>{
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
  //   const userId = getUserId()
  //   if(userId===-1) 

   
  // }

  // const handleSortHistory=()=>{
    
  // }
  const selectHistory = ()=>{
    
  }
  const showHistory = (historyObj)=>{
    setTargetHistory(historyObj)
    setIsDescribeClosed(false)
    console.log(isDescribeClosed)
  }
  const handleDescribe = (isClosed)=>{
    setIsDescribeClosed(isClosed)
  }
  const deleteHistory = (historyId)=>{
    const new_history = history.filter(historyObj=> historyObj.historyId !== historyId)
    
    if(user.userId===-1){
      setHistoryAuth(new_history)
    }else{
      handleUserHistory("delete",{historyId}).then((data)=>{
        setHistoryAuth(new_history)
      })
      .catch(e=>{
        window.alert("連線發生問題，請稍後再試") 
      })
    } 
  } 

  return (
    <div className='history-container'>
        <Header></Header>
        <main>
          
          <aside>
            <span style={{color: 'red'}} className='history-msg'>{message}</span>
            <div>
              <span style={{color: history.length > 90?"red":"#000"}}>{history.length}</span>
              / 100
            </div>
            <form >
              <label>查詢</label>
              <input type='date'></input>
              到
              <input type='date'></input>
            </form>
            {
              isDescribeClosed?null : <GuaDescribe  isClosed={isDescribeClosed} 
                                                    handleClosed= {handleDescribe}
                                                    history={targetHistory}
                                                    data={props.data}></GuaDescribe>
            }
          </aside>
          <div className="history-frame scroll-block" ref={frame_ref} > 
            {
              history.length === 0 ?
              <EmtryHistory></EmtryHistory>
              :
              <HistoryList  historys={history}
                            showHistory={showHistory}
                            deleteHistory={deleteHistory}></HistoryList>
            }
          </div>        
        </main>
    </div>
  )
}
