import React, { Component } from 'react'
import GuaHitbox  from '../GuaHitbox'
import Sign from '../Sign'
import './index.css'
export default class GuaMainArea extends Component {
  
  state = {
    signs: [],
    isSpliting: false,
    isDividing: false,
    isDragging: true,
    isChosed:  false,
    spliterIndex: -1,
    canNext: false, 

    signShrink: false,
    signWidth:  1,
    signHeight: 3,
    spliterWidth: 1*3,
    placeIndex: {
      tian  : [50, 10, 50 , 20],
      main  : [50, 50, 100, 25],
      left  : [20, 45, 50 , 25],
      right : [80, 45, 50 , 25],
      banish: [10, 80, 50 , 40]
    },
    touchIndex: {
      tian:  {place: "tian"  , touchable:false, isTouched:false},
      main:  {place: "main"  , touchable:false, isTouched:false},
      left:  {place: "left"  , touchable:false, isTouched:false},
      right: {place: "right" , touchable:false, isTouched:false},
      banish:{place: "banish", touchable:false, isTouched:false},
      now: "none"
    },
    
      
  }
  componentDidMount(){
    const { handleArea } = this.props
    handleArea(this, "GuaMainArea")
  }
  ////////////////////////////////////        sign manger
  createSigns = (number)=>{
    const {signs} = this.state
    const new_signs = [...signs]

    for(let i=0;i<number;i++){
      new_signs[i] = {
          index: i,
          localIndex: i,
          place: "main",
          left: 0,
          top: 0,
          bias: `rotateZ(${Math.random()*8-4}deg) translateY(${Math.random()*8-4}px)`
      }
    }
    this.setState({signs:new_signs},()=>{
      console.log('create')
    })
  }
  sortSigns = (place)=>{
    const new_signs = [...this.state.signs]
    const {signWidth,
          signHeight,
          isDragging,
          isSpliting,
          isDividing, 
          isChosed,
          placeIndex,
          spliterIndex,
          spliterWidth} = this.state
    const new_state = {...this.state}
    
    const splitableIndex ={
      tian  :  false,
      main  :  true,
      left  :  true,
      right :  true,
      banish:  false
    } 
    const localSigns_n = this.countSigns(place)
    
    let curr_left_offset = 0
    let localIndex = 0
    let base_left_offset = (signWidth*localSigns_n/2)/2
    const spliter_n = splitableIndex[place]?(Math.round(this.countSigns(place)/4) - 1): 0
    
    if(isDividing){
      base_left_offset += (spliter_n*spliterWidth/6)/2
    } 
    if(isSpliting&&spliterIndex!==-1){
      base_left_offset += spliterWidth
    }
    let tmp = 0
    new_signs.map((signObj)=>{
      if(signObj.place===place){
        signObj.left = `calc(${placeIndex[place][0]}% - ${base_left_offset - curr_left_offset}px)`
        signObj.top = `calc(${placeIndex[place][1]}% - ${signHeight/ 2}px )`
        signObj.localIndex = localIndex
        curr_left_offset += signWidth/2 
        if(localIndex === spliterIndex&&isSpliting){
          curr_left_offset += spliterWidth
        }
        if(localIndex%4 === 3
          &&isDividing
          &&localIndex!==(localSigns_n-1)
          &&splitableIndex[place]){
          curr_left_offset += (spliterWidth/3)/2
          tmp++
        }
        localIndex++
      }
    })
    ///////////////////////////// checkpoint
    if((this.props.curr_stage==='tianStage'&&this.countSigns('tian')===0)
      ||(this.props.curr_stage==='splitStage'&&spliterIndex===-1)
      ||(this.props.curr_stage==='choseStage'&&!isChosed)){
        this.props.changeNextBtn(false)
    }else{
        this.props.changeNextBtn(true)
        const {touchIndex} = this.state
        touchIndex["tian"].touchable = false
        touchIndex["banish"].touchable = false
        new_state.touchIndex = touchIndex
        this.setState(touchIndex,()=>{
          console.log('touch')
        })
    }

    new_state.signs = new_signs
    // console.log(new_state)
    this.setState(new_state,()=>{
      console.log('sort')
    })
  }
  moveSigns = (signsIndex, place_to, place_from="main")=>{
    const new_signs = [...this.state.signs]
    
    signsIndex.map((signIdx)=>{
      new_signs.map((signObj)=>{
        if(signObj.localIndex===signIdx&&signObj.place===place_from){
          signObj.place = place_to
        }
      })
    })

    this.setState({signs:new_signs})
  }
  splitSigns = ()=>{
    const new_sign = [...this.state.signs]
    const {touchIndex} = this.state
    new_sign.map(signObj=>{
      if(signObj.place==='left'||signObj.place==='right'){
        signObj.place = 'main'
        signObj.bias = `rotateZ(${Math.random()*8-4}deg) translateY(${Math.random()*8-4}px)`
      }
    })
    let new_spliter_idx = -1;
    touchIndex["tian"].touchable = false
    // new_spliter_idx = Math.floor(Math.random()*6) - 3 + Math.floor(this.countSigns('main')/2)
    
    this.setState({
      signs: new_sign, 
      spliterIndex: new_spliter_idx,
      isSpliting: true,
      isDragging: false,
      isDividing: false,
      touchIndex
    },()=>{this.sortSigns('main')})
    
   
  }
  pickSigns =  ()=>{
    
    const {touchIndex} = this.state
    touchIndex["banish"].touchable = true
    this.setState({
      isDividing: false,
      isSpliting: false,
      isChosed: false,
      // signWidth: 8,
      // signHeight: 80,
      touchIndex
    },async()=>{
      const {spliterIndex} = this.state
      const totalIndex = Array(this.countSigns('main')).fill(1).map((_,i)=>i)
      const leftIndex = totalIndex.slice(0,spliterIndex+1)
      const rightIndex =  totalIndex.slice(spliterIndex+1)
      this.moveSigns(leftIndex,'left')
      this.moveSigns(rightIndex,'right')
      this.sortSigns('left')
      this.sortSigns('right')
      await this.delay(0.1)
      this.setState({isDragging: true})
    })

  }
  banishSigns = ()=>{
    let new_signs = []
    this.state.signs.map(signObj=>{
      if(signObj.place!=="banish") new_signs.push(signObj)
    })
    this.setState({signs: new_signs})
  }
  divideSigns = (data)=>{
    let new_signs = [...this.state.signs]
    new_signs.map(signObj=>{
      signObj.bias = ''
    })
   
    this.setState({
      signs: new_signs,
      isDividing: true,
      isDragging: false,
      isSpliting: false
    }, async()=>{
      this.sortSigns('left')
      await this.delay(1)
      this.sortSigns('right') 
      await this.delay(1)
      
      
      //await this.delay(2) 
    })
  }
  modSigns = (data)=>{
    let new_signs = [...this.state.signs]
    
      
      //await this.delay(2) 

    const left_n = this.countSigns('left')
    const right_n = this.countSigns('right')
    const trimLeft = (left_n%4===0)? 4 : (left_n%4)
    const trimRight = (right_n%4===0)? 4 : (right_n%4)

    const totallLeft  = Array(trimLeft ).fill(1).map((_,i)=> left_n -trimLeft +i)
    const totallRight = Array(trimRight).fill(1).map((_,i)=> right_n-trimRight+i)
    
    this.moveSigns(totallLeft ,"banish","left")
    this.moveSigns(totallRight,"banish","right")
    this.sortSigns("left")
    this.sortSigns("right")
    this.sortSigns("banish")
    
  }
  defineSigns=()=>{
    const new_sign = [...this.state.signs]
    new_sign.map(signObj=>{
      if(signObj.place==='left'||signObj.place==='right'){
        signObj.place = 'main'
        signObj.bias = ''
      }
    })
    const {touchIndex} = this.state
    touchIndex["banish"].touchable = false
    this.setState({
      signs:new_sign,
      isDividing: true,
      isDragging: false,
      isSpliting: false,
      touchIndex
    },()=>{
      this.sortSigns('main')
    })
    const n = this.countSigns('main')/4
    return n
  }
  setSpliter=(index)=>{
    const spliterIndex = this.countSigns('main')===index+1?index-1:index
    this.setState({spliterIndex},()=>{this.sortSigns('main')})
  }
  countSigns=(place)=>{
    let n_place = 0
    const {signs} = this.state
    signs.map(signObj=>{
      if(signObj.place===place) n_place++
    })
    return n_place
  }
  resetSigns=()=>{
    const initialState={
      signs: [],
      isSpliting: false,
      isDividing: false,
      isDragging: true,
      spliterIndex: -1,

      signWidth:  window.innerWidth>=1000? 20: 15,
      signHeight: window.innerWidth>=1000? 200: 150,
      spliterWidth: window.innerWidth>=1000? 60: 45,

      touchIndex: {
        tian:  {place: "tian"  , touchable:false, isTouched:false},
        main:  {place: "main"  , touchable:false, isTouched:false},
        left:  {place: "left"  , touchable:false, isTouched:false},
        right: {place: "right" , touchable:false, isTouched:false},
        banish:{place: "banish", touchable:false, isTouched:false},
        now: "none"
      }
    }
    this.setState(initialState)
  }
  tianSigns=()=>{
    const {touchIndex} = this.state
    touchIndex.tian.touchable = true
    this.setState({
      isDragging: true,
      touchIndex
    })
  }
//////////////////////////////////////////
  getTouch=(place, isTouched)=>{
    const {touchIndex} = this.state
    touchIndex[place]["isTouched"] = isTouched
    touchIndex["now"] = isTouched? place : "none"
    this.setState({touchIndex})
  }
  getDragged=(sign,place_to,place_from)=>{
    if(!this.state.isChosed){
      this.setState({isChosed: true},()=>{
        this.moveSigns([sign.localIndex], place_to, place_from)
        this.sortSigns(place_to)
        this.sortSigns(place_from)
      })
    }else{
      this.moveSigns([sign.localIndex], place_to, place_from)
      this.sortSigns(place_to)
      this.sortSigns(place_from)
    }
  }

  delay=async(second)=>{
    return new Promise((resolve)=>{
      setTimeout(resolve, second*1000);
   });
  }
  

  render() {
    
    return (
      <div className='gua-main-container'>
        {
          this.state.signs.map(signObj=>{
            return <Sign  signObj={signObj} 
                          placeIndex={this.state.placeIndex}
                          touchIndex={this.state.touchIndex}
                          isSpliting={this.state.isSpliting}
                          isDragging={this.state.isDragging}
                          isDividing={this.state.isDividing}
                          setSpliter={this.setSpliter}
                          getDragged={this.getDragged}
                          signWidth={this.state.signWidth}
                          signHeight={this.state.signHeight}
                          key={signObj.index} ></Sign>
          })
        }
        <GuaHitbox  isDragging={this.state.isDragging}
                    placeIndex={this.state.placeIndex}
                    touchIndex={this.state.touchIndex}
                    getTouch={this.getTouch}
                    ></GuaHitbox>
      </div>
    )
  }
}
