import React from "react";
import { Link } from "react-router-dom";


function Main(){
    return(
        <div>
            <Link to={"/admin-login"}>admin-login</Link>
            <br />
            <Link to={"/driver-login"}>drivers-students</Link>
        </div>
    );

}

export default Main;