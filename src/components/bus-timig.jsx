import React from "react";

function Bus_timing(){


     function open() {
            const bus_timings = document.getElementsByClassName("bus-timings")[0];
            if (bus_timings) {
                bus_timings.style.display = "none";
                const rightside = document.getElementsByClassName("rightside")[0];
                rightside.style.display = "block";
            }     
    }


    return(
        <div className="timings-main">
            <div className="tink" onClick={open}>
                    <img src={`${process.env.PUBLIC_URL}/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} alt="h"/> 
            </div> 
            <div className="timings">
                <table>
                    <tr>
                        <th>STOPS</th>
                        <th><img className="ooo" src={`${process.env.PUBLIC_URL}/timing-page-img/bus-stop.png`}/></th>
                        <th><img className="ooo" src={`${process.env.PUBLIC_URL}/timing-page-img/bus-moving.png`}/></th>
                    </tr>
                    <tr>
                        <td>busstand</td>
                        <td>7.00</td>
                        <td>8.10</td>
                    </tr>
                    <tr>
                        <td>gandhi-statue</td>
                        <td>7.30</td>
                        <td>7.40</td>
                    </tr>
                    <tr>
                        <td>auto-stand</td>
                        <td>8.00</td>
                        <td>8.10</td>
                    </tr>
                    <tr>
                        <td>hasanparthi-bus-stand</td>
                        <td>8.30</td>
                        <td>8.40</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>kitsw</td>
                        <td>9.00</td>
                        <td>-</td>
                    </tr>
                    
                   

                </table>
            </div>
        </div>
    );
}

export default Bus_timing;