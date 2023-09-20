import React, { Component, createRef } from 'react'
import './index.css'
import {dragElement} from '../../../plugin/dragDom'

export default class GuaResultBoardcast extends Component {

  componentDidMount(){
    dragElement(this.myRef.current)
  }

  render() {
    const gua_dict = {
      6: "variety yin",
      7: "normal yang",
      8: "normal yin",
      9: "variety yang"
    }
    this.myRef = createRef()
    const {guas_list} = this.props 

    return (
      <div id="result-boardcast" className='container' ref={this.myRef} draggable>
        {
          guas_list.map((guaIndex, index)=>{
            return <div className={gua_dict[guaIndex]} key={index}></div>
          })
        }
      </div>
    )
  }
}
