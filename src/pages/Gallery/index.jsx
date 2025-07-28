import { useState, useEffect, useRef } from "react"
import Header from "../../Compoments/Header"
import './index.css'
import setScrollMobile from "../../plugin/scrollDom"

export default function GalleryPage(props){
    const [target, setTarget] = useState(null)
    const { data } = props
    const menuRef = useRef()
    const contentRef = useRef()

    useEffect(()=>{
        setScrollMobile(menuRef.current)
        setScrollMobile(contentRef.current)
    },[])
  
    if(!data.zhouyi_gua) data.zhouyi_gua = []

    let data_sorted = Array(64)
    for(let [_, guaObj] of Object.entries(data.zhouyi_gua)){
        data_sorted[guaObj["index"]-1] = guaObj
    }

    const handleChange = (target_name)=>{
        return ()=>{
            setTarget(target_name)
        }
    }
    const createContent = (target)=>{
        const guaObj = data.zhouyi_gua[target]
        return (
            <div>
                <h1>{guaObj['icon'] + guaObj['name']}</h1>
                <strong>{guaObj['gua_explain'].title}</strong>
                {   
                    guaObj['gua_explain'].content.map((explain,i)=>{
                            return  <p key={i}>{explain}</p>           
                    }) 
                }
                {  
                    guaObj['yao_explain'].map((obj,i)=>{
                        return (<div key={i}>
                                    <strong>{obj.title}</strong>
                                    <p>{obj.content}</p>
                                </div>
                            )
                    })
                }
            </div>  
        )
    }

    const handleScroll = (direction)=>{
        return ()=>{
            if(menuRef.current){
                const scrollStep = 150
                const scrollWidth = menuRef.current.scrollWidth
                const scrollLeft = menuRef.current.scrollLeft
                if(direction === 'left'){
                    menuRef.current.scrollLeft = Math.max(0, scrollLeft - scrollStep)
                }else{
                    menuRef.current.scrollLeft = Math.min(scrollWidth, scrollLeft + scrollStep)
                }
            }
        }
    }


    return (
        <div className="gallery-page-container">
            <Header></Header>
            <main>
                <div className="gallery">
                    <div className="gallery-menu">
                        <div className="scroll-control left" onClick={handleScroll("left")}>
                            <p>❰❰</p>
                        </div>
                        <div className="scroll-block xl" ref={menuRef}>
                            <ul>
                            {   
                                data_sorted.map(guaObj=>{
                                    return <li  className={"gallery-menu-item"+(target===guaObj.name?" active":"")} 
                                                onClick={handleChange(guaObj.name)}
                                                key={guaObj.index}>
                                                {guaObj.icon+" "+guaObj.name}
                                            </li>
                                    }
                                )
                            } 
                            </ul>
                        </div>
                        <div className="scroll-control right" onClick={handleScroll("right")}>
                            <p>❱❱</p>
                        </div>
                    </div>
                    <div className="gallery-content" style={{display: target?'flex':'none'}} ref={contentRef}>{target?createContent(target):null}</div>
                </div>            
            </main>
        </div>
    )
}