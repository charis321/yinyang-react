import React, { Component} from 'react'
import Yao from '../../GuaArea/Gua/Yao'
import './index.css'
// import {dragElement} from '../../../plugin/dragDom'
//import {test_guaObj_random} from '../../GuaArea/test_gua_data'
import {defineGua, defineAlterGua} from '../../GuaArea/Logic.js'
export default class GuaResultBoardcast extends Component {
  state = {
    isClosed: true,
  }
  handleToggle = ()=>{
    const {isClosed} = this.state
    this.setState({isClosed:!isClosed})
  } 
  createGuaContent = (yaos_list)=>{
      const result = []
      yaos_list.map((yaoObj, index)=>{
          result[index] = <Yao yaoObj={yaoObj} key={index}></Yao>
       })
      return result
  } 
  render() {
    
    const {yaos_list}= this.props
    const isFulled = (yaos_list.length===6)

    const gua = defineGua(yaos_list)
  
    const alter_yaos_list =defineAlterGua(yaos_list)
    const alter_gua = defineGua(alter_yaos_list)

    const gua_content = this.createGuaContent(yaos_list)
    const alter_gua_content = isFulled?this.createGuaContent(alter_yaos_list):""
   
    // const test_gua = test_guaObj_random(6)
    // const test_alter_gua = defineAlterGua(test_gua).yaos_list
    
    const title = isFulled?`${gua.name}卦 之 ${alter_gua.name}卦`:''

    return (
      <div  id="result-boardcast"  
            className={'container' + (this.state.isClosed?" closed":"")} 
       
            >
        <h2 className='description-title'>{title}</h2>
        <div className='flex-row'>
            <div className='gua-block'>
            <h2 className='gua-label'>{gua.name}</h2>
            {gua_content}
            </div>
          <div className='gua-block'>
            <h2 className='gua-label'>{alter_gua.name}</h2>
            {alter_gua_content}  
          </div>
        </div>
        <button className='close-btn' onClick={this.handleToggle}>X</button>
      </div>
    )
  }
}
