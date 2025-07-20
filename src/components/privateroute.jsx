import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRole }) => {
  
  const role = localStorage.getItem("selectedRole");
  const rollno = localStorage.getItem("rollno");
  const [rollnoindb, setrollnoindb] = useState(false);
  const [loading, setLoading] = useState(true);
  const bus_user = localStorage.getItem("busno");
  const isAuthenticated = (role === "student" && rollno) || (role === "driver" && bus_user);

 


  const fetchRollnoData = async (rollno) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/private/${rollno}`);
      const data = await response.json();
      if (data.success && data.roll.rows.length > 0) {
        setrollnoindb(true);
      } else {
        setrollnoindb(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setrollnoindb(false);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    setLoading(true)
    if (role === "student" && rollno) {
      fetchRollnoData(rollno);
    } else if (role === "driver" && bus_user) {
      fetchRollnoData(bus_user);
    } else {    
      setLoading(false);
    }
  }, [role, rollno, bus_user]);

  if (loading) return null;


  if (role !== allowedRole) {
  return <Navigate to="/kitsw-bus-tracking" />;
}
 
if (!isAuthenticated ) {
  return <Navigate to="/kitsw-bus-tracking" />;
}


if (role === "student") {
  if (!rollno || !rollnoindb) {
    return <Navigate to="/kitsw-bus-tracking" />;
  }
}

if (role === "driver") {
  if (!bus_user || !rollnoindb) {
    return <Navigate to="/kitsw-bus-tracking" />;
  }
}


  return children;
};

//driver local role set 