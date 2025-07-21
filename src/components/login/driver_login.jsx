import React, { useEffect ,useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom"; 



function Login(){
    

    const [name1,fname]=useState("");
    const [pass1,fpass]=useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

  
    


    const handlechange = async(event)=>{
        fname(event.target.value);
        
    }
    const handlechang = async (event)=>{
        fpass(event.target.value);
        
    }
    

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post( `${process.env.REACT_APP_BASE_URL}/driver-login`, {
                username: name1,
                password: pass1
            });
            
            if (response.data.success) {
                const privates = response.data.privatecheck;

                const busNo = privates[0]?.busno;
                if (!busNo) {
                    alert("No bus number found in response!");
                    return;
                }
                
                localStorage.setItem("busno", busNo);
                localStorage.setItem("selectedRole", "driver"); 

                try {
                        console.log("sent busno");
                        const saveRes = await axios.post( `${process.env.REACT_APP_BASE_URL}/private`, {
                        rollno: busNo,
                        username: busNo
                    });
                    if (saveRes.data.success) {                      
                        navigate("/driver-home");  
                    } else {
                        alert("Failed to save bus info. Try again.");
                    }

                } catch (error) {
                    alert("Internal error while saving. Try again.");
                }
            } else{
                
                fname("");
                fpass("");

                setError("Invalid username or password ");
                
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(" Server error. Please try again.");
        }
    };

    useEffect(() => {
    const savedRole = localStorage.getItem("selectedRole");
    if (savedRole) {
      setSelectedRole(savedRole);
    }
  }, []);


    function handleClick1(e){
        
        const role=e.target.value;
        setSelectedRole(role);
        localStorage.setItem("selectedRole", role); 
        setTimeout(() => {
            if (role === "driver") {
                navigate("/driver-login");
            } else {
                navigate("/student-login");
            }
        }, 50);
    }



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return(
        <div className="container">
            <div className="login" >
            
                <h3 className="h3">KITSW</h3>
            
        
                <div className="signBox">
                   <div className="signBox2">
                        <div>
                            <h4>Sign in to</h4>
                            <h5> Kits Bus tracking system</h5>
                            <br/>
                            <input className="check1" name="role" value="driver" type="radio" checked={selectedRole=== "driver"} onChange={handleClick1} />driver<br/>
                            <input className="check1" name="role" value="student" type="radio" checked={selectedRole=== "student"} onChange={handleClick1}/> student 
                            <br/>
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

export default Login;   






