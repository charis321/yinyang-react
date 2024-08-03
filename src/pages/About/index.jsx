import React, {  Component } from 'react'
import Header from '../../Compoments/Header'
import GuaDict from '../../Compoments/GuaArea/GuaDict'
import './index.css'

export default class About extends Component {
  render() {
    return (
      <div className='page-container'>
        <Header></Header>
        <main>
          <GuaDict></GuaDict>
        </main>
        <footer></footer>
      </div>
    )
  }
}
