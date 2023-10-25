import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import {useDevice} from "../../plugin/useRWD"
import './index.css'

export default function Header() { 
    const device = useDevice()
    const [isClosed, setIsclosed] = useState(true)
   
    useEffect(()=>{
        setIsclosed(device!=="PC")    
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
            <div className='nav-btn' onClick={handleToggle}></div>
        </header>
    )
}
