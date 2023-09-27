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
    spliterIndex: -1,

    signShrink: false,
    signWidth:  20,
    signHeight: 200,
    spliterWidth: 20*3,
    placeIndex: {
      tian  : [50, 5,20,10],
      main  : [50,50,100,25],
      left  : [20,50,50,25],
      right : [80,50,50,25],
      banish: [50,95,100,25]
    },
    touchIndex: {
      top:     false,
      main:    false,
      left:    false,
      right:   false,
      banish : false
    }

  }
  componentDidMount(){
    const { handleArea} = this.props
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
    this.setState({signs:new_signs})
  }
  sortSigns = (place)=>{
    const new_signs = [...this.state.signs]
    const {signWidth,
           signHeight,
           isSpliting,
           isDividing,
           spliterIndex,
           spliterWidth} = this.state
    const placeIndex = {
      tian  : [50, 5],
      main  : [50,50],
      left  : [20,50],
      right : [80,50],
      banish: [50,95]
    }
    const splitIndex ={
      tian  :  false,
      main  :  true,
      left  :  true,
      right :  true,
      banish:  false
    } 
    const localSigns_n = this.countSigns(place)
    
    let curr_left_offset = 0
    let localIndex = 0
    let base_left_offset = signWidth*localSigns_n/2
    const spliter_n = splitIndex[place]?(Math.round(this.countSigns(place)/4) - 1): 0
    if(isDividing){
      base_left_offset += spliter_n*spliterWidth/6
    } 
    if(isSpliting){
      base_left_offset += spliterWidth
    }

    new_signs.map((signObj)=>{
      if(signObj.place===place){
        signObj.left = `calc(${placeIndex[place][0]}% - ${base_left_offset - curr_left_offset}px)`
        signObj.top = `calc(${placeIndex[place][1]}% - ${signHeight/ 2}px )`
        signObj.localIndex = localIndex
        curr_left_offset += signWidth 
        if(localIndex === spliterIndex&&isSpliting){
          curr_left_offset += spliterWidth
        }
        if(localIndex%4 === 3
          &&isDividing
          &&localIndex!==localSigns_n
          &&splitIndex[place]){
          curr_left_offset += spliterWidth/6 
        }
  
        localIndex++
      }
    })
    this.setState({signs:new_signs})
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
    new_sign.map(signObj=>{
      if(signObj.place==='left'||signObj.place==='right'){
        signObj.place = 'main'
        signObj.bias = `rotateZ(${Math.random()*8-4}deg) translateY(${Math.random()*8-4}px)`
      }
    })
    let new_spliter_idx = -1;
    this.setState({
      signs: new_sign,
      signWidth: 20,
      signHeight: 200
    })
    new_spliter_idx = Math.floor(this.countSigns('main')/2)

    this.setState({
      // signs: new_signs, 
      spliterIndex: new_spliter_idx,
      isSpliting: true,
      isDragging: false,
      isDividing: false,
    },()=>{this.sortSigns('main')})
    
   
  }
  pickSigns =  ()=>{
    this.setState({
      isSpliting: false,
      signWidth: 8,
      signHeight: 80
    },()=>{
      const {spliterIndex} = this.state
      const totalIndex = Array(this.countSigns('main')).fill(1).map((_,i)=>i)
      const leftIndex = totalIndex.slice(0,spliterIndex+1)
      const rightIndex =  totalIndex.slice(spliterIndex+1)
      this.moveSigns(leftIndex,'left')
      this.moveSigns(rightIndex,'right')
      this.sortSigns('left')
      this.sortSigns('right')
    })

  }
  divideSigns = (data)=>{
    let new_signs = [...this.state.signs]
    new_signs.map(signObj=>{
      signObj.bias = ''
    })
    this.moveSigns([0], "banish",data.side);
    this.sortSigns("banish");
   
    this.setState({
      signs: new_signs,
      isDividing: true,
      isDragging: true
    }, ()=>{
      this.sortSigns('left')
      this.sortSigns('right') 

      //await this.delay(2) 

      const left_n = this.countSigns('left')
      const right_n = this.countSigns('right')
      const trimLeft = (left_n%4===0)? 4 : (left_n%4)
      const trimRight = (right_n%4===0)? 4 : (right_n%4)
  
      const totallLeft  = Array(trimLeft ).fill(1).map((_,i)=>trimLeft-i-1 )
      const totallRight = Array(trimRight).fill(1).map((_,i)=>trimRight-i-1)
      
      this.moveSigns(totallLeft ,"banish","left")
      this.moveSigns(totallRight,"banish","right")
      this.sortSigns("left")
      this.sortSigns("right")
      this.sortSigns("banish")
    })
   
    
  }
  defineSigns=()=>{
    const new_sign = [...this.state.signs]
    new_sign.map(signObj=>{
      if(signObj.place==='left'||signObj.place==='right'){
        signObj.place = 'main'
        signObj.bias = ''
      }
    })
    this.setState({
      signs:new_sign,
      isDividing: true,
      isDragging: false
    },()=>{
      this.sortSigns('main')
    })
    const n = this.countSigns('main')/4
    return n
  }
  setSpliter=(index)=>{
    console.log(index)
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

      signWidth:  20,
      signHeight: 200,
      spliterWidth: 20*3
    }
    this.setState(initialState)
  }
//////////////////////////////////////////
  getTouch=(place, isTouched)=>{
    const {touchIndex} = this.state
    touchIndex[place] = isTouched
    this.setState({touchIndex},()=>{ console.log(touchIndex)})
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
                          isSpliting={this.state.isSpliting}
                          isDragging={this.state.isDragging}
                          setSpliter={this.setSpliter}
                          getCollision={this.getCollision}
                          signWidth={this.state.signWidth}
                          signHeight={this.state.signHeight}
                          key={signObj.index} ></Sign>
          })
        }
        <GuaHitbox  isDragging={this.state.isDragging}
                    placeIndex={this.state.placeIndex}
                    touchIndex={this.state.touchIndex}
                    getTouch={this.getTouch}></GuaHitbox>
      </div>
    )
  }
}
