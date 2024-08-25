const handleScrollMobile = (elmnt)=>{
    return (start_e)=>{
        // console.log("touch start",elmnt)
        let startY = start_e.touches[0].clientY
        let i = 0
        elmnt.ontouchmove = move
        elmnt.ontouchend  = end

        function move(end_e){
          let endY = end_e.touches[0].clientY
          let dy = endY - startY
          elmnt.scrollTop-= dy
          startY = endY
          
        //   i++
        //   console.log("touch move", i ,dy)
        }
        function end(){
          i = 0
          elmnt.ontouchmove = null
          elmnt.ontouchend = null
        //   console.log("touch end")
        }
    }
   
}
export default handleScrollMobile