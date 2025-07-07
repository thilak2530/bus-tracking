import React from "react";
import { Link } from "react-router-dom";
import Home from "./home";
import { useNavigate } from "react-router-dom";




export function Home1(props){
    const navigate=useNavigate();
    return(
        
        <div className="sideboxmain">
            <div className="sideboxlist" id={props.names}>          
                <Link to={props.link} ><img  src={props.img}  /></Link>
                <Link to={props.link} onClick={props.button} ><p>{props.names}</p></Link>
                            
            </div>
        </div>
    );
}

export function Otherbus(props){
    return(
        <div className="otherbus" onClick={props.onClick}>
            <img src={props.img} alt="" />
            <h4>NO {props.no}</h4>
        </div>
    );
}

export function Ourbus(props){
            function bus_time(){
                const rightside = document.getElementsByClassName("rightside")[0];
                rightside.style.display = "none";
                const bus_timings = document.getElementsByClassName("bus-timings")[0];
                bus_timings.style.display = "block";
                
            }
    
    return(
        <div className="ourbus">
        <img className="busimg" src={props.img} alt="" />
        <div className="businfo">
            <h4>NO {props.noo}</h4>
            <p>Arriving in{}</p>
            <div className="buttons">
                <Link to="/student-home/bus-timings" state={{ abba: props.noo }} ><button onClick={bus_time}>Bus Timing</button></Link>
                <Link to="/messages"><button >Messages</button></Link>
                <Link to="/tracking-bus"><button >Track Your Bus</button></Link>
            </div>
        </div>                  
    </div>  
    );

}

   