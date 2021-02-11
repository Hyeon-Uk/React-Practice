import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";
function Home() {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    //이부분 다시 공부
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nwit").get();
        dbNweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nwit").add({
            nweet,
            createAt: Date.now()
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
                    <h4>{nweet.nweet}</h4>
                </div>
            ))}
        </div>
    </div>);
}

export default Home;