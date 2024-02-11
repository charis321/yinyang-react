import React, {  Component } from 'react'
import Header from '../../Compoments/Header'
import GuaDict from '../../Compoments/GuaArea/GuaDict'
import './index.css'

export default class About extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <main>
          <article className='zhouyi-gua'>
          
          </article>
          <GuaDict></GuaDict>
        </main>
        <footer></footer>
      </div>
    )
  }
}
