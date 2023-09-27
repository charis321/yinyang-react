import React, { Component } from 'react'
import './index.css'
/*
    爻(yao) :
        6 -- 陰爻之變爻     (alter yin yao) 
        7 __ 陽爻           (yang yao)
        8 -- 陰爻           (yin yao) 
        9 __ 陽爻之變爻     (alter yang yao)
    props:
        {
            n:       int            [6,7,8,9]     
            name:    string         ['陰爻之變爻', '陽爻', '陰爻', '陽爻之變爻'] 
            type:    boolean        ['陽爻' ,'陰爻']
            isAlter: boolean        ['alter','' (no alter)]
            size:    string         
            place:   string         ['main', 'top', 'left', 'right', 'banish']
        }
        
*/
export default class Yao extends Component {
    state = {
        yaoObj: this.props.yaoObj
    }
    render() {
        const {type, isAlter, size} = this.state.yaoObj
        const classes = `yao ${type?"yang":"yin"} ${isAlter?"alter":"normal"}`
        return (
        <div className={classes}></div>
    )
  }
}
