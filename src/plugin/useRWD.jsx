import { useEffect, useState } from "react";

export const useDevice = ()=>{
    const [device, setDevice] = useState("mobile")
    const handleRWD = ()=>{
      const maxLength = Math.max(window.innerWidth,window.innerHeight)
      const minLength = Math.min(window.innerWidth,window.innerHeight)
      if(maxLength > 1024){
        setDevice("PC");
      }else if (maxLength > 576 && minLength > 576){
        setDevice("tablet");
      }else{
        setDevice("mobile");
      }
    }
    
    useEffect(()=>{ 
        window.addEventListener('resize',handleRWD);
        handleRWD()
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);
    // console.log(device)
    return device;
}

const getOrientation = () => window.screen.orientation.type

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation())

  const updateOrientation = (e) => {
    console.log(orientation)
    setOrientation(getOrientation())
  }

  useEffect(() => {
    window.addEventListener(
        'orientationchange',
        updateOrientation
    )
    return () => {
        window.removeEventListener(
        'orientationchange',
        updateOrientation
      )
    }
  }, [orientation])
  
  return orientation
}
