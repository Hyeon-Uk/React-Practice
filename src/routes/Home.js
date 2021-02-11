import React,{useState} from "react";
import { authService } from "../fbase";

function Home(){
    const [nweet,setNweet]=useState("");

    const onSubmit=(event)=>{
        event.preventDefault();
    }

    const onChange=(event)=>{
        const {target:{value}}=event;
        setNweet(value);
    }
    return (<div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={nweet} type="text" maxLength="120" placeholder="What's your mind?"></input>
            <input type="submit" value="Nweet"></input>
        </form>
    </div>);
}

export default Home;