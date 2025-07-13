import React from "react";
import { Link } from "react-router-dom";

function Admin_home_main(){
    return(
        <div>
            <Link to="/password-change"><button>change password</button></Link>
            <Link to="/bus-changes"><button>bus changes</button></Link>
        </div>
    );
}

export default Admin_home_main;