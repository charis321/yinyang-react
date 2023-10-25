import { useEffect, useState } from "react";

export const useDevice = ()=>{
    const [device, setDevice] = useState("mobile")
    const handleRWD=()=>{
        if(window.innerWidth > 768)
            setDevice("PC");
        else if (window.innerWidth > 576)
            setDevice("tablet");
        else 
            setDevice("mobile");
    }
    useEffect(()=>{ 
        window.addEventListener('resize',handleRWD);
        handleRWD()
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);

    return device;
}

const getOrientation = () => window.screen.orientation.type

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation())

  const updateOrientation = (e) => {
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
  }, [])
  return orientation
}