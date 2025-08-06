import { useState, useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import Header from "../../Compoments/Header"
import GuaGallery from "../../Compoments/GuaArea/GuaGallery"
import GuaRoulette from "../../Compoments/GuaArea/GuaRoulette"
import './index.css'

export default function GalleryPage(props){
    const { data } = props

    return (
        <div className="gallery-page-container">
            <Header></Header>
            <main>
                 <Outlet></Outlet>
            </main>
        </div>
    )
}