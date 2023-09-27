import React, { Component } from 'react'
import './index.css'
export default class GuaHitbox extends Component {
  

  setPlace=(place)=>{
    const place_data = this.props.placeIndex[place]
    return {
      left:  `${place_data[0]-place_data[2]/2}%`,
      top:   `${place_data[1]-place_data[3]/2}%`,
      width: `${place_data[2]}%`,
      height:`${place_data[3]}%`,
      backgroundColor: this.props.touchIndex[place]? "rgba(255, 255, 255, 0.5)":''
    }
  }
  handleTouch=(place,isTouched)=>{
    if(!this.props.isDragging) return 
    // this.props.getTouch(place,isTouched)
  }
  render() {
    
    return (
      <div className='gua-hitbox'>
        <div className='zone tian-zone ' 
             style={this.setPlace("tian")} 
             onMouseEnter={this.handleTouch("tian",true)}
             onMouseLeave={this.handleTouch('tian',false)}></div>
        <div className='zone main-zone ' 
             style={this.setPlace("main")} 
             onMouseEnter={this.handleTouch("main",true)}
             onMouseLeave={this.handleTouch('main',false)}></div>
        <div className='zone left-zone ' 
             style={this.setPlace("left")} 
             onMouseEnter={this.handleTouch("left",true)}
             onMouseLeave={this.handleTouch('left',false)}></div>
        <div className='zone right-zone ' 
             style={this.setPlace("right")} 
             onMouseEnter={this.handleTouch("right",true)}
             onMouseLeave={this.handleTouch('right',false)}></div>
        <div className='zone banish-zone ' 
             style={this.setPlace("banish")} 
             onMouseEnter={this.handleTouch("banish",true)}
             onMouseLeave={this.handleTouch('banish',false)}></div>
      </div>
    )
  }
}
