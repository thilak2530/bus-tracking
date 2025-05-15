import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 




function Login(){

    const [name1,fname]=useState("");
    const [pass1,fpass]=useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handlechange = async(event)=>{
        fname(event.target.value);
        
    }
    const handlechang = async (event)=>{
        fpass(event.target.value);
        
    }
    

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/login", {
                username: name1,
                password: pass1
            });
            
            if (response.data.success) {
                localStorage.setItem("username", name1);
                navigate("/home");
            } else{
                
                fname("");
                fpass("");

                setError(<p id="blue">Invalid username or password </p>);
                
            }
        } catch (error) {
            console.error("Login error:", error);
            setError( <p id="blue">Server error. Please try again.</p>);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return(
        <div className="container">
            <div className="login" >
            
                <h3>KITSW</h3>
            
        
                <div className="signBox">
                   <div className="signBox2">
                        <div>
                            <h4>Sign in to</h4>
                            <h5> Kits Bus tracking system</h5>
                        </div>
                        <form method="post" onSubmit={handleClick} >
                            <div className="box">
                                <h5>Username</h5>
                                <div className="inputbox">
                                     <input id="user" type="text" onChange={handlechange}  placeholder="Enter your username" name="user" value={name1}  required/>
                                </div>
                               
                            </div>
                            <div className="box">
                                <h5>Password</h5>
                                <div className={error?"abc":"inputbox" }>
                                    <input id="password" type={showPassword ? "text" : "password"}   onChange={handlechang} placeholder="Enter your password" name="pass" value={pass1} required />
                                    <div id={showPassword ? "div1" : "div2"} onClick={togglePasswordVisibility}>
                                        
                                    </div>
                                </div>
                            </div>

                            <br />
                           
                            
                            <div className="check"> 
                                <div>  
                                    <input type="checkbox" /><span>Remember me</span>   
                                </div>
                                <span>Forget password?</span>
                                
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            
                            <div className="box" id="box">
                                <div className="inputbox">
                                    <input id="button" type="submit" value="Login" />   
                                </div>
                            </div>
                        </form>
                   </div>
                </div>

            </div>
        </div>
        

        

 
   
    );
}

export default Login;   






