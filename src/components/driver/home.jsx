import React from "react";

import AA from "./aa";


function Home(){
    const aaa=localStorage.getItem("username");

    
    return(
        <div className="driver-main">   
            <div className="driver-main1">
                

                <p>BUS NO {aaa}</p>
                <div className="bus-places">
                    <AA stopKey="a" />
                    <AA stopKey="b" />
                    <AA stopKey="c" />     
                    <AA stopKey="d" /> 
                    <AA stopKey="e" />            
                    <AA stopKey="f" /> 
                    <AA stopKey="g" /> 
                    <AA stopKey="h" /> 
                    <AA stopKey="i" /> 
                    <AA stopKey="j" /> 
                    <AA stopKey="k" /> 
                    <AA stopKey="j" /> 
                    <AA stopKey="k" /> 
                    <AA stopKey="j" /> 
                    <AA stopKey="k" />   <AA stopKey="j" /> 
                
                
                </div>
                <input id="submit" type="button" value="Trip Completed" />

            </div>  
        </div>   
    );
}

export default Home;