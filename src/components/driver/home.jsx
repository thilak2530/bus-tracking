import React, { useState } from "react";
import AA from "./aa";
import { useBusTimings} from "../info";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate=useNavigate();
  const busTimings=useBusTimings();
  const aaa = localStorage.getItem("busno");
  const [clearTrigger, setClearTrigger] = useState(0); 

  async function handleCompleteTrip() {
    const busNo = parseInt(localStorage.getItem("busno"));

    await fetch( `${process.env.REACT_APP_BASE_URL}/driver/complete-trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ busNo })
    });

    alert("Trip data cleared from DB!");
    setClearTrigger(prev => prev + 1);
    localStorage.setItem(`checkedStops_${busNo}`, JSON.stringify([])); 
    navigate("/");
  }

  const stopKeys = Object.keys(busTimings.find(b => b.bus === parseInt(aaa)) || {}).filter(k => k !== "bus");

  return (
    <div className="driver-main">
      <div className="driver-main1">
        <p>BUS NO {aaa}</p>
        <div className="bus-places">
          {stopKeys.map((key) => (
            <AA key={key} stopKey={key} clearTrigger={clearTrigger} />
          ))}
        </div>
        <input id="submit" type="button" onClick={handleCompleteTrip} value="Trip Completed" />
      </div>
    </div>
  );
}

export default Home;