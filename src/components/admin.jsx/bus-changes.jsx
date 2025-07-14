import React, { useEffect, useState } from "react";
import AddStop from "./addstop";
import { otherbusinfo } from "../info";

function BusStops() {
  const busnoo=(otherbusinfo.length);
  const [stops, setStops] = useState([]);
  const [stop, set] = useState(false);
  const [addstop, setaddstop] = useState(false);
  const [addstopview, setaddstopview] = useState(false);
  const [selectedbusno,setselectedbusno]=useState();

    

  useEffect(() => {
        if (selectedbusno) {
            fetch(`http://localhost:3001/bus-stops?busNo=${selectedbusno}`)
            .then((res) => res.json())
            .then((data) => {if(data.length===0){set(true)}else{set(false); } setStops(data)})
            
            .catch((err) => console.error("Error loading stops:", err));
        }
    }, [selectedbusno]);

  return (
    <div>
      {Array.from({length:busnoo},(_,i)=>(
        <button key={i+1} onClick={() => {setaddstop(true);setselectedbusno(i+1);setaddstopview(false)}}>Show Bus-{i+1} Stops</button>
      ))}
      {/* <button onClick={() => {setaddstop(true);setselectedbusno(1);setaddstopview(false)}}>Show Bus-1 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(2);setaddstopview(false)}}>Show Bus-2 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(3);setaddstopview(false)}}>Show Bus-3 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(4);setaddstopview(false)}}>Show Bus-4 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(5);setaddstopview(false)}}>Show Bus-5 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(6);setaddstopview(false)}}>Show Bus-6 Stops</button>
      <button onClick={() => {setaddstop(true);setselectedbusno(7);setaddstopview(false)}}>Show Bus-7 Stops</button>
       */}
       {stop&&<p style={{color:"red",marginTop:"10px"}}>no stops not found</p>}
      

      {stops.length >0 && (
        <div>
          
          <ul>
            {stops.map((stop, index) => (
              <li key={index}>
                {stop.stop_key} - {stop.stop_name} (Arrive: {stop.arrival_time}, Depart: {stop.departure_time})
              </li>
            ))}
          </ul>   
        </div>
      )}
      {addstop&&<button onClick={()=>{setaddstopview(true)}}>add stop+</button>}
      {addstopview && (
        <div>
          <AddStop />
        </div>
      )}
    </div>
  );
}

export default BusStops;