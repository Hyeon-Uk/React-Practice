import React from "react";
import { authService } from "../fbase";

function Home(){
    const onClick=()=>{
        authService.signOut();
    }
    return (<div>
        <span>Home</span>
        <button onClick={onClick}>Log Out</button>
    </div>);
}

export default Home;