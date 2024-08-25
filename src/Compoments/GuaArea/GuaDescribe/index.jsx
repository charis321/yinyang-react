import React, { useEffect, useState } from 'react'
import Yao from '../../GuaArea/Gua/Yao';
import { getZhouyiDOM, getJiaoDOM } from './descriptionDOM'
import {defineGua, defineAlterGua, descriptionGua, getGuaLite, getYaosListByStr} from '../../GuaArea/Logic.js'
import './index.css'
/* 
    mode: 1. zhouyi 朱熹解易 (default)
          2. jiao   焦式解易 
*/  

export function GuaDescribe(props){
  const [isClosed, setIsClosed] = useState(props.isClosed)
  const [mode, setMode] = useState("zhouyi")
 
  const handleToggle = ()=>{
    props.handleClosed(!isClosed)
  }
  const handleSwitchMode=(mode)=>{
    return () => setMode(mode) 
  }
  const getFinalDesciption = (yaos_list, mode, data)=>{
    const gua = defineGua(yaos_list)
    const alter_gua =defineAlterGua(yaos_list)
    
    if(mode==="jiao"){
      const gua_data = data.jiao_gua

      return getJiaoDOM(gua, alter_gua, gua_data)

    }else if(mode==='zhouyi'){
      const gua_data = data["zhouyi_gua"]
      const description = descriptionGua(gua)
      return getZhouyiDOM(gua, alter_gua, gua_data, description)
  }
}
  const createGuaPattern = (yaos_list)=>{
    const result = []
    yaos_list.map((yaoObj, index)=>{
        result[index] = <Yao yaoObj={yaoObj} key={index}></Yao>
     })
    return result
} 

  const {history, data} = props
  let {yaos_list} = history 
  
  yaos_list = getYaosListByStr(yaos_list)

  let alter_gua_content=""
  let describe_content=""
  let title = ''
  
  const gua = defineGua(yaos_list)
  const alter_gua = defineAlterGua(yaos_list)
  const gua_content= createGuaPattern(yaos_list)
  const isAlterGuaDisplay = (gua.name!==alter_gua.name)


  alter_gua_content = createGuaPattern(alter_gua.yaos_list)
  describe_content = getFinalDesciption(yaos_list, mode, data) 

  title =gua.name===alter_gua.name?`${gua.name} 卦`:`${gua.name}之${alter_gua.name} 卦`

  const className = "result-boardcast scroll-block" + (isClosed?" closed":"")  
  return (
    <div className='gua-describe-container'>
      <div className={className}>
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
     
      <div className='decription-mode'>
          <button className='zhouyi-btn' onClick={handleSwitchMode("zhouyi")}>朱熹解易</button>
          <button className='jiao-btn'  onClick={handleSwitchMode("jiao")}>焦式解易</button>
      </div>
      <div className='gua-description'>
          {describe_content}   
      </div>
      <button className='close-btn' onClick={handleToggle}>X</button> 
    </div>
    </div>
  )
}