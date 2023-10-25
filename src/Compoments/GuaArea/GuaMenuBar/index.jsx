import React, {useState } from 'react'
import GuaDict from '../GuaDict'
import './index.css'
export default function GuaMenuBar (props){
    const [closed, setClosed] = useState(true)

    const handleToggle=()=>{
        setClosed(closed => !closed)
    }
    
    return (
        <div className={`gua-menu-bar ${closed?"closed":""}`} >
            <ul>
                <li>
                    <button className='gua-menu-item'>返回主頁</button>
                </li>
                <li>
                    <GuaDict data={props.data}  className='gua-menu-item'></GuaDict>
                </li>
                <li>
                    <button   className='gua-menu-item' onClick={props.initialStage}>重新開始</button>
                </li>
                <li>
                    <button   className='gua-menu-item' onClick={props.handleRandom}>隨機</button>
                </li>
                <li>
                    <button   className='gua-menu-item' onClick={handleToggle} >#</button>
                </li>
                
            </ul>
        </div>
    )
    
}
