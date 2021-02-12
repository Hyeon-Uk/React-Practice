import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
function Home({userObj}) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
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
    return (<div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={nweet} type="text" maxLength="120" placeholder="What's your mind?"></input>
            <input type="submit" value="Nweet"></input>
        </form>
        <div>
            {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                </div>
            ))}
        </div>
    </div>);
}

export default Home;