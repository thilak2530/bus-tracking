import React, {  useState } from "react";

function AddStop(){

    const[bus_no,setbus_no]=useState();
    const[bus_alpha,setbus_alpha]=useState("");
    const[bus_stopp,setbus_stopp]=useState("");
    const[bus_arrive,setbus_arrive]=useState("");
    const[bus_depart,setbus_depart]=useState("");



    const handlechange = async(event)=>{
        setbus_no(event.target.value);
        
    }
     const handlechang = async(event)=>{
        setbus_alpha(event.target.value);
        
    }
     const handlechan = async(event)=>{
        setbus_stopp(event.target.value);
        
    }
     const handlecha = async(event)=>{
        setbus_arrive(event.target.value);
        
    }
     const handlech = async(event)=>{
        setbus_depart(event.target.value);
        
    }


    function handleclick(){
        fetch("http://localhost:3001/add-bus-stops", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                busNo: bus_no,
                alpha: bus_alpha,              
                stopp: bus_stopp,    
                arrived: bus_arrive,
                depart: bus_depart
            })
            })
            .then(res => res.json())
            .then(data => {
            if (data.success) {
                alert("Stop added successfully!");
            } else {
                alert("Failed to add stop.");
            }
            })
            .catch(err => {
            console.error("Request error:", err);
        });
    }

    return(
        <div>
            <input type="number" onChange={handlechange}/>
            <input type="text" onChange={handlechang}/>
            <input type="text" onChange={handlechan}/>
            <input type="text" onChange={handlecha}/>
            <input type="text" onChange={handlech}/>
            <input type="submit" onClick={handleclick}/> 
        </div>
    );

}
export default AddStop;