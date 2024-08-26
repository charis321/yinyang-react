
const setScrollMobile = (elmnt)=>{
  // console.log("set")
  if(elmnt) elmnt.ontouchstart = scrollStart

  function scrollStart(start_e){
    let startY = start_e.touches[0].clientY
    let i = 0
    elmnt.ontouchmove = move
    elmnt.ontouchend  = end
    
    function move(end_e){
      let endY = end_e.touches[0].clientY
      let dy = endY - startY
      elmnt.scrollTop-= dy
      startY = endY
      
    }
    function end(){
      i = 0
      elmnt.ontouchmove = null
      elmnt.ontouchend = null
    //   console.log("touch end")
    } 
  }
}
export default setScrollMobile