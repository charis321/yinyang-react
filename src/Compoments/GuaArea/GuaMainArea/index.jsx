import React, { Component } from 'react'
import './index.css'
import Sign from '../Sign'

export default class GuaMain extends Component {
  createSigns = (number)=>{
    const list = []
    for(let i=0;i<number;i++){
      list[i] = (<Sign></Sign>)
    }
    return list
  }
  render() {
    const {curr_stage} = this.props
    const content = []    
    
    return (
      <div className='gua-main-container'>
        {this.createSigns(50)}
      </div>
    )
  }
}
