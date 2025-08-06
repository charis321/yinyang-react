import { useState, useEffect, useRef } from "react"
import setScrollMobile from "../../../plugin/scrollDom"
import './index.css'

export default function GuaGallery(props){
  const [target, setTarget] = useState(null)
  const [fontSize, setFontSize] = useState("small")
  const { data } = props
  const menuRef = useRef()
  const contentRef = useRef()

  const fontSizeMap = {
      "big": "1.5rem",
      "medium": "1.2rem",
      "small": "1rem"
  }

  useEffect(()=>{
      setScrollMobile(menuRef.current)
      setScrollMobile(contentRef.current)
  },[])

  if(Object.keys(data).length===0){
     data.zhouyi_gua = []
  }

  let data_sorted = Array(64)
  for(let [_, guaObj] of Object.entries(data.zhouyi_gua)){
      data_sorted[guaObj["index"]] = guaObj
  }
  

  const handleTargetChange = (target_name)=>{return () => setTarget(target_name)}
  const handleFontChange = (e) => { setFontSize(e.target.value)}

  const createContent = (target)=>{
      const guaObj = data.zhouyi_gua[target]
      const bottom_gua = data.gua.gua_8[Math.floor(guaObj.index/8)]
      const top_gua = data.gua.gua_8[guaObj.index%8]
      return (
          <div className="gallery-content-main">
              <div className="gallery-content-header">
                  <h1>{guaObj['icon'] + guaObj['name']}</h1>
                  <h2>{top_gua.index==bottom_gua.index?
                      `${guaObj['name']}為${top_gua.phenomenon}`
                      :
                      `${top_gua.phenomenon + bottom_gua.phenomenon}卦`}</h2>
              </div>
              <span>上卦: {top_gua.icon + top_gua.name}</span>
              <br></br>
              <span>下卦: {bottom_gua.icon + bottom_gua.name} </span>
              <hr></hr>
              <br/>
              <strong>{guaObj['gua_explain'].title}</strong>
              <br/>
              <br/> 
              {   
                  guaObj['gua_explain'].content.map((explain,i)=>{
                          return  <div key={i}>
                                      <p>{explain}</p>  
                                      <br></br>
                                  </div> 
                                    
                  }) 
              }
              {  
                  guaObj['yao_explain'].map((obj,i)=>{
                      return (<div key={i}>
                                  <strong>{obj.title}</strong>
                                  <p>{obj.content}</p>
                                  <br></br>
                              </div>
                          )
                  })
              }
              <hr/>
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



  return(
    <div className="gallery">
          <div className="gallery-menu">
              <div className="gallery-menu-control left" onClick={handleScroll("left")}>
                  <p>❰❰</p>
              </div>
              <div className="gallery-menu-main scroll-block xl" ref={menuRef}>
                  <ul>
                  {   
                      data_sorted.map(guaObj=>{
                          return <li  className={"gallery-menu-item"+(target===guaObj.name?" active":"")} 
                                      onClick={handleTargetChange(guaObj.name)}
                                      key={guaObj.index}>
                                      {guaObj.icon+" "+guaObj.name}
                                  </li>
                          }
                      )
                  } 
                  </ul>
              </div>
              <div className="gallery-menu-control right" onClick={handleScroll("right")}>
                  <p>❱❱</p>
              </div>
          </div>
          <div className="gallery-content" 
              style={{ fontSize: fontSizeMap[fontSize],
                        display: target?'flex':'none'}} 
              ref={contentRef}>

              { target?createContent(target):null }
              
              <div className="gallery-font-control" >
                  <h2>字體大小: </h2>
                  {/* <input type="select"></input>
                  <button onClick={handleFontChange("big")}>大</button>
                  <button onClick={handleFontChange("medium")}>中</button>
                  <button onClick={handleFontChange("small")}>小</button> */}
                  <select className="gallery-font-size" id="font-size" value={fontSize} onChange={handleFontChange}>
                    <option value="small" >小</option>
                    <option value="medium">中</option>
                    <option value="big">大</option>
                  </select>       
              </div>
          </div>
      </div>   
  )
}