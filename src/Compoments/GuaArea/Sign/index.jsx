import React, { Component} from 'react'
import './index.css'
// import { dragElement,dragElementMoblie } from '../../../plugin/dragDom'
//import useRWD from '../../../useRWD';
export default class Sign extends Component {
  state = {
    sign: this.props.signObj,
  
    pos1 : 0 ,
    pos2 : 0 ,
    pos3 : 0 ,
    pos4 : 0 ,
    pos5 : 0 ,
    pos6 : 0 
  }
  componentDidMount(){
    this.dragStart = this.dragStart.bind(this);
    // this.dragging = this.dragging.bind(this);
    // this.dragEnd = this.dragEnd.bind(this);
  }
  
 
  // myRef = createRef()
  // componentDidMount(){
  //   //const {device} = useRWD();
  //   if(window.innerWidth<=768){
  //     dragElementMoblie(this.myRef.current)
  //   }else{
  //     dragElement(this.myRef.current)
  //   }
    
  // }
  handleClick=(e)=>{  
    e.target.releasePointerCapture(e.pointerId) 
    if(this.props.isSpliting&&this.state.sign.place==="main"){
      this.props.setSpliter(this.state.sign.localIndex)
    }
    if(this.props.isDragging) this.dragStart(e)
    
  }
  
  dragStart =(e)=>{
    this.setState({
      pos3 : e.clientX,
      pos4 : e.clientY,
      pos5 : this.state.sign.left,
      pos6 : this.state.sign.top,
    })
    
    document.onpointerup  = this.closeDragElement
    document.onpointermove = this.elementDrag(e.target)  
  }
  
  closeDragElement=()=>{
    const {touchIndex} = this.props
    let {sign} = this.state
    let nowTouching = touchIndex.now
    if(nowTouching!=='none'&&(touchIndex[nowTouching].touchable)){
      this.props.getDragged(this.state.sign, touchIndex.now, sign.place)
    }else{
      
      sign.left= this.state.pos5
      sign.top = this.state.pos6
      this.setState({sign})
    }

    
    document.onpointerup = null;
    document.onpointermove = null;
  }
  elementDrag=(target)=>{
    return (e)=>{
      let {pos1,pos2,pos3,pos4,sign} = this.state
      
      e.preventDefault();
      
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      sign.left = target.offsetLeft - pos1
      sign.top =  target.offsetTop - pos2
      this.setState({
        sign,
        pos1,
        pos2,
        pos3,
        pos4
      })
    }
  }
  

  render() { 
    const {sign} = this.state
    const {signWidth, signHeight, isDragging, isDividing}=this.props
    const style = {
      transform: `${sign.place==='tian'?"rotateZ(90deg)":sign.bias}`, 
      left: sign.left,
      top: sign.top,
      width:  `${signWidth}px`,
      height: `${signHeight}px`,
      transition: isDragging?"":(isDividing?"0.4s all ease-in":"0.1s all ease-in")
    }
    console.log("sign")
    return (
      <div  className={`sign ${sign.place} ${sign.index===-1?"spliter":""}`} 
            style={style} 
            // onMouseDown ={this.handleClick("pc")}
            // onTouchStart={this.handleClick("mobile")}
            onPointerDown={this.handleClick}
            ></div>
    )
  }
}
