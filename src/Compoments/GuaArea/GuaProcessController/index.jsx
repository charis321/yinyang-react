import React, { Component } from 'react'
import './index.css'
export default class GuaProcessController extends Component {
    
    componentDidMount(){
        const { handleArea} = this.props
        handleArea(this, "GuaProcessController")
    }
    handleNext=()=>{
        const {setStage} = this.props
        setStage(true)
    }
    handleSplit=(resolve)=>{
        resolve()
    }
    handlePick=(side)=>{
        const {setStage} = this.props
        return ()=>{
            setStage(true,{side})
        }
    }
    render() {
        const {game} = this.props
        const controllers= []
        
       
        return (
            <div className='controller-container'>
                    <button className='btn-left'  onClick={this.handlePick('left')}  key={2}>left</button>
                    <button className='btn-start' onClick={this.handleNext} key={1}>開始</button>
                    <button className='btn-right' onClick={this.handlePick('right')} key={3}>right</button>
                    {/* <button className='btn-split' onClick={this.handleSplit} key={2}>完成</button> */}
            </div>
            
        )
    }
        
}
