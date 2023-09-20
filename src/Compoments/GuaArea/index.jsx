import React, { Component } from 'react'

import GuaResultBoardcast from './GuaResultBoardcast'
import GuaMainArea from './GuaMainArea'
import GuaProcessController from './GuaProcessController'
import './index.css'
export default class GuaArea extends Component {

  state={
    curr_stage: "startStage",
    loop: 0,
    guas_list: [6,6,7,8,9,8],
    stage_index: [
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
      'finalStage',
    ],
    
    signs: []
  }
  initialState=()=>{
    const base_state = {
      curr_stage: "startStage",
      loop: 0,
      guas_list: [],
      signs: []
    }
    this.setState(base_state)
  }
  ////////////////////////////////////////////////////////// stage manger
  // startStage = ()=>{
  //   console.log("start")
  //   main.createSigns(50,'main_zone');
  //   controller.changeBtn("next");
  // }
  // tianStage = ()=>{
  //   console.log("tian")
  //   main.moveSigns(1, 'tian_zone');
  //   controller.changeBtn("next");
  // }
  // splitStage = ()=>{
  //   main.splitSign();
  //   controller.changeBtn("next");
  // }
  // choseStage = ()=>{
  //   controller.pick();
  //   main.removeSign();
    
  // }
  // divideStage = ()=>{
  //   main.divideSign();
  //   controller.changeBtn("next");
  // }
  // finalStage = ()=>{
  //   main.countSign();
  //   controller.changeBtn("next game");
  // }
  stageController = {
    startStage: this.startStage ,
    tianStage : this.tianStage,
    splitStage : this.splitStage,
    choseStage : this.choseStage,
    divideStage : this.divideStage,
    finalStage: this.finalStage
  }
  ////////////////////////////////////////////////////////////
  componentDidMount(){
    this.initialState();
  }

  render() {
    return (
      <div className='gua-container'>
        <div className="game-broadcast">
          <h1>請按"開始"</h1>
        </div>
        
        <GuaMainArea curr_stage={this.state.curr_stage} ></GuaMainArea>
        <GuaProcessController game={this.state} stageController={this.stageController}></GuaProcessController>
        <GuaResultBoardcast guas_list={this.state.guas_list}></GuaResultBoardcast>
      </div>
    )
  }
}
