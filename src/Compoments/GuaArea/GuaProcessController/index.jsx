import React, { Component } from 'react'
import './index.css'
export default class GuaProcessController extends Component {
    
    handleStart = ()=>{
        this.props.stageController.startStage()
    }
    render() {
        const {game} = this.props
        const controllers= []
        if(game.curr_stage==='startStage'){
            controllers.push(<button className='btn-start' onClick={this.handleStart}>開始</button>)
        }
        return (
            <div className='controller-container'>{
                    controllers.map((controller)=>{
                        return controller
                    }
                )}
            </div>
            
        )
    }
        
}
