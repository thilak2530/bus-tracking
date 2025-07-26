import React , {useRef} from "react";
import { Link } from "react-router-dom";
import "./main.css";


function Boxx(props){
    return(
        <Link className="boxx" style={{ textDecoration:"none", color:"black" }} to={props.link}><div >
            <span className="material-symbols-outlined">{props.text}</span>
            <h4>{props.h4}</h4>
            <p>{props.p}</p>
        </div></Link>   
    );
}
function Main(){

    const logins = useRef(null);

    return(
        <div className="supermain">
            
            <nav>
                <div>
                    <img src="" alt="" />
                </div>
                <div id="buttons">
                    <div>
                        <Link className="link" to={"/#"}>Contact</Link>
                        <Link className="link" to={"/#"}>About</Link>
                        <Link className="link" to={"/#"}>Features</Link>
                        
                    </div>
                   
                </div>
            </nav>


            
            <section>
                <div className="main">
                    <div className="text">
                        <h2>Track your selected bus in real-time</h2>
                        <p>Real-time bus tracking system designed to simplify student transportation. Know exactly where your bus is — anytime, anywhere.</p>
                        <button onClick={()=>
                            {
                                document.querySelector(".main1").style.display="flex";
                                logins.current?.scrollIntoView({ behavior:"smooth" }); 
                                
                            }}> 
                            Get start</button>
                    </div>
                </div>
                <div className="main1" ref={logins}>
                   <div className="main2">
                        <h3>choose your login</h3>
                        <p>after login sign-in with your crendentials</p>
                        <div className="boxes">
                            <Boxx 
                                text={"manage_accounts"}
                                link={"/admin-login"}
                                h4={"Admin"}
                                p={"Manage users, buses, and timings in one place"}
                            />
                            <Boxx 
                                text={"car_fan_low_left"}
                                link={"/driver-login"}
                                h4={"Driver"}
                                p={"Start and end trips with a single tap"}
                            />
                            <Boxx 
                                text={"school"}
                                link={"/student-login"}
                                h4={"Student"}
                                p={"Track your selected bus in real-time"}
                            />
                        </div>
                   </div>
                </div>
            </section>
            
           
        </div>
    );

}

export default Main;