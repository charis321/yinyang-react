
import {Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import { authContent } from './plugin/auth';
import Home  from './pages/Home';
import About from './pages/About';
import Gua from './pages/Gua';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import IntroPage from './pages/Intro'
import NotFoundPage from './pages/Error/404Page'
import { useState } from 'react';
import {loadData} from './plugin/webAPI'

function App() {
  // const [user, setUser] = useState("遊客")
  const DATA = {}
  loadData('jiao_gua.json').then((data)=>{
    DATA['jiao_gua'] = data
  })
  loadData('zhouyi_gua_2.json').then((data)=>{
    DATA['zhouyi_gua'] = data
    console.log(DATA)
  })

  return (
    <div className="app">
      {/* <authContent.Provider value={{user, setUser}}> */}
        <Routes>
          <Route path='/' element={<Navigate to="home"/>}/>
          <Route path="home"  element={<Home/>}/>
          <Route path="about" element={<About data={DATA}/>}/>
          <Route path="gua" element={<Gua/>}/>
          <Route path="history" element={<History data={DATA}/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="intro" element={<IntroPage/>}/>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      {/* </authContent.Provider> */}
      
    </div>
  );
}

export default App;
