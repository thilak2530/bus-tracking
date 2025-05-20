import React from "react";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";



function App(){
    return(
        <Router basename="/bus-tracking">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} /> 
            </Routes>
        </Router>
    );  
}

export default App;