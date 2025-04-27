import React from "react";

import { Home1, Otherbus } from "./home1";
import { info, otherbusinfo } from "./info";



function Home(){

    
    return <div className="homepage">
        
        <div className="insidebox">
            <div className="sidebox">
                <div className="userinfo">
                    <img src={`${process.env.PUBLIC_URL}/homeimg/busimg.png`} alt="" />
                    <h2>Thilak Gaddam</h2>
                </div>
                <Home1 
                    names={info[0].listname}
                    img={info[0].img}
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
                />
                <Home1 
                    names={info[5].listname}
                    img={info[5].img}
                />
            </div>
            <div className="rightside">
                <div className="mainbox">
                    <div className="mainbox1">
                        <div className="aaa">
                            <h1>Hey Thilak ,<br></br>here is your bus</h1>
                            <h2>My bus</h2>
                            <div className="ourbus">
                                <img className="busimg" src={`${process.env.PUBLIC_URL}/homeimg/busimg.png`} alt="" />
                                <div className="businfo">
                                    <h4>NO.{}</h4>
                                    <p>Arriving in{}</p>
                                    <div className="buttons">
                                        <button href="https://www.google.co.in">Bus Timing</button>
                                        <button href="#">Messages</button>
                                        <button href="#">Track Your Bus</button>
                                    </div>
                                </div>                  
                            </div>     
                        </div>                      
                        <div className="bbb">
                            <h2>Other buses</h2>
                            <div className="mainbox2">
                            <Otherbus 
                                img={otherbusinfo[0].img}
                                no={otherbusinfo[0].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[1].img}
                                no={otherbusinfo[1].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[2].img}
                                no={otherbusinfo[2].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[3].img}
                                no={otherbusinfo[3].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[4].img}
                                no={otherbusinfo[4].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[5].img}
                                no={otherbusinfo[5].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[5].img}
                                no={otherbusinfo[5].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[5].img}
                                no={otherbusinfo[5].no}  
                            />
                            <Otherbus 
                                img={otherbusinfo[5].img}
                                no={otherbusinfo[5].no}  
                            />
                            

                        </div>     
                        </div> 
                        
                    </div>                    
                </div>
            </div>
        </div>
    </div>
    
}

export default Home;