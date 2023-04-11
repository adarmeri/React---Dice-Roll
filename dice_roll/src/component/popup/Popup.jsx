import React from 'react'
import './Popup.css'



const winValue = (winVal)=>{if(winVal>100)return 100; if(winVal<1) return 1; return winVal;}


function Popup(props) {

  return (props.trigger)?(
    <div className='popup'>
      <div className="popup-inner">
      {props.children}
      <input min={1} max={100} type="number" id="maxPoints"></input><br/><br/>
      <button className="start-btn" onClick={()=>(
        props.SetWining(winValue(document.getElementById("maxPoints").value)) , props.setTrigger(false))}>start Game</button>
      </div>
    </div>
  ): "";
}

export default Popup
