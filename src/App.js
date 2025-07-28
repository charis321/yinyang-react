import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import { authContent } from './plugin/auth';
import Home  from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery'
import Gua from './pages/Gua';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import IntroPage from './pages/Intro'
import NotFoundPage from './pages/Error/404Page'

import { loadData } from './plugin/webAPI'
import './App.css';

function App() {
  // const [user, setUser] = useState("遊客")
  const [guaData, setGuaData] = useState({})

  useEffect(()=>{
    preload()
  },[])

  const preload = async()=>{
    let data = {}
    data['jiao_gua'] = await loadData('jiao_gua.json').then((data)=>{return data})
    data['zhouyi_gua'] = await loadData('zhouyi_gua_2.json').then((data)=>{return data})
    setGuaData(data)
  }


  return (
    <div className="app">
      {/* <authContent.Provider value={{user, setUser}}> */}
        <Routes>
          <Route path='/' element={<Navigate to="home"/>}/>
          <Route path="home"  element={<Home/>}/>

          <Route path="about" element={<About data={guaData}/>}/>
          <Route path="about/gallery" element={<Gallery data={guaData}/>}/>
        
          <Route path="gua" element={<Gua/>}/>
          <Route path="history" element={<History data={guaData}/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="intro" element={<IntroPage/>}/>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      {/* </authContent.Provider> */}
      
    </div>
  );
}

export default App;
