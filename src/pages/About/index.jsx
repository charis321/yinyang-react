import {useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../Compoments/Header'
import {GuaDictAlpha, GuaDictBeta} from '../../Compoments/GuaArea/GuaDictBeta'
import './index.css'
import GuaDict from '../../Compoments/GuaArea/GuaDict'
import { Link } from 'react-router-dom'

export default function About(props){
  // useEffect(()=>{
  //   console.log("useEffect")
  // },[])
  return (
    <div className='about-container'>
      <Header></Header>
      <main>
        {/* <GuaDict data={props.data}></GuaDict> */}
        {/* <GuaDictBeta data={props.data}></GuaDictBeta> */}
        {/* <GuaDictAlpha data={DATA}></GuaDictAlpha> */}
      
        <article className='about-topic'>
          <Link to="gallery">
            <div className='about-topic-content'>
              <h2>何為六十四卦</h2> 
            </div>
          </Link>
        </article>
       
        <article className='about-topic'>
          <Link to="gallery">
            <div className='about-topic-content'>
              <h2>古人如何解卦</h2>
            </div>
          </Link>
        </article>

        <article className='about-topic'>
          <Link to="gallery">
            <div className='about-topic-content'>
               <h2>卜卦的方法</h2>
            </div>
          </Link>
        </article>
      </main>
      <footer></footer>
    </div>
  )
}
