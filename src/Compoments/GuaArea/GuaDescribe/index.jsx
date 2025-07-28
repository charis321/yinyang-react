import React, { useEffect, useRef, useState } from 'react'
import Yao from '../../GuaArea/Gua/Yao';
import { getZhouyiDOM, getJiaoDOM } from './descriptionDOM'
import {defineGua, defineAlterGua, descriptionGua, getGuaLite, getYaosListByStr} from '../../GuaArea/Logic.js'
import setScrollMobile from '../../../plugin/scrollDom.js'
// import Glitch from '../../../plugin/cssFilter/glitch'
import './index.css'
/* 
    mode: 1. zhouyi 朱熹解易 (default)
          2. jiao   焦式解易 
*/  

export function GuaDescribe(props){
  const [isClosed] = useState(props.isClosed)
  const [mode, setMode] = useState("zhouyi")
  const boardcast_ref = useRef()

  useEffect(()=>{
    console.log("useEffect")
    setScrollMobile(boardcast_ref.current)
    
  },[])
  
 
  const handleToggle = ()=>{
    props.handleClosed(!isClosed)
  }
  const handleSwitchMode=(mode)=>{
    return () => setMode(mode) 
  }
  const getFinalDesciption = (yaosList, mode, data)=>{
    const gua = defineGua(yaosList)
    const alter_gua =defineAlterGua(yaosList)
    
    if(mode==="jiao"){
      const gua_data = data.jiao_gua

      return getJiaoDOM(gua, alter_gua, gua_data)

    }else if(mode==='zhouyi'){
      const gua_data = data["zhouyi_gua"]
      const description = descriptionGua(gua)
      return getZhouyiDOM(gua, alter_gua, gua_data, description)
  }
}
  const createGuaPattern = (yaosList)=>{
    const result = []
    yaosList.map((yaoObj, index)=>{
        result[index] = <Yao yaoObj={yaoObj} key={index}></Yao>
     })
    return result
} 

  const {history, data} = props
  let {yaosList} = history 
  
  yaosList = getYaosListByStr(yaosList)

  let alter_gua_content=""
  let describe_content=""
  let title = ''
  
  const gua = defineGua(yaosList)
  const alter_gua = defineAlterGua(yaosList)
  const gua_content= createGuaPattern(yaosList)
  const isAlterGuaDisplay = (gua.name!==alter_gua.name)


  alter_gua_content = createGuaPattern(alter_gua.yaosList)
  describe_content = getFinalDesciption(yaosList, mode, data) 

  title =gua.name===alter_gua.name?`${gua.name} 卦`:`${gua.name}之${alter_gua.name} 卦`

  const className = "result-boardcast scroll-block" + (isClosed?" closed":"")  
  return (
    <div className='gua-describe-container'>
      <div className={className}  ref={boardcast_ref}>
        <h2 className='description-title'>{title}</h2>
        <div className='flex-row'>
            <div className='gua-block'>
                <h2 className='gua-label'>{gua.name}</h2>
                {gua_content}
                <div className='gua-brush'></div>
            </div>
            <div className='gua-block' style={{display: isAlterGuaDisplay?"flex":"none"}}>
                <h2 className='gua-label'>{alter_gua.name}</h2>
                {alter_gua_content}  
            </div>
        </div>
     
      <div className='gua-description-mode'>
          <button className={'zhouyi-btn'+ (mode==="zhouyi"?" active":null)} onClick={handleSwitchMode("zhouyi")}>朱熹解易</button>
          <button className={'jiao-btn'+ (mode==="jiao"?" active":null)}  onClick={handleSwitchMode("jiao")}>焦式解易</button>
      </div>
      <div className='gua-description'>
          {describe_content}   
      </div>
      <button className='close-btn' onClick={handleToggle}>X</button> 
    </div>
      {/* <Glitch></Glitch> */}
    </div>
  )
}