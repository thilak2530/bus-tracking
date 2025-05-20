import React from "react";

function Bus_timing(){
    return(
        <div className="timings-main">
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
                   

                </table>
            </div>
        </div>
    );
}

export default Bus_timing;