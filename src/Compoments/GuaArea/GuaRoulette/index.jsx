import { useState } from 'react';
import './index.css'
import { gua_8_set } from '../data';

const DEFAULT_LOOP = {
    "radius": 50,
    "target": 0,
    "name": "default",
  }

export default function GuaRoulette(props){
  const { data } = props

  const [ center, setCenter ] = useState({"x":300,"y":0})
  const [ innerLoop, setInnerLoop ] = useState({...DEFAULT_LOOP, "name" : "inner"})
  const [ outerLoop, setOuterLoop ] = useState({...DEFAULT_LOOP, "name" : "outer"})

  console.log("data", data)

  const BAGUA_NATURE_ORDER = [0,1,2,3,7,6,5,4]
  const BAGUA_NURTURE_ORDER = [2,7,6,0,5,3,4,1]
  
  const createGuaContent = (top, bottom)=>{
    const index = bottom * 8 + parseInt(top)
    const guaObj = data.zhouyi_gua[data.gua.gua_64_name_set[index]]
    console.log(index)
    return <div>
              <h2>{guaObj.icon}</h2>
              <h2>{guaObj.name}</h2>
           </div>
  }
  const createGuaRoulette = (bagua_type, loop)=>{

    let order = []
    const gua_8_list = data.gua.gua_8

    if(bagua_type=="nature") order = BAGUA_NATURE_ORDER 
    if(bagua_type=="nurture") order = BAGUA_NURTURE_ORDER

    return order.map((value,i) => {
      const guaObj = gua_8_list[value]
      const content = 
      
      loop.name=="inner"?
      <>
        <p>{guaObj.name}</p> 
        <h1>{guaObj.icon}</h1>
      </>
      :
      <>
        <h1>{guaObj.icon}</h1>
        <p>{guaObj.name}</p> 
      </>
                      
      let a = (i-2)* Math.PI /4 

      // 坐標系 (x,-y) => (x,y)
      let left = center.x + Math.cos(a)*loop.radius - 25
      let top = center.y - (Math.sin(a)*loop.radius) - 25
      
      
      return(<div className='gua_roulette_item'
                  key={value} 
                  style={{
                    top,left,
                    transform: `rotateZ(${-45*i+"deg"})`

              }}
              data-i={value}>{content}</div>)
    }) 
    
  }
  const handleChange = (loop)=>{

    return (e)=>{
      if(loop == "inner")setInnerLoop({...innerLoop, [e.target.name]:e.target.value})
      if(loop == "outer")setOuterLoop({...outerLoop, [e.target.name]:e.target.value})
    }
  }

  return (
    <div className='gua-roulette-container'>
      <div className='gua-roulette'>
        <div className='gua-roulette-wheel'>
          <div  className='gua-roulette-loop inner' 
                style={{ "transformOrigin": `${center.x}px ${center.y}px`, 
                          "transform": `rotateZ(${innerLoop.target*45}deg)`}}>
              {data?createGuaRoulette("nature", innerLoop):null}
          </div>
          <div  className='gua-roulette-loop outer' 
                style={{ "transformOrigin": `${center.x}px ${center.y}px`, 
                          "transform": `rotateZ(${outerLoop.target*45}deg)`}}>
            {data?createGuaRoulette("nature", outerLoop):null}
          </div>
        </div>

        <div className='gua-roulette-content'>
          {data?createGuaContent(BAGUA_NATURE_ORDER[innerLoop.target],
                                 BAGUA_NATURE_ORDER[outerLoop.target]):null}
        </div>
      </div>
      <div  className='gua-test-range'>
        <input name='radius' type='range' 
              min={0} max={500} 
              value={innerLoop.radius} 
              onChange={handleChange("inner")}/>
        <input name='target' type='range' 
              min={0} max={7} step={1}
              value={innerLoop.target} 
              onChange={handleChange("inner")}/>
        <input name='radius' type='range'
              min={0} max={500} 
              value={outerLoop.radius} 
              onChange={handleChange("outer")}/> 
        <input name='target' type='range'
              min={0} max={7} step={1}
              value={outerLoop.target} 
              onChange={handleChange("outer")}/> 
        </div>
    </div>
  );
};
