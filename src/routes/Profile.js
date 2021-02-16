import React ,{useEffect,useState}from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
function Profile({refreshUser,userObj}) {
    const history = useHistory();
    const [myNweets,setMyNweets]=useState([]);
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    useEffect(() => {
        getMyNweets();
      }, []);

    const getMyNweets=async ()=>{
        const nweets=await dbService.collection('nwit')
        .where("creatorId","==",userObj.uid)
        .get();
        const arr=(nweets.docs.map((doc)=>
            doc.data(),
        ));
        console.log("arr",arr);
        setMyNweets(arr);
        console.log("mynweets",myNweets);
    };

    const onChange=(event)=>{
        const {target:{
            value
        }}=event;
        setNewDisplayName(value);
    }
    const onSubmit=async (event)=>{
        event.preventDefault();
        if(newDisplayName!==userObj.displayName){
            await userObj.updateProfile({
                displayName:newDisplayName
            });
        }
        refreshUser();
    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="DisplayName" value={newDisplayName} onChange={onChange}/>
            <input type="submit" value="Update Profile"/>
        </form>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Profile;