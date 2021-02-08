import React,{useState} from "react";

function Auth(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

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

    const onSubmit=(e)=>{
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="email" type="text" placeholder="Email" value={email} required></input>
                <input onChange={onChange} name="password" type="password" placeholder="Password" value={password} required></input>
                <input type="submit" value="Log In"></input>
            </form>
        <div>
            <button>Continue With Google</button>
            <button>Continue With Github</button>
        </div>
        </div>
    );
}

export default Auth;