
import {Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import { authContent } from './plugin/auth';



import Home  from './pages/Home';
import About from './pages/About';
import Gua from './pages/Gua';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import { useState } from 'react';

function App() {
  // const [user, setUser] = useState("遊客")

  return (
    <div className="app">
      {/* <authContent.Provider value={{user, setUser}}> */}
        <Routes>
          <Route path='/' element={<Navigate to="home"/>}/>
          <Route path="home"  element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="gua" element={<Gua/>}/>
          <Route path="history" element={<History/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Routes>
      {/* </authContent.Provider> */}
      
    </div>
  );
}

export default App;
