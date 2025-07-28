
const setScrollMobile = (elmnt)=>{
  
  if(elmnt) elmnt.addEventListener('touchstart', scrollStart)
    
  function scrollStart(start_e){
    let startX = start_e.touches[0].clientX
    let startY = start_e.touches[0].clientY
    
    elmnt.addEventListener('touchmove', move, { passive: false })
    elmnt.addEventListener('touchend', end)
    // elmnt.ontouchmove = move
    // elmnt.ontouchend  = end

    function move(end_e){
      
      let endX = end_e.touches[0].clientX
      let endY = end_e.touches[0].clientY
      let dx = endX - startX
      let dy = endY - startY
     
      // console.log("scrollLeft1", elmnt.scrollLeft, dx) 
      elmnt.scrollTop -= dy
      elmnt.scrollLeft-= dx
      // console.log("scrollLeft2", elmnt.scrollLeft, dx)

      startX = endX
      startY = endY 
    }
    function end(){

      elmnt.removeEventListener('touchmove', move, { passive: false })
      elmnt.removeEventListener('touchend', end)
      
      // elmnt.ontouchmove = null
      // elmnt.ontouchend = null
    } 
  }
}
export default setScrollMobile