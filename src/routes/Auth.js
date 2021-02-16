import React from "react";
import AuthForm from "../component/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "../fbase";

function Auth() {
    const onSocialClick = async (e) => {
        const {
            target: {
                name
            }
        } = e;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);

    };


    return (
        <div className="authContainer">
            <FontAwesomeIcon 
            icon={faTwitter} 
            color={"#04AAFF"} 
            size="3x"
            style={{marginBottom:30}}/>
            <AuthForm />
            <div className="authBtns">
                <button 
                className="authBtn"
                onClick={onSocialClick} 
                name="google">Continue With Google
                <FontAwesomeIcon icon={faGoogle}/>
                </button>
                <button
                className="authBtn"
                onClick={onSocialClick} 
                name="github">Continue With Github
                <FontAwesomeIcon icon={faGithub}/>
                </button>
            </div>
        </div>
    );
}

export default Auth;