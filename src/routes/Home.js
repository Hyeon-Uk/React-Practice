import React, { useState, useEffect } from "react";
import Nweet from "../component/Nweet";
import { dbService } from "../fbase";
function Home({userObj}) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment]=useState(null);
    useEffect(() => {
        dbService.collection('nwit').onSnapshot(snapshot=>{
            const nweetArray=snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nwit").add({
            text:nweet,
            createAt: Date.now(),
            creatorId:userObj.uid,
        });
        setNweet("");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }

    const onFileChange=(event)=>{
        const {target:{files}}=event;
        const theFile=files[0];
        if(theFile===undefined){
            setAttachment(null);
            return;
        }
        const reader= new FileReader();
        reader.onloadend=(finishedEvent)=>{
            const {
                currentTarget:{
                    result
                }
            }=finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment=()=>{
        setAttachment(null);
        console.log(attachment);
    }
    return (<div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={nweet} type="text" maxLength="120" placeholder="What's your mind?"></input>
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet"></input>
            {attachment
            &&<div>
                <img src={attachment} width="50px" height="50px"/>
                <button onClick={onClearAttachment}>Clear</button>
                </div>
            }
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}></Nweet>
            ))}
        </div>
    </div>);
}

export default Home;