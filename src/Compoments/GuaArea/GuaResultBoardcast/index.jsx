import React, { Component} from 'react'
import Yao from '../../GuaArea/Gua/Yao'
import './index.css'
// import {dragElement} from '../../../plugin/dragDom'
//import {test_guaObj_random} from '../../GuaArea/test_gua_data'
import {defineGua, defineAlterGua, descriptionGua} from '../../GuaArea/Logic.js'

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
  getFinalDesciption = (yaos_list, mode)=>{
      const gua = defineGua(yaos_list)
      const alter_gua =defineAlterGua(yaos_list)
      
      if(mode==="jiao"){
        const data = this.props.data.jiao_gua
        return data[gua.name][alter_gua.name]
      }else if(mode==='zhouyi'){
        const data = this.props.data.zhouyi_gua
        const description = descriptionGua(gua)
        let content = {}
        
        switch(description.type){
          case 0:
            content = data[gua.name]['gua_explain']
            break
          case 1:
            content = data[gua.name]['yao_explain'][gua.alter_yao[0]]
            break
          case 2:
            content = [data[gua.name]['yao_explain'][gua.alter_yao[1]],
                       data[gua.name]['yao_explain'][gua.alter_yao[1]]]
            break
          case 3:
            content = [ data[gua.name]['gua_explain'],
                        data[alter_gua.name]['gua_explain']]
            break
          case 4:
            content = data[alter_gua.name]['yao_explain'][alter_gua.normal_yao[0]]
            break
          case 5:
            content = data[alter_gua.name]['yao_explain'][alter_gua.normal_yao[0]]
            break
          case 6:
            if(gua.name==="乾"||gua.name==="坤"){
              content = data[gua.name]['yao_explain'][6]
            }else{
               content = data[alter_gua.name]['gua_explain']
            }
            break
          default:
            break
        }
        
      console.log(content)
        
      
      if(description.type===3){
        return <div className='gua-describe'>
                  <h2 style={{margin:'10px'}}>{description.describe}</h2>
                  <div className='gua-describe-content'>
                      <strong>{content[0].title}</strong>
                      <p>{content[0].content[0]}</p>
                      <br/>
                      <p>{content[0].content[1]}</p>
                      <hr/>
                      <strong>{content[1].title}</strong>
                      <p>{content[1].content[0]}</p>
                      <br/>
                      <p>{content[1].content[1]}</p>
                  </div>
              </div>
      }else{
        return <div className='gua-describe'>
                  <h2 style={{margin:'10px'}}>{description.describe}</h2>
                  <div className='gua-describe-content'>
                      <strong>{content.title}</strong>
                      {Array.isArray(content.content)?
                      <p>{content.content[0]}<br/><br/>{content.content[1]}</p>:<p>{content.content}</p>}
                  </div>
              </div>
      }
        
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

  
  render() {
 
    const {yaos_list}= this.props
   
    const isFulled = (yaos_list.length===6)
  
    let gua = defineGua(yaos_list)
    
    let alter_gua =defineAlterGua(yaos_list)

    let gua_content = this.createGuaContent(yaos_list) 
    
    let alter_gua_content = ''
    let describe_content = ''

    if(isFulled){
      alter_gua_content = this.createGuaContent(alter_gua.yaos_list)
      describe_content = this.getFinalDesciption(yaos_list, 'zhouyi') 
    }
   
    // const test_gua = test_guaObj_random(6)
    // const test_alter_gua = defineAlterGua(test_gua).yaos_list
    
    const title = isFulled?`${gua.name}之${alter_gua.name} 卦`:''

    return (
      <div  className={'result-boardcast' + (this.state.isClosed?" closed":"")}
            onClick={this.handleToggle}>
        <div>
          <h2 className='description-title'>{title}</h2>
          <div className='flex-row'>
            <div className='gua-block'>
              <h2 className='gua-label'>{gua.name}</h2>
              {gua_content}
            </div>
            <div className='gua-block'style={{display: isFulled?"flex":"none"}}>
              <h2 className='gua-label'>{alter_gua.name}</h2>
              {alter_gua_content}  
            </div>
          </div>
        </div>
        
        <div className='gua-description'style={{display: isFulled?"flex":"none"}}>
             {describe_content}   
        </div>
        <button className='close-btn' onClick={this.handleToggle}>X</button>
      </div>
    )
  }
}
