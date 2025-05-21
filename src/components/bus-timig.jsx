import React from "react";

function Bus_timing({stops1,abba}){


     function open() {
            const bus_timings = document.getElementsByClassName("bus-timings")[0];
            if (bus_timings) {
                bus_timings.style.display = "none";
                const rightside = document.getElementsByClassName("rightside")[0];
                rightside.style.display = "block";
            }     
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
        <div className="timings-main">
            <div className="tink" onClick={open}>
                    <img src={`${process.env.PUBLIC_URL}/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} alt="h"/> 
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
    );
}

export default Bus_timing;