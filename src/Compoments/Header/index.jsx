import React, { useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import './index.css'

export default function Header() {
    const [isClosed, setIsclosed] = useState(true)
    const handleToggle =()=>{
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
