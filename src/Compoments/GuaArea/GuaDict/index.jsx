import React, { Component } from 'react'
import {gua_data_set, half_gua_set} from '../data'
import './index.css'
export default class GuaDict extends Component {
    state = {
        isClosed : true
    }
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
    componentWillMount(){
        this.createGuaGallery()
    }
    createGuaGallery=()=>{
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
        this.new_dataset = new_dataset
   }
   
    

    handleToggle = ()=>{
        const {isClosed} = this.state
        this.setState({isClosed:!isClosed})
    }

    render() {
        
        return (
            <div className='gua-dict-container'>
                <div className='gua-dict-btn' onClick={this.handleToggle} ></div>
                <div className='gua-dict-block' hidden={this.state.isClosed}>
                    <div className="gua-gallery" >
                        {
                            this.new_dataset.map((dataObj,i)=>{
                                const {name, icon ,index} = dataObj
                                return <div className={'gua-gallery-item'+(index<64&&index>=0?"":" label")}
                                            key={i} >
                                            <h2>{name}</h2>
                                            <h2 style={{fontSize:"2em"}}>{icon}</h2>
                                        </div>
                            })
                        }
                    </div>
                    <div className="gua-gallery-show"></div>
                </div>
            </div>
    )
  }
}
