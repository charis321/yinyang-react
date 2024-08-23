import {useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../Compoments/Header'
import {GuaDictAlpha, GuaDictBeta} from '../../Compoments/GuaArea/GuaDictBeta'
import './index.css'
import GuaDict from '../../Compoments/GuaArea/GuaDict'

// let DATA = {}
// const loadData = (dataName, dataPath)=>{

  
//   if(DATA[dataName]) return

//   axios.get(`./${dataPath}`).then(res=>{
//     DATA[dataName] = res.data
//   }).catch(err=>{
//     console.log(err);
//   });
// }

// loadData('jiao_gua','jiao_gua.json')
// loadData("zhouyi_gua",'zhouyi_gua_2.json')



export default function About(props){
  // useEffect(()=>{
  //   console.log("useEffect")
  // },[])
  return (
    <div className='about-container'>
      <Header></Header>
      <main>
        <GuaDict data={props.data}></GuaDict>
        {/* <GuaDictBeta data={props.data}></GuaDictBeta> */}
        {/* <GuaDictAlpha data={DATA}></GuaDictAlpha> */}
      </main>
      <footer></footer>
    </div>
  )
}
