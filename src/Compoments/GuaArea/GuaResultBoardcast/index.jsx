import React, { useContext, useEffect, useRef, useState} from 'react'
import Yao from '../../GuaArea/Gua/Yao'
import { getZhouyiDOM, getJiaoDOM } from './descriptionDOM'
import './index.css'
import {defineGua, defineAlterGua, descriptionGua, getGuaLite} from '../../GuaArea/Logic.js'
import {useUser} from "../../../plugin/hooks/useUserData.js"
import setScrollMobile from '../../../plugin/scrollDom.js'
import { GuaResultHint } from '../GuaHint/index.jsx'

/* 
    mode: 1. zhouyi 朱熹解易 (default)
          2. jiao   焦式解易 
*/  

export default function GuaResultBoardcast (props){
  const [isClosed, setIsClosed] = useState(true)
  const [mode, setMode] = useState("zhouyi")
  const boardcast_ref = useRef()
            
   useEffect(()=>{
    setScrollMobile(boardcast_ref.current)
  },[])
  
  useEffect(()=>{
    setIsClosed(props.isBoardcastClosed)
  },[props.isBoardcastClosed])

  const handleToggle = ()=>{  
    setIsClosed(!isClosed)
  } 
  const handleSwitchMode=(mode)=>{
    return () => setMode(mode) 
  }
  const handleKeepResult=(isKeeping, guaObj={})=>{
    return () => {
      
      if(isKeeping){
        const {handleStoreHistory, yaosList} = props
        
        let guaLite = getGuaLite(yaosList)
        console.log("guaLite",guaLite)

        handleStoreHistory(guaLite)
      }
      setIsClosed(true)
      props.setStage(false, 0)
    }
  }

  const createGuaContent = (yaosList)=>{
      const result = []
      yaosList.map((yaoObj, index)=>{
          result[index] = <Yao yaoObj={yaoObj} key={index}></Yao>
       })

      return result
  } 
  
  const getFinalDesciption = (yaosList, mode)=>{
      const gua = defineGua(yaosList)
      const alter_gua =defineAlterGua(yaosList)
      
      if(mode==="jiao"){
        const gua_data = data.jiao_gua

        return getJiaoDOM(gua, alter_gua, gua_data)

      }else if(mode==='zhouyi'){
        const gua_data = data.zhouyi_gua
        const description = descriptionGua(gua)
        return getZhouyiDOM(gua, alter_gua, gua_data, description)
    }
  }
  // description(obj):
  //   --gua
  //   --altergua 
  //   --describe
  //   --action: {
  //     main: "normal",
  //     supper: "null",
  //     isUseYao: false,
  //     isUseAlterYao: true
  //    }
  //   
  
  const {yaosList, data} = props
  const isFulled = (props.yaosList.length===6)

  let alter_gua_content=""
  let describe_content=""
  
  let title = ''
  

  const gua = defineGua(yaosList)
  const alter_gua = defineAlterGua(yaosList)
  const gua_content= createGuaContent(yaosList)
  const isAlterGuaDisplay = isFulled&&(gua.name!==alter_gua.name)

  if(isFulled){
    alter_gua_content = createGuaContent(alter_gua.yaosList)
    describe_content = getFinalDesciption(yaosList, mode) 

    title =gua.name===alter_gua.name?`${gua.name} 卦`:`${gua.name}之${alter_gua.name} 卦`
  }
  const className = "result-boardcast scroll-block" + (isFulled?" fulled":"") + (isClosed?" closed":"")  
  return (
    <div className='gua-result-boardcast-container'>
      <div  className={className} 
            onClick={isFulled?null:handleToggle} 
            ref={boardcast_ref}>
        <div >
          <h2 className='description-title'>{title}</h2>
          <div className='flex-row'>
            <div className='gua-block'>
              <h2 className='gua-label'>{gua.name}</h2>
              {gua_content}
            </div>
            <div className='gua-block' style={{display: isAlterGuaDisplay?"flex":"none"}}>
              <h2 className='gua-label'>{alter_gua.name}</h2>
              {alter_gua_content}  
            </div>
          </div>
        </div>
        <div className='gua-description-mode' style={{display: isFulled?"block":"none"}}>
          <button className='zhouyi-btn' onClick={handleSwitchMode("zhouyi")}>朱熹解易</button>
          <button className='jiao-btn'  onClick={handleSwitchMode("jiao")}>焦式解易</button>
        </div>
        <div className='gua-description' style={{display: isFulled?"flex":"none"}}>
              {describe_content}   
        </div>
        <div className='restore-result' style={{display: isFulled?"flex":"none"}}>
        <button className='keep-result' onClick={handleKeepResult(true)}>保留結果</button>
          <button className='drop-result' onClick={handleKeepResult(false)}>捨棄</button>
        </div>
        
        <button className='show-btn' onClick={handleToggle}></button>
        <button className='close-btn' onClick={handleToggle} style={{display: isFulled?"block":"none"}}>X</button>
      </div>
      {/* <GuaResultHint pos={{top: "50%", left: "5%"}}/> */}
    </div>
    
  )
  
}
