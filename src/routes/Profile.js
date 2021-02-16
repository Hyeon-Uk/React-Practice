import React ,{useEffect,useState}from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
function Profile({refreshUser,userObj}) {
    const history = useHistory();
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
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
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input 
            autoFocus
            className="formInput"
            type="text"
            placeholder="DisplayName"
            value={newDisplayName}
            onChange={onChange}/>
            <input
            style={{marginTop:10}}
            className="formBtn"
            type="submit" 
            value="Update Profile"/>
        </form>
            <span 
            className="formBtn cancelBtn logOut"
            onClick={onLogOutClick}>Log Out</span>
        </div>
    );
}

export default Profile;