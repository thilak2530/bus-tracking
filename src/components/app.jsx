import React from "react";
import Login_Student from "./login/student_login";
import Login_Driver from "./login/driver_login";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import StudentHome from "./student/home";
import DriverHome from "./driver/home";
import Setting from "./student/setting";
import Bus_timing from "./student/bus-timig";
import {PrivateRoute,PrivateRoute1} from "./privateroute";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Messages from "./student/message";
import Tracking from "./student/tracking";
import Admin from "./admin.jsx/admin-home";
import Admin_login from "./login/admin_login";
import Admin_home_main from "./admin.jsx/admin-home-main";
import Bus_changes from "./admin.jsx/bus-changes";
import Main from "./main/main";
import axios from "axios";


function Clearusername(){
    const location = useLocation();

    useEffect(() => {
        const role=localStorage.getItem("selectedRole");
        if(!role){
            localStorage.setItem("selectedRole", "driver"); 
        }
                
        const a=localStorage.getItem("selectedRole")
        localStorage.setItem("selectedRole", a); 

        if(location.pathname==="/driver-login"){localStorage.setItem("selectedRole","driver")}
        if(location.pathname==="/student-login"){localStorage.setItem("selectedRole","student")}

        if (location.pathname === "/" ||location.pathname === "/kitsw-bus-tracking" || location.pathname === "/driver-login" || location.pathname === "/student-login") {
            
            localStorage.removeItem("username");
            localStorage.removeItem("usernames");
            const bus_no=localStorage.getItem("busno");
            const roll=localStorage.getItem("rollno");

            if(roll){
                const senddeleterequest=async()=>{
                    try{
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/private-remove`,{
                        rollno:roll
                        })
                        console.log("sent rollno to delete");
                        
                    }
                    catch(error){
                    console.error("roll no not sent to delete",error);
                }}
                senddeleterequest();
            localStorage.removeItem("rollno");
            }

            if(bus_no){
                const senddeleterequest=async()=>{
                    try{
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/private-remove`,{
                        rollno:bus_no
                        })
                        console.log("sent rollno to delete");
                        
                    }
                    catch(error){
                    console.error("roll no not sent to delete",error);
                }}
                senddeleterequest();
                localStorage.removeItem("busno");
            }
        
        }
    }, [location]);
    return null;
}

function App(){
    
  

    return(
        <Router >
            <Clearusername />
            <Routes>
                <Route path="/" element={<Navigate to={"/kitsw-bus-tracking"}/>} />
                <Route path="/kitsw-bus-tracking" element={<Main />} />
                <Route path="/driver-login" element={<Login_Driver />} />
                <Route path="/student-login" element={<Login_Student />} />
                <Route path="/admin-login" element={<Admin_login />} />
                <Route path="/password-change" element={<Admin/>} />
                <Route path="/bus-changes" element={<Bus_changes/>} />
                <Route path="/admin-home-main" element={<Admin_home_main/>} />
                <Route path="/driver-home" element={<PrivateRoute allowedRole="driver"><DriverHome /></PrivateRoute>}/> 
                <Route path="/student-home" element={<PrivateRoute allowedRole="student"><StudentHome /></PrivateRoute>}/> 
                <Route path="/setting" element={<PrivateRoute allowedRole="student"><Setting /></PrivateRoute>} />
                <Route path="/messages" element={<PrivateRoute allowedRole="student"><Messages /></PrivateRoute>} />
                <Route path="/tracking-bus" element={<PrivateRoute allowedRole="student"><Tracking /></PrivateRoute>} />
                <Route path="/student-home/bus-timings" element={<PrivateRoute allowedRole="student"><Bus_timing /></PrivateRoute>} />
            </Routes>
        </Router>
    );  
}

export default App;