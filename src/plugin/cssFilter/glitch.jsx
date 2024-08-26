export default function glitch(){
    return (<svg width="0" height="0">
        <filter id="glitch" x="0%" y="0%" width="100%" height="100%" 
                filterUnits="objectBoundingBox" 
                primitiveUnits="userSpaceOnUse" 
                colorInterpolationFilters="linearRGB">
            <feTurbulence   type="turbulence" 
                            baseFrequency="0 0.1" numOctaves="2" seed="2" stitchTiles="nostitch" 
                            x="0%" y="0%" width="100%" height="100%" 
                            result="turbulence"/>
            <feDisplacementMap  in="SourceGraphic" in2="turbulence" scale="2" 
                                xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" 
                                result="displacementMap"/>
        </filter>
        </svg>
    )
}

