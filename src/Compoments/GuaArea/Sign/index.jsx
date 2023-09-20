import React, { Component } from 'react'
import './index.css'

export default class Sign extends Component {
  render() {
    const style = {
      transform: `rotateZ(${Math.random()*8-4}deg) translateY(${Math.random()*8-4}px)`
    }
    return (
      <div className='sign' style={style}></div>
    )
  }
}
