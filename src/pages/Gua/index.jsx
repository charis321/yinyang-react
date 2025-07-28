import React  from 'react'
import GuaArea from '../../Compoments/GuaArea'
import Header from '../../Compoments/Header'
import './index.css'

import { useScreenOrientation } from '../../plugin/hooks/useRWD'
export default function Gua() {
  //screen.orientation.lock("landscape")
  const screenOrientation = useScreenOrientation()

  const portraitDOM = <div>
                        <h1>請將您的手機轉為水平</h1>
                      </div>


  return (
    <div>
      <Header></Header>
      <main>
        {
          screenOrientation==="portrait-primary"?portraitDOM:<GuaArea></GuaArea>
        }
      </main>
    </div>
   
  )
}
