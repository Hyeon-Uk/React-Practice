import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from '../fbase';
const NweetFactory=({userObj})=>{
    const [nweet, setNweet] = useState("");
    const [attachment,setAttachment]=useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl ="";
        if(attachment!==""){
            const fileRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response=await fileRef.putString(attachment,"data_url");
            attachmentUrl=await response.ref.getDownloadURL();
        }
        const nweetObj={
            text:nweet,
            createAt: Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("nwit").add(nweetObj);
        setNweet("");
        setAttachment("");
        
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

    return(
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
    );
}
export default NweetFactory;