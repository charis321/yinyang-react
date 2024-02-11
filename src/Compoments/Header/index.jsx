import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import {useDevice, useScreenOrientation} from "../../plugin/useRWD"
import './index.css'

export default function Header() { 
    const device = useDevice()
    const orientation = useScreenOrientation()
    const [isClosed, setIsclosed] = useState(true)
   
    useEffect(()=>{
        setIsclosed(device==="mobile")
    },[device])

    const handleToggle = ()=>{
        setIsclosed(!isClosed)
    }

    return (
        <header>
            <Link className='logo' to="../Home"></Link>
            {
                isClosed?"":<NavBar></NavBar>
            }
            <div className='nav-btn' onClick={handleToggle} style={{display: device==="mobile"?"block":"none"}}></div>
        </header>
    )
}
