import React,{useState} from "react";
import {dbService } from "../fbase";
function Home(){
    const [nweet,setNweet]=useState("");

    const onSubmit=async (event)=>{
        event.preventDefault();
        await dbService.collection("nwit").add({
            nweet,
            createAt:Date.now()
        });
        setNweet("");
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