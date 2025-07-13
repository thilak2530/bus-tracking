import React, { useEffect } from "react";
import Sidebox from "./sidebox";
import { useLocation,useNavigate } from "react-router-dom";
import { info, otherbusinfo,useBusTimings } from "../info";





function Bus_timing(){
    const busTimings=useBusTimings();
    const location = useLocation();
    const navigate = useNavigate();
    const abba = location.state?.abba;


    const stops1= busTimings;

      useEffect(() => {
        if (!abba) {
            navigate("/student-home");
        }
    }, [abba, navigate]);



    function open() {
        navigate("/student-home")
    }

        let busData;
        switch (parseInt(abba)) {
        case 1:
            busData = stops1[0];
            break;
        case 2:
            busData = stops1[1];
            break;
        case 3:
            busData = stops1[2];
            break;
        case 4:
            busData = stops1[3];
            break;
        case 5:
            busData = stops1[4];
            break;
        case 6:
            busData = stops1[5];
            break;
        case 7:
            busData = stops1[6];
            break;
        default:
            busData = null;
            break;
        }


    return(
        <div className="bus-timing-page">
            <Sidebox />
            <div className="timings-main">
            <div className="tink" onClick={open}>
                <img src={`${process.env.PUBLIC_URL}/homeimg/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} alt="h"/> 
                
            </div> 
            <div className="timings">
                <table>
                    <thead>
                        <tr>
                            <th>STOPS</th>
                            <th><img className="ooo" src={`${process.env.PUBLIC_URL}/timing-page-img/bus-stop.png`}/></th>
                            <th><img className="ooo" src={`${process.env.PUBLIC_URL}/timing-page-img/bus-moving.png`}/></th>
                        </tr>
                    </thead>
                    <tbody>
                        

                        {busData && Object.entries(busData).map(([stopkey,values])=>{
                            if(stopkey==="bus") return null;

                            return(
                                <tr key={stopkey}>
                                    <td>{values[0]}</td>
                                    <td>{values[1]}</td>
                                    <td>{values[2]}</td>
                                </tr>
                            );
                        })}
                        
                    </tbody>
                    
                  
                   

                </table>
            </div>
        </div>
        </div>
        
    );
}

export default Bus_timing;