import React from "react";
import { Link } from "react-router-dom";
import "./main.css";


function Main(){
    return(
        <div >
            <nav>
                <div>
                    <img src="" alt="" />
                </div>
                <div id="buttons">
                    <div>
                        <Link className="link" to={"/admin-login"}>contact</Link>
                        <Link className="link" to={"/admin-login"}>about</Link>
                        <Link className="link" to={"/admin-login"}>features</Link>
                        <button className="buttn"><Link className="link" to={"/admin-login"}>admin-login</Link></button>
                    </div>
                   
                </div>
            </nav>
            
            <div className="main">
                <Link to={"/driver-login"}>driver-login</Link>
                <br />
                <Link to={"/student-login"}>student-login</Link>
            </div>
            
           
        </div>
    );

}

export default Main;