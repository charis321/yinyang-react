import React, { Component } from 'react'
import './index.css'
export default class GuaProcessController extends Component {
    state = {
        controllersIndex: [
            {index: 0, name: "start-btn", content: '開始'},
            {index: 1, name: "next-btn" ,  content: '下一步'},
            {index: 2, name: "result-btn", content: '完成，查看結果'}
        ]
    }
    componentDidMount(){
        const { handleArea} = this.props
        handleArea(this, "GuaProcessController")
    }
    handleNext=()=>{
        const {setStage} = this.props
        setStage(true)
    }
   

    render() {
    
        const {controllersIndex} = this.state
        const {controllers} = this.props
        
       
        return (
            <div className='controller-container'>
                {
                 controllersIndex.map(crtlObj=>{
                    if(controllers[crtlObj.name]){
                        const html = 
                            <button className={crtlObj.name} key={crtlObj.index} onClick={this.handleNext}>
                                {crtlObj.content}
                            </button>
                        
                         return html
                    }
                 })   
                }
            </div>
            
        )
    }
        
}
