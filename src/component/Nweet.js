import React from 'react';

const Nweet = ({nweetObj,isOwner}) =>(
    <div key={nweetObj.id}>
        <h4>{nweetObj.text}</h4>
        {isOwner&&<>
            <button>Delete Nweet</button>
            <button>Update Nweet</button>
        </>}
    </div>
);
export default Nweet;