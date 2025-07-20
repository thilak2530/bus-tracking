import React, { useEffect ,useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom"; 



function Admin_login(){
    

    const [name1,fname]=useState("");
    const [pass1,fpass]=useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("admin");

  
    


    const handlechange = async(event)=>{
        fname(event.target.value);
        
    }
    const handlechang = async (event)=>{
        fpass(event.target.value);
        
    }
    

    const handleClick = async (event) => {
        event.preventDefault();
        localStorage.setItem("selectedRole","admin");

        try {
            const response = await axios.post( `${process.env.REACT_APP_BASE_URL}/admin-login`, {
                username: name1,
                password: pass1
            });
            console.log("Login Response:", response.data);
            
            if (response.data.success) {
                
                navigate("/admin-home-main");
                localStorage.setItem("usernames", name1);
                localStorage.setItem("username", name1);                
            } else{
                
                fname("");
                fpass("");

                setError("Invalid username or password ");
                
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Server error. Please try again.");
        }
    };




    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return(
        <div className="container1">
            <div className="login" >
            
                <h3 id="h3">KITSW</h3>
            
        
                <div className="signBoxx">
                    <h1 className="h1-adm">ADMIN</h1>
                   <div className="signBox22">
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
                                <a href="#"><span>Forget password?</span></a>
                                
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

export default Admin_login;   






