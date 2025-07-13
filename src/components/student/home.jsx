import React, { useEffect, useState } from "react";
import { Home1, Otherbus ,Ourbus} from "./home1";
import { info, otherbusinfo } from "../info";
import { useLocation, useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Setting from "./setting";
import Bus_timing from "./bus-timig";
import Sidebox from "./sidebox";






function Homes(){

        const username = localStorage.getItem("username");
        const navigate = useNavigate();
        function goToLogin(){
            localStorage.removeItem("username")
            navigate("/"); 
        };



        function open() {
            const rightside = document.getElementsByClassName("rightside")[0];
            if (rightside) {
                rightside.style.display = "none";
                const sidebox = document.getElementsByClassName("sidebox")[0];
                if (window.innerWidth <= 440) {
                    if (sidebox) sidebox.style.display = "flex";
                }
                if (window.innerWidth >= 440) {
                    if (rightside) rightside.style.display = "flex";
                }
            }     
        }


        const [selectedNo, setSelectedNo] = useState("1");
        const [selectedImg, setSelectedImg] = useState(`${process.env.PUBLIC_URL}/homeimg/bus5.png`);
        useEffect(()=>{
            const aaa=localStorage.getItem("usernames");
            if(aaa){
                setSelectedNo(aaa);
            }
        })
        
        
     
        function handleBusClick(no,img){
            setSelectedNo(no);setSelectedImg(img); 
            localStorage.setItem("usernames",no)  
           
            
        }
        
        
       
        
    
    return <div className="homepage">
        
        <div className="insidebox">
            <Sidebox />
            <div className="rightside">
                <div className="tink" onClick={open}>
                    <img src={`${process.env.PUBLIC_URL}/homeimg/menu_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} /> 
                </div>  
                <div className="mainbox">      
                    <div className="aaa">
                            <h1>Hey {username},<br />here is your bus</h1>
                            <h2>My bus</h2>
                            <Ourbus 
                               noo={selectedNo}
                               img={selectedImg}
                            />   
                    </div>                      
                    <div className="bbb">
                        <h2>Other buses</h2>
                        <div className="mainbox2">

                            {otherbusinfo.map((bus, index) => (
                                <Otherbus
                                    key={index}
                                    img={bus.img}
                                    no={bus.no}
                                    onClick={() => handleBusClick(bus.no, bus.img)}
                                />
                                ))
                            }
                                                      
                        </div>     
                    </div>                       
                </div>
            </div>
            <div className="settings">
                <Setting />
            </div>

            <div className="bus-timings">               
                <Bus_timing                   
                />
            </div>


        </div>
    </div>
    
}

export default Homes;