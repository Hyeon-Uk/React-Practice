import React ,{useEffect}from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
function Profile({userObj}) {
    const history = useHistory();
    const onClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets=async ()=>{
        const nweets=await dbService.collection('nwit')
        .where("creatorId","==",userObj.uid)
        .get();
        console.log(nweets.docs.map((doc)=>doc.data()));
    };

    useEffect(() => {
        getMyNweets();
      }, []);
    return (
        <>
            <span>Profile</span>
            <button onClick={onClick}>Log Out</button>
        </>
    );
}

export default Profile;