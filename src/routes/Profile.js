import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";
function Profile() {
    const history = useHistory();
    const onClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <>
            <span>Profile</span>
            <button onClick={onClick}>Log Out</button>
        </>
    );
}

export default Profile;