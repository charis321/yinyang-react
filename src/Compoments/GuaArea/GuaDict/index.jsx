import React, { useEffect, useState } from 'react'
import {gua_data_set, half_gua_set} from '../data'
import './index.css'
export default function GuaDict (props){
    
    const [isClosed,setIsClosed ] = useState(props.isClosed)
    const [isShowing,setIsShowing ] = useState(false)
    const [nowShowing,setNowShowing ] = useState("")
    const [gallery,setGallery] = useState([])

    useEffect(()=>{
        setGallery(createGuaGallery)
    },[])
    // updateGalleryShow=(index)=>{
    //     return ()=>{
            
    //         let gua = gua_data_set[index]
    //         // function closeGalleryShow(){
    //         //     console.log(this,"close")
    //         //     // gua_gallery.hidden = false
    //         //     // gua_gallery_show.hidden = true
    //         // }
    //         gua_gallery_show.innerHTML= `
    //             <button class="gua-gallery-close" onclick="closeGalleryShow()"}>X</button>
    //             <h1>${gua.icon}&nbsp<span>${gua.name}</span></h1>
    //             <h2>${gua.name+'，'+gua.intro}</h2>
    //         `
    //         console.log(index)
    //         gua.content.forEach(parse=>{
    //             let new_parse = document.createElement("p");
    //             new_parse.innerText = parse;
    //             gua_gallery_show.appendChild(new_parse);
    //         });
    //         gua_gallery.hidden = true
    //         gua_gallery_show.hidden = false
    //     }
        
    // }
    
    
    function createGuaGallery(){
        let new_dataset = [{name:'',index:10000,icon:''},...half_gua_set]
        for(let i=0;i<8;i++){
            let tmp = []
            for(let j=0;j<9;j++){
                if(j===0){
                    tmp[j] = half_gua_set[i]
                }else{
                    tmp[j] = gua_data_set[i*8 + j - 1]
                }    
            }
            new_dataset = [...new_dataset, ...tmp]        
        }
        
        return new_dataset
    }
    
    
    function getGuaContent(){
        if(nowShowing==='') return ''
        const mode = 'zhouyi_gua'
        const guaObj = props.data[mode][nowShowing]
        let gallery_content= 
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
        
        return gallery_content
    }
    

    const handleToggle = ()=>{
        setIsClosed(isClosed=>!isClosed)
    }
    const handleToggleShow = ()=>{
        setIsShowing(isShowing=>!isShowing)
    }
    const handleItemClick=(name)=>{
        return ()=>{
            if(name==='') return 
            setNowShowing(name)
            setIsShowing(true)
        }
    }
              
        
    return (
        <div className='gua-dict-container'>
            <div className='gua-dict-block' hidden={isClosed}>
                <h2>六十四卦</h2>
                <div className="gua-gallery" style={{display: isShowing?"none":"flex"}} >
                    {
                        gallery.map((dataObj,i)=>{
                            const {name, icon ,index} = dataObj
                            return <div className={'gua-gallery-item'+(index<64&&index>=0?"":" label")}
                                        onClick={handleItemClick(name)}
                                        key={i} >
                                        <h2>{name}</h2>
                                        <h2 style={{fontSize:"2em"}}>{icon}</h2>
                                    </div>
                        })
                    }
                    <button className='close-btn' onClick={handleToggle}>X</button>
                </div>
                <div className="gua-gallery-show"  style={{display:isShowing?"flex":"none"}}>
                    {getGuaContent()}
                    <button className='close-btn' onClick={handleToggleShow}>X</button>
                </div>
                {/* <button className='close-btn' onClick={this.handleToggle}>X</button> */}
            </div>
        </div>
    )
}
