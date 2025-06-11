import React from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./home";
import Setting from "./setting";
import Bus_timing from "./bus-timig";
import PrivateRoute from "./privateroute";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Clearusername(){
    const location = useLocation();

    useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      localStorage.removeItem("username");
    }
    }, [location]);
    return null;
}

function App(){
    


    return(
        <Router >
            <Clearusername />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/> 
                <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
                <Route path="/home/bus-timings" element={<PrivateRoute><Bus_timing /></PrivateRoute>} />
            </Routes>
        </Router>
    );  
}

export default App;