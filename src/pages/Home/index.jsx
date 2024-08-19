

import NavBar from '../../Compoments/Header/NavBar'
import { useDevice } from '../../plugin/useRWD'
import "./index.css" 
export default function Home(){
    const device = useDevice()
    console.log(device)    
    return (
        <div className='home-container'>
            <main>
                <div className='logo'></div>
                <NavBar></NavBar>
            </main>
            <footer>
                <p>ver.0.0.1</p> 
            </footer>
        </div>
    )
  
}
