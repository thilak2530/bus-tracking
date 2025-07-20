import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebox from "./sidebox"; 








function Setting(){
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);
    const [showPasswor, setShowPasswor] = useState(false);
    const [showPasswo, setShowPasswo] = useState(false);
    const[color,setcolor]=useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibilit = () => {
        setShowPasswor(!showPasswor);
    };
    const togglePasswordVisibili = () => {
        setShowPasswo(!showPasswo);
    };

    const username = localStorage.getItem("username");
    

    function open() {
            navigate("/student-home")
    }
    

    const [re_user,re_user_final]=useState("");
    const [old_pass,old_pass_final]=useState("");
    const [re_pass,re_pass_final]=useState("");
    const [re_passss,re_passss_final]=useState("");

    const re_user_1 = async(event)=>{
        re_user_final(event.target.value)
    }
    const old_pass_1 = async(event)=>{
        old_pass_final(event.target.value)
    }
    const re_pass_1 = async(event)=>{
        re_pass_final(event.target.value)
    }
    const re_passss_1 = async(event)=>{
        re_passss_final(event.target.value)
    }

    const save = async(event)=>{
        event.preventDefault();

        if (re_pass !== re_passss) {
            alert("New passwords do not match.");
            return;
        }
        try{
            
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reset`, {
                re_username:re_user ,
                re_password:re_pass,
                username:username,
                password:old_pass
            });

            if(response.data.save){
                alert("updated successfully");
                re_user_final("");
                re_pass_final("");
                re_passss_final("");
                old_pass_final("")
                navigate("/student-login");
            }
            else{
                alert("update failed");
                setcolor(true);

            }
        }catch{
            alert("hellooooo");
        }
    }

    return(

        <div className="settings-page">
             <Sidebox />

        <div className="sett-main">
            <div className="tink" onClick={open}>
                    <img src={`${process.env.PUBLIC_URL}/homeimg/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} alt="h"/> 
                    
            </div> 
            <div className="sett">
                <p id="reset-heading"> Reset your Username & password</p>
                <div className="sett-box-1">
                    <form className="setting-form" method="post" onSubmit={save}>
                        
                        <div className="center-box">
                            <p>reset username :</p>
                            <div className="abcd">
                                <div id="div1">
                                    <input className="input" style={{borderColor:color?"red":"black"}} type="text" onChange={re_user_1} name="reset-username" value={re_user} required/>
                                </div>
                            </div>
                            <p>old password :</p>
                            <div className="abc" style={{borderColor:color?"red":"black"}}>
                                <input className="input" type={showPassword?"text":"password"} onChange={old_pass_1} name="reset-password" value={old_pass} required/>
                                <div  id={showPassword ? "div1" : "div2"} onClick={togglePasswordVisibility}></div>
                            </div>
                            <p> new password :</p>
                            <div className="abc" style={{borderColor:color?"red":"black"}}>
                                <input className="input" type={showPasswor?"text":"password"} onChange={re_pass_1} name="reset-password" value={re_pass} required/>
                                <div id={showPasswor ? "div3" : "div4"} onClick={togglePasswordVisibilit}></div>
                            </div>
                            
                            <p>confirm password :</p>
                            <div className="abc" style={{borderColor:color?"red":"black"}}>
                                <input className="input" type={showPasswo?"text":"password"} onChange={re_passss_1} name="reset-password-1" value={re_passss} required/>
                                <div id={showPasswo ? "div5" : "div6"} onClick={togglePasswordVisibili}></div>
                            </div>

                            <div className="abcd">
                                <input className="input" id="save" type="submit" value="save" />
                            </div>
                            
                            
                        </div>
                    </form>
                </div>
            </div>

        </div>
       </div>
    );
}

export default Setting;