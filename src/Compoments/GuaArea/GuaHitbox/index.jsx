import React, {useState} from 'react'

import './index.css'
export default function GuaHitbox (props){
  const [isTouching, setIsTouching] = useState(false);

  const setPlace=(place)=>{
    const {placeIndex, touchIndex} = props
    const place_data = placeIndex[place]
    return {
      left:  `${place_data[0]-place_data[2]/2}%`,
      top:   `${place_data[1]-place_data[3]/2}%`,
      width: `${place_data[2]}%`,
      height:`${place_data[3]}%`,
      pointerEvents: touchIndex[place].touchable?"auto":"none",
      backgroundColor: touchIndex[place].isTouched&&touchIndex[place].touchable? "rgba(255, 255, 255, 0.5)":'',
      animation: `${touchIndex[place].touchable?"emphasize":"none"} 2s infinite`
    }
  }
  const handleTouch=(place, isTouched)=>{
      return () => {
        if(isTouching === !isTouched && props.isDragging){
          setIsTouching(isTouched)
          props.getTouch(place,isTouched)
        }
      }
    
  }

 
    
  return (
    <div className='gua-hitbox'>
      <div className='zone tian-zone ' 
            style={setPlace("tian")} 
          //  onPointerDown={this.handleClick}
            onPointerEnter={handleTouch("tian",true)}
            onPointerLeave={handleTouch('tian',false)}
            ></div>

      <div className='zone banish-zone ' 
            style={setPlace("banish")} 
            onPointerEnter={handleTouch("banish",true)}
            onPointerLeave={handleTouch('banish',false)}></div>
    </div>
  )
  
}
