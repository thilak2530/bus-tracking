import React from "react";
import Login from "./login";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Setting from "./setting";
import Bus_timing from "./bus-timig";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/home/bus-timings" element={<Bus_timing />} />
            </Routes>
        </Router>
    );
}

export default App;