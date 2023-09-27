import React, { Component } from 'react'

import GuaResultBoardcast from './GuaResultBoardcast'
import GuaMainArea from './GuaMainArea'
import GuaProcessController from './GuaProcessController'
import GuaDict from './GuaDict'
import GuaHitbox from './GuaHitbox'
import {defineYao}from'../GuaArea/Logic'
import './index.css'
export default class GuaArea extends Component {
  
  state={
    loop: 0,
    curr_stage_index: 0,
    curr_stage: "startStage",
    
    yaos_list: [],
    broadcast_text: "請按開始",
    stageIndex: [
      'initialStage',
      'startStage',
      'tianStage',
      'splitStage', //[turn 1]
      'choseStage', 
      'divideStage',
      'splitStage', //[turn 2]
      'choseStage',
      'divideStage',
      'splitStage', //[turn 3]
      'choseStage',
      'divideStage',
      'defineStage',
    ],
    stageText:{
      "initialStage":"請按【開始】",
      "startStage":"準備五十支籌策",
      "tianStage": "放一支籌策到上方",
      "splitStage":"將籌策分成兩堆",
      "choseStage":"選擇一邊, 移開一支籌策",
      "divideStage":"以四支為單位",
      "defineStage": "*****",
      "finalStage": "---------",
    }
  }
  area = {}
  initialState=async()=>{
    const base_state = {
      loop: 0,
      curr_stage_index: 0,
      curr_stage: "startStage",
      broadcast_text: "請按開始",
      stageIndex: [
        'initialStage',
        'startStage',
        'tianStage',
        'splitStage', //[turn 1]
        'choseStage', 
        'divideStage',
        'splitStage', //[turn 2]
        'choseStage',
        'divideStage',
        'splitStage', //[turn 3]
        'choseStage',
        'divideStage',
        'defineStage',
      ],
      stageText:{
        "initialStage":"請按【開始】",
        "startStage":"準備五十支籌策",
        "tianStage": "放一支籌策到上方",
        "splitStage":"將籌策分成兩堆",
        "choseStage":"選擇一邊, 移開一支籌策",
        "divideStage":"以四支為單位",
        "defineStage": "*****",
        "finalStage": "---------",
      }
    }
    this.setState(base_state)
  }
  sendNewBroadcast=(text)=>{
    this.setState({broadcast_text:text})
  }
  handleArea = (instance, name)=>{
    this.area[name] = instance;
  }
  ////////////////////////////////////////////////////////// stage manger
  initialStage = async(data)=>{
    console.log("initial")
    this.setState({curr_stage:"initialStage"})
    this.sendNewBroadcast(this.state.stageText['initialStage'])

    await this.area["GuaMainArea"].resetSigns()
    
  }
  startStage = async(data)=>{
    console.log("start")
    this.setState({curr_stage:"startStage"})
    this.sendNewBroadcast(this.state.stageText['startStage'])
    //console.log(0,this.area["GuaMainArea"].state.signs)
    await this.area["GuaMainArea"].createSigns(50)
    //console.log(2,this.area["GuaMainArea"].state.signs)
    await this.area["GuaMainArea"].sortSigns("main")
    // console.log(2,this.area["GuaMainArea"].state.signs)
    //this.area["GuaMainArea"].createSigns(50)  
  }
  tianStage = async(data)=>{
    console.log("tian")
    this.setState({curr_stage:"tianStage"})
    this.sendNewBroadcast(this.state.stageText['tianStage'])
    await this.area["GuaMainArea"].moveSigns([1], "tian");
    await this.area["GuaMainArea"].sortSigns("tian");
    await this.area["GuaMainArea"].sortSigns("main");
  }
  splitStage = async(data)=>{
    console.log("split")
    this.setState({curr_stage:"splitStage"})
    this.sendNewBroadcast(this.state.stageText['splitStage'])
    
    const result = await this.area["GuaMainArea"].splitSigns();  
    // controller.changeBtn("next");
  }
  choseStage = async(data)=>{
    console.log("chose")
    this.setState({curr_stage:"choseStage"})
    this.sendNewBroadcast(this.state.stageText['choseStage'])
    
    await this.area["GuaMainArea"].pickSigns();
    // main.removeSign(); 
  }
  divideStage = (data)=>{
    console.log("divide")
    this.setState({curr_stage:"divideStage"})
    this.sendNewBroadcast(this.state.stageText['divideStage'])
    
    this.area["GuaMainArea"].divideSigns(data);
    // controller.changeBtn("next");
  }
  defineStage=(data)=>{
    console.log("define")
    this.setState({curr_stage:"defineStage"})
    this.sendNewBroadcast(this.state.stageText['defineStage'])
    
    const result = this.area["GuaMainArea"].defineSigns();
    const new_yaos_list = [...this.state.yaos_list, defineYao(result)]
    
    this.setState({yaos_list: new_yaos_list},()=>{console.log(this.state)})
    // controller.changeBtn("next game");
  }
  finalStage = (data)=>{
    console.log("fianl")
    this.setState({curr_stage:"finalStage"})
    this.sendNewBroadcast(this.state.stageText['finalStage'])
    
    // controller.changeBtn("next game");
  }
  stageController = {
    initialStage: this.initialStage,
    startStage  : this.startStage ,
    tianStage   : this.tianStage,
    splitStage  : this.splitStage,
    choseStage  : this.choseStage,
    divideStage : this.divideStage,
    defineStage: this.defineStage,
    finalStage  : this.finalStage
  }
  ////////////////////////////////////////////////////////////
  componentDidMount(){
    this.initialState();
    this.setStage(false)
  }
  setStage = async(isNext=true, data={})=>{
    if(isNext) await this.next()
    console.log(`current stage: ${this.state.curr_stage_index}, loop: ${this.state.loop}`)
    const {curr_stage_index, loop, stageIndex} = this.state
    await this.stageController[stageIndex[curr_stage_index]](data)
  }
  next= async()=>{
    let {curr_stage_index, loop} = this.state
    //console.log(curr_stage_index)
    
    if((curr_stage_index+1) > 12){
      curr_stage_index = 0
      loop++  
    }else{
      curr_stage_index++
    }
    
    this.setState({curr_stage_index, loop})
  }

  render() {
    return (
      <div className='gua-container'>
        <div className="gua-broadcast" style={{height: "10vh"}}>
          <h1>{this.state.loop + this.state.broadcast_text}</h1>
        </div>
        
        <GuaMainArea curr_stage_index={this.state.curr_stage_index} handleArea={this.handleArea}></GuaMainArea>
        <GuaProcessController game={this.state} 
                              stageController={this.stageController} 
                              handleArea={this.handleArea}
                              setStage={this.setStage}></GuaProcessController>
        <GuaResultBoardcast yaos_list={this.state.yaos_list} handleArea={this.handleArea}></GuaResultBoardcast>
        <GuaDict handleArea={this.handleArea}></GuaDict>
      </div>
    )
  }
}
