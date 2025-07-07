import react from "react";



function Messages(){
    
    const a=localStorage.getItem("msg");
    
    return(
        <div>
        <p>{a}</p>
        
        </div>
    );
}

export default Messages;