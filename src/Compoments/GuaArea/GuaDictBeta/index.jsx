import React, { useEffect, useMemo, useState } from 'react'
// import { gua_64_set, gua_8_set} from '../data'
import axios from 'axios'
import './index.css'
export function GuaDictBeta (props){
    const {data} = props
    const [mode, setMode] = useState(true)

    if(!data.zhouyi_gua) return

    
    let data_sorted = Array(64)
    for(let [_, guaObj] of Object.entries(data.zhouyi_gua)){
        data_sorted[guaObj["index"]-1] = guaObj
    }
    
    const handleToggleMode = ()=>{
        setMode(!mode)
    }

    return (
        <div className='gua-dict-beta-container'>   
            {
                
            }
            <div className='dict-box'>
            {
                data_sorted.map((guaObj , i)=>{
                    let r = 0
                    if(mode) r = i * 360/64 

                    return <div className="dict-item" key={guaObj.index} style={{transform: `rotateX(80deg) rotateZ(${r +'deg'})`}}>
                                <p style={{transform: `rotateX(0deg)  rotateZ(${-r + 'deg'}`}}>
                                    {guaObj.name}
                                </p>
                            </div>
                })
            }   
            </div>
            <button className='mode-btn' onClick={handleToggleMode}>switch to {mode?"直立":"圓"}</button>
        </div>
    )
}
export function GuaDictAlpha (props){
    const [mode, setMode] = useState(true)

    const data = props.data.zhouyi_gua
    let data_sorted = Array(64)

    for(let [_, guaObj] of Object.entries(data)){
        data_sorted[guaObj["index"]-1] = guaObj
    }
    
    const handleToggleMode = ()=>{
        setMode(!mode)
    }

    return (
        <div className='gua-dict-beta-container'>   
            <div className='dict-box'>
            {
                data_sorted.map((guaObj , i)=>{
                    let r = 0
                    if(mode) r = i * 360/64  +'deg'

                    return <div className="dict-item" key={guaObj.index} style={{transform: ` rotateZ(${r})`}}>
                                {guaObj.name}
                            </div>
                })
            }   
            </div>
            <button className='mode-btn' onClick={handleToggleMode}>switch to {mode?"直立":"圓"}</button>
        </div>
    )
}


