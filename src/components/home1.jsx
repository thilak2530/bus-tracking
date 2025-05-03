import React from "react";
import { Link } from "react-router-dom";


export function Home1(props){
    return(
        <div className="sideboxmain">
            <div className="sideboxlist" id={props.names}>          
                <Link to={props.link} ><img  src={props.img}  /></Link>
                <Link to={props.link} onClick={props.button}><p>{props.names}</p></Link>
            </div>
        </div>
    );
}

export function Otherbus(props){
    return(
        <div className="otherbus">
            <img src={props.img} alt="" />
            <h4>NO {props.no}</h4>
        </div>
    );
}

   