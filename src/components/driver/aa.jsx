import React, { useEffect, useState } from "react";
import { useBusTimings} from "../info";



function AA({ stopKey, clearTrigger }) {
  const busTimings=useBusTimings();
  const busNo = parseInt(localStorage.getItem("usernames"));
  const busIndex = busTimings.findIndex((b) => b.bus === busNo);
  if (busIndex === -1) return null;

  const stop = busTimings[busIndex][stopKey];
  if (!stop) return null;
  const stopName = stop[0];
  const storageKey = `checkedStops_${busNo}`;

  const [isChecked, setIsChecked] = useState(false); 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setIsChecked(saved.includes(stopName));
  }, [stopName, storageKey, clearTrigger]);


  async function handleClick() {
    const time = new Date().toLocaleTimeString();
    setIsChecked(true);

    try {
      await fetch("http://localhost:3001/driver/send-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          busNo,
          stop: stopName,
          time,
        }),
      });

      const prev = JSON.parse(localStorage.getItem(storageKey)) || [];
      const updated = [...new Set([...prev, stopName])];
      localStorage.setItem(storageKey, JSON.stringify(updated));

      setIsChecked(true);
      console.log(`Sent stop update: ${stopName}`);
    } catch (error) {
      console.error("Failed to send update", error);
    }
  }

  return (
    <div>
      <p>{stop[0]}</p>
      <div
        onClick={handleClick}
        style={{
          width: "10px",
          height: "20px",
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: isChecked ? "#fff" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          marginTop: "10px",
          cursor: "pointer",    
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {isChecked && <span style={{ color: "black", fontSize: "14px", paddingLeft: "10px" }}>✔</span>}
      </div>
    </div>
  );
}

export default AA;