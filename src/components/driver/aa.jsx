import React from "react";
import { busTimings } from "../info";



const bbb = busTimings;

function AA(props) {


  const aaa=parseInt( localStorage.getItem("username"));
  if (!bbb || bbb.length === 0) return null;


  const stop = bbb[aaa][props.stopKey]; 
  
  function handleClick(){
        localStorage.setItem(stop[0],stop[0]);
    
  }
  
  return (
    
    <div>
      <p>{stop[0]}</p>
      <input type="radio"  onChange={handleClick} style={{transform: "scale(1.3)", marginRight: "8px",
  }}/>
    </div>
  );

}

export default AA;