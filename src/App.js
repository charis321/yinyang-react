
import {Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

// import useRWD  from './useRWD';
import Home  from './pages/Home';
import About from './pages/About';
import Gua from './pages/Gua'
import Login from './pages/Login';
import GuaArea from './Compoments/GuaArea';

function App() {
  // const device = useRWD();
  return (
    <div className="app">
      <GuaArea></GuaArea>
      {/* <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/home"  element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/gua" element={<Gua/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes> */}
    </div>
  );
}

export default App;
