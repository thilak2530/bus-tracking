import axios from "axios";
import React, { useState } from "react";


function Admin() {
 
  const [rollno,setrollno]=useState("")


  const roll = async(event)=>{
    setrollno(event.target.value);
  }
   

  const submit=async()=>{
      try{
          const response = await axios.post("http://localhost:3001/change-pass",{
            rollno:rollno}
          )
          if(response.data.success){
            alert("succesfully changed password to 12345");
            setrollno("");
            setpress(false);
          }
      }
      catch(error)
      {
        alert("failed to change");
      }
  }


  return(
    <div className="admin-home">
      <div className="admin-home1">
        <h2 id="h2-pass">password change</h2>
        <input id="rollno-input"  type="text" onChange={roll} value={rollno} placeholder="Enter Roll-No" />
        <button  onClick={submit} >change</button>
      </div>
    </div>
  );s
}

export default Admin;