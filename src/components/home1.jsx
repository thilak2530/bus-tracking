import React from "react";


export function Home1(props){
    return(
        <div className="sideboxlist" id={props.names}>
            
            <a href=""><img  src={props.img}  /></a>
            <a href="https://www.google.co.in" ><p>{props.names}</p></a>
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

   