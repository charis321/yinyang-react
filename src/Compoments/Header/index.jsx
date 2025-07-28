import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import {useDevice, useScreenOrientation} from "../../plugin/hooks/useRWD"
import './index.css'

export default function Header() { 
    const device = useDevice()
    const orientation = useScreenOrientation()
    const [isClosed, setIsclosed] = useState(true)
    console.log(orientation)
    useEffect(()=>{
        setIsclosed(device!=="PC")
    },[device, orientation])

    const handleToggle = ()=>{
        setIsclosed(!isClosed)
    }

    return (
        <header className={ orientation==='portrait-primary'||device==="PC"?"":"collapsed"}>
            <Link className='logo' to="../Home"></Link>
            {
                isClosed?"":<NavBar></NavBar>
            }
            <div className='nav-btn' onClick={handleToggle} style={{display: device==="PC"?"none":"block"}}></div>
        </header>
    )
}
