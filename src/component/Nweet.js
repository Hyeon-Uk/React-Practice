import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await dbService.doc(`nwit/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const onChange=(event)=>{
        event.preventDefault();
        const {target:{value}}=event;
        setNewNweet(value);
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        dbService.doc(`nwit/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    }


    return (
        <div>
            {editing ?(
                <>
                    <form onSubmit={onSubmit}>
                        <input required onChange={onChange} type="text" value={newNweet} placeholder="Update your Nweet"/>
                        <input type="submit" value="Update Nweet!"/>
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ):(
                <div key={nweetObj.id}>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl&&<img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
                    {isOwner && <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Update Nweet</button>
                    </>}
                </div>
            )}
        </div>
    );
};
export default Nweet;