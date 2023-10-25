
import {Navigate, Route, Routes } from 'react-router-dom';
import './App.css';


import Home  from './pages/Home';
import About from './pages/About';
import Gua from './pages/Gua';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Navigate to="home"/>}/>
        <Route path="home"  element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="gua" element={<Gua/>}/>
        <Route path="history" element={<History/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
