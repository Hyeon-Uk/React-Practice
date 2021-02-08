import React,{useState} from "react";
import { authService, firebaseInstance } from "../fbase";

function Auth(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");
    const onChange= (e) =>{
        const {
            target:{name,value}
        }=e;

        if(name==="email"){
            setEmail(value);
        }
        else if(name==="password"){
            setPassword(value);
        }
    }
    const toggleAccount=()=>{
        setNewAccount((prev)=>!prev);
    }

    const onSocialClick=async (e)=>{
        const {
            target:{
                name
            }
        }=e;
        let provider;
        if(name==="google"){
            provider =  new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name==="github"){
            provider =  new firebaseInstance.auth.GithubAuthProvider();
        }
        const data=await authService.signInWithPopup(provider);

        console.log(data);
    };

    const onSubmit=async (e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                data=await authService.createUserWithEmailAndPassword(email,password);
            }
            else{
                data=await authService.signInWithEmailAndPassword(email,password);
            }
        }catch(err){
            setError(err.message);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" value={email} required></input>
                <input onChange={onChange} name="password" type="password" placeholder="Password" value={password} required></input>
                <input type="submit" value={
                    newAccount ? "Create Account":"Log In"
                }></input>
            {error}
            </form>
            <span onClick={toggleAccount}>{newAccount?"Sign In":"Create Account"}</span>
        <div>
            <button onClick={onSocialClick}name="google">Continue With Google</button>
            <button onClick={onSocialClick}name="github">Continue With Github</button>
        </div>
        </div>
    );
}

export default Auth;