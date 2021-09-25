import React, { useState, useEffect } from "react";
import Nweet from "../component/Nweet";
import { dbService} from "../fbase";
import NweetFactory from "../component/NweetFactory";
function Home({userObj}) {
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

    return (
    <div className="container">
        <NweetFactory userObj={userObj}/>
        <div style={{marginTop:30}}>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}></Nweet>
            ))}
        </div>
    </div>);
}

export default Home;