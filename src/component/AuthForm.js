import React, { useState } from 'react';
import { authService } from '../fbase';
const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {
            target: { name, value }
        } = e;

        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    }
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            }
            else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input onChange={onChange} className="authInput"
                    name="email" type="text"
                    placeholder="Email"
                    value={email} required />
                <input onChange={onChange} className="authInput"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password} required/>
                <input type="submit" className="authInput authSubmit"
                    value={
                        newAccount ? "Create Account" : "Log In"
                    } />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}</span>
        </>
    );
}

export default AuthForm;