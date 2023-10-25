import React, { useEffect, useState} from 'react'
import Yao from '../../GuaArea/Gua/Yao'
import { getZhouyiDOM, getJiaoDOM } from './descriptionDOM'
import './index.css'
// import {dragElement} from '../../../plugin/dragDom'
//import {test_guaObj_random} from '../../GuaArea/test_gua_data'
import {defineGua, defineAlterGua, descriptionGua} from '../../GuaArea/Logic.js'

export default function GuaResultBoardcast (props){
  const [isClosed, setIsClosed] = useState(true)
  const [mode, setMode] = useState("none")
  
  const handleToggle = ()=>{  
    setIsClosed(!isClosed)
  } 
  const handleSwitchMode=(mode)=>{
    return ()=>{
      setMode(mode)
    } 
  }

  const createGuaContent = (yaos_list)=>{
      const result = []
      yaos_list.map((yaoObj, index)=>{
          result[index] = <Yao yaoObj={yaoObj} key={index}></Yao>
       })

      return result
  } 
  
  const getFinalDesciption = (yaos_list, mode)=>{
      const gua = defineGua(yaos_list)
      const alter_gua =defineAlterGua(yaos_list)
      
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
  
  const {yaos_list, data} = props
  const isFulled = (props.yaos_list.length===6)
  
  
  let alter_gua_content="";
  let describe_content=""; 
 

  const gua = defineGua(yaos_list)
  const alter_gua = defineAlterGua(yaos_list)
  const gua_content= createGuaContent(yaos_list)
      
  if(isFulled){
    alter_gua_content = createGuaContent(alter_gua.yaos_list)
    describe_content = getFinalDesciption(yaos_list, mode) 
  }
  
  const title = isFulled?`${gua.name}之${alter_gua.name} 卦`:''
  const className = "result-boardcast scroll-block" + (isFulled?" fulled":"") + (isClosed?" closed":"")  
  return (
    <div  className={className} onClick={isFulled?null:handleToggle}>
      
        <div >
          <h2 className='description-title'>{title}</h2>
          <div className='flex-row'>
            <div className='gua-block'>
              <h2 className='gua-label'>{gua.name}</h2>
              {gua_content}
            </div>
            <div className='gua-block' style={{display: isFulled?"flex":"none"}}>
              <h2 className='gua-label'>{alter_gua.name}</h2>
              {alter_gua_content}  
            </div>
          </div>
        </div>
        <div className='decription-mode' style={ {display: isFulled?"block":"none"}}>
          <button className='zhouyi-btn' onClick={handleSwitchMode("zhouyi")}>朱熹解易</button>
          <button className='jiao-btn'  onClick={handleSwitchMode("jiao")}>焦式解易</button>
        </div>
        <div className='gua-description' style={{display: isFulled?"flex":"none"}}>
              {describe_content}   
        </div>
        <button className='show-btn' onClick={handleToggle}></button>
        <button className='close-btn' onClick={handleToggle} style={{display: isFulled?"block":"none"}}>X</button>
     
    </div>
  )
  
}
