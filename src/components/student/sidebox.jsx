import React from "react";
import { Home1 } from "./home1";
import { info } from "../info";



        function home(){
            const home=document.getElementsByClassName("rightside")[0];
            if(home){
                home.style.display="block";
                const settings=document.getElementsByClassName("settings")[0];
                settings.style.display="none";
                const sidebox = document.getElementsByClassName("sidebox")[0];
                const bus_timings = document.getElementsByClassName("bus-timings")[0];
                bus_timings.style.display = "none";
                if (window.innerWidth <= 440) {
                    if (sidebox) sidebox.style.display = "none";
                } else {
                    if (sidebox) sidebox.style.display = "flex";
                }
            }
        }
        function setting(){
            const settings=document.getElementsByClassName("settings")[0];
            
            if(settings){
                settings.style.display="flex";
                const rightside = document.getElementsByClassName("rightside")[0];
                rightside.style.display = "none";
                const sidebox = document.getElementsByClassName("sidebox")[0];
                
                
                if (sidebox) sidebox.style.display = "none"; 
                
                if (window.innerWidth >= 440) {
                    if (sidebox) sidebox.style.display = "flex";  
                }
            }
 
        }

function Sidebox(){
    const username = localStorage.getItem("username");
    return(
        <div className="sidebox">
                      
                        <div className="userinfo">
                            <img src={`${process.env.PUBLIC_URL}/homeimg/busimg.png`} alt="" />
                            <h2>{username}</h2>
                        </div>
                        <Home1 
                            names={info[0].listname}
                            img={info[0].img}
                            button={home}
                            link={"/student-home"}
                            
                        />
                        <Home1 
                            names={info[1].listname}
                            img={info[1].img}
                            
                        />
                        <Home1 
                            names={info[2].listname}
                            img={info[2].img}
                            
                        />
                        <Home1 
                            names={info[3].listname}
                            img={info[3].img}
                            button={setting}
                            link={"/setting"}
                            
                        />
                        <Home1 
                            names={info[5].listname}
                            img={info[5].img}                         
                            link={"/"}
                            
                        /> 
        </div>
    );
}

export default Sidebox;