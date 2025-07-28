import React, { Component } from 'react'
import axios from 'axios'
import GuaResultBoardcast from './GuaResultBoardcast'
import GuaMainArea from './GuaMainArea'
import GuaProcessController from './GuaProcessController'

import GuaMenuBar from './GuaMenuBar'
import {defineYao}from'../GuaArea/Logic'
import './index.css'
import GuaDict from './GuaDict'
import { handleUserHistory } from '../../plugin/webAPI'
import { getUserAuth, setHistoryAuth, getHistoryAuth} from '../../plugin/authUtils'
import { nanoid } from 'nanoid'


export default class GuaArea extends Component {  
  state={
    loop: 0,
    curr_stage_index: 0,
    curr_stage: "startStage",
    yaosList: [],
    broadcast_text: "",
    isBoardcastClosed: true,
    canNext: false,
    showNewResultAnimate: 3000,
    stageIndex: [
      'initialStage',
      'startStage',
      'tianStage',
      'splitStage', //[turn 1]
      'choseStage', 
      'divideStage',
      'modStage',
      'splitStage', //[turn 2]
      'choseStage',
      'divideStage',
      'modStage',
      'splitStage', //[turn 3]
      'choseStage',
      'divideStage',
      'modStage',
      'defineStage',
      'finalStage'
    ],
    stageText:{
      "initialStage":"請按【開始】",
      "startStage":"準備五十支籌策\n 【大衍之數五十，其用四十有九】---《繫辭》",
      "tianStage": "放一支籌策到上方\n【大衍之數五十，其用四十有九】---《繫辭》",
      "splitStage":"將籌策分成兩堆\n 【分而為二以象兩】---《繫辭》",
      "choseStage":"選擇一邊, 移開一支籌策\n 【掛一以象三】---《繫辭》",
      "divideStage":"以四為單位分為一小堆，最後剩下的餘數拿出來\n【揲之以四以象四時，歸奇於扐以象閏】---《繫辭》",
      "modStage":"以四為單位分為一小堆，最後剩下的餘數拿出來\n【揲之以四以象四時，歸奇於扐以象閏】---《繫辭》",
      "defineStage": "此為--------",
      "finalStage": "---------",
    },
    controllers: {
      "start-btn": false ,
      "next-btn" : false ,
      "result-btn": false ,
   }
  }

  area = {}
  data = {}

  initialState=async()=>{
    const base_state = {
      loop: 0,
      curr_stage_index: 0,
      curr_stage: "initialtStage",
      broadcast_text: "請按【開始】",
      yaosList: [],
    }
    this.area['GuaMainArea'].resetSigns()
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
    
    await this.initialState()
    
    this.setState({
      controllers:{
        "start-btn": true ,
        "next-btn" : false ,
        "result-btn": false
      },
      canNext: true
   })
  }
  startStage = async(data)=>{
    console.log("start")
    this.setState({curr_stage:"startStage"})
    this.sendNewBroadcast(this.state.stageText['startStage'])
    //console.log(0,this.area["GuaMainArea"].state.signs)
    await this.area["GuaMainArea"].resetSigns()
    await this.area["GuaMainArea"].createSigns(50)
    //console.log(2,this.area["GuaMainArea"].state.signs)
    await this.area["GuaMainArea"].sortSigns("main")
    this.setState({
      controllers:{
        "start-btn": false,
        "next-btn" : true ,
        "result-btn": false,
      }
   })
    // console.log(2,this.area["GuaMainArea"].state.signs)
    //this.area["GuaMainArea"].createSigns(50)  
  }
  tianStage = async(data)=>{
    console.log("tian")
    this.setState({curr_stage:"tianStage",})
    this.sendNewBroadcast(this.state.stageText['tianStage'])
    this.setState({
      controllers:{
        "start-btn": false ,
        "next-btn" : false ,
        "result-btn": false,
      }
   })
    await this.area["GuaMainArea"].tianSigns()
    // await this.area["GuaMainArea"].moveSigns([1], "tian");
    // await this.area["GuaMainArea"].sortSigns("tian");
    // await this.area["GuaMainArea"].sortSigns("main");
  }
  splitStage = async(data)=>{
    console.log("split")
    this.setState({curr_stage:"splitStage"})
    this.sendNewBroadcast(this.state.stageText['splitStage'])
    
    await this.area["GuaMainArea"].splitSigns();  
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
  modStage = (data)=>{
    console.log("mod")
    this.setState({curr_stage:"modStage"})
    this.sendNewBroadcast(this.state.stageText['modStage'])
    
    this.area["GuaMainArea"].modSigns();
    // controller.changeBtn("next");
  }
  defineStage= async(data)=>{
    console.log("define")
    this.setState({curr_stage:"defineStage"})
    
    const result =  this.area["GuaMainArea"].defineSigns();
    const new_yao =  defineYao(result)
    const new_yaosList = [...this.state.yaosList, new_yao]
    this.sendNewBroadcast(`此為: ${new_yao.name}`)

    if(this.state.yaosList.length===6){
      console.log("isFull")
      const controllers = {
          "start-btn": false ,
          "next-btn" : false ,
          "result-btn": true
      }
      this.setStage({controllers, yaosList: new_yaosList})
    }else{
      this.setState({yaosList: new_yaosList}, this.showNewResult)
    }
    
    // controller.changeBtn("next game");
  }
  finalStage = (data)=>{
    console.log("fianl")
    this.setState({curr_stage:"finalStage", isBoardcastClosed: false})
    this.sendNewBroadcast(this.state.stageText['finalStage'])
    // this.updateUserHistory()
    // // controller.changeBtn("next game");
    console.log(this.state.yaosList)
    const controllers = {
      "start-btn": false ,
      "next-btn" : false ,
      "result-btn": false,
    }
    this.setState({controllers})
  }
  stageController = {
    initialStage: this.initialStage,
    startStage  : this.startStage ,
    tianStage   : this.tianStage,
    splitStage  : this.splitStage,
    choseStage  : this.choseStage,
    divideStage : this.divideStage,
    modStage    : this.modStage,
    defineStage : this.defineStage,
    finalStage  : this.finalStage
  }
  ////////////////////////////////////////////////////////////
  /*setStage: 直接控制stage更換 using=> isNext: Boolean
            
    next: 決定下一個stage為何   using=>  curr_stage_index,
                                        yaosList
  */
  setStage = async(isNext=true, target_stage_index=-1, data={})=>{
    // console.log(`current stage: ${this.state.curr_stage_index}, loop: ${this.state.loop}`)

    if(isNext) await this.next(target_stage_index)
    const {curr_stage_index, stageIndex} = this.state
    if(target_stage_index!==-1){
      await this.stageController[stageIndex[target_stage_index]](data)
    }else{
      await this.stageController[stageIndex[curr_stage_index]](data)
    }
    
  }
  next= async(target_stage_index)=>{
    let {curr_stage_index, yaosList, loop} = this.state
    
   
    if(yaosList.length>=6 && curr_stage_index>=16) return this.initialState() 
  
    if((curr_stage_index+1) > 15 && yaosList.length<6){
      curr_stage_index = 1
      loop++  
    }else{
      curr_stage_index++
    }

    if(target_stage_index!==-1){
      curr_stage_index = target_stage_index
    }
    console.log("next",curr_stage_index)
    this.setState({curr_stage_index, loop})
  }

  loadData = (dataName, dataPath)=>{
    axios.get(`./${dataPath}`).then(response=>{
      this.data[dataName] = response.data
      // console.log("loadData",this.data)
    }).catch(error=>{
      console.log(error);
    });
  }
  getRandomGua=()=>{
    const randon_n = Array(6).fill(0).map(_=>{return defineYao(Math.floor(Math.random()*4)+6)})
    this.initialState()
    this.setState({isBoardcastClosed: false, yaosList: randon_n}, () => this.setStage(false, 16))
  }
  changeNextBtn=(bool)=>{
    const {controllers} = this.state
    controllers['next-btn'] = bool
    this.setState({controllers})
  }
  
  ///////////////////////////////////////////////  處理卜卦結果(history)
  addNewHistory=(guaLite)=>{
    const userId = getUserAuth().userId
    const currTime =  new Date().toISOString()
    const historys = getHistoryAuth()

    const new_history = {
      userId,
      "title": guaLite.title,
      "yaosList":  guaLite.yaosList,
      "createTime": currTime
    }

    console.log(new_history,"new")
    if(userId===-1){
      const historyId = nanoid()
      new_history.historyId = historyId
      setHistoryAuth([...historys, new_history])
    }else{
      handleUserHistory("add", new_history).then((data)=>{
        console.log("新增成功",data) 
      })
      .catch(err=>{
        console.log("新增失敗",err)
      })
      
    }
  }

  showNewResult = async()=>{
    this.setState({isBoardcastClosed: false})
    // ()=>{
    //   setTimeout(()=>{
    //     this.setState({isBoardcastClosed: true})
    //   }, this.state.showNewResultAnimate)
    // })

  }

  componentDidMount(){
    this.initialStage();
    
    if(Object.keys(this.data).length === 0){
      this.loadData('jiao_gua','jiao_gua.json')
      this.loadData('zhouyi_gua','zhouyi_gua_2.json')
    }
    
  }
  


  render() {
    const chinese_number = ["零","壹","貳","參","肆","伍","陸","柒","捌","玖"]
    const turn = Math.max(Math.floor(this.state.curr_stage_index/4), 0)

    return (
      <div className='gua-container'>
        <div className="gua-broadcast" >
          <div className='gua-broadcast-text'>
            <h1>{this.state.broadcast_text}</h1>
          </div>
          <div className="gua-state-info">
            <h1>{"進行次數: "+ this.state.loop}</h1>
            <h1>{chinese_number[turn]+"巡"}</h1>
          </div>
        </div>
        
        <GuaMainArea  curr_stage={this.state.curr_stage} 
                      handleArea={this.handleArea} 
                      changeNextBtn={this.changeNextBtn}
                      ></GuaMainArea>
        <GuaProcessController game={this.state} 
                              stageController={this.stageController}
                              controllers={this.state.controllers}
                              handleArea={this.handleArea}
                              handleCanNext={this.handleCanNext}
                              setStage={this.setStage}></GuaProcessController>
        <GuaResultBoardcast yaosList={this.state.yaosList}
                            data={this.data}
                            setStage={this.setStage} 
                            isBoardcastClosed={this.state.isBoardcastClosed}
                            handleStoreHistory={this.addNewHistory}></GuaResultBoardcast>
        
        {/* <GuaDict data={this.data}></GuaDict> */}
        <GuaMenuBar data={this.data} 
                    toggleGuaDict={this.toggleGuaDict}
                    initialStage={this.initialStage}
                    handleRandom={this.getRandomGua}></GuaMenuBar>
      </div>
      
    )
  }
}
