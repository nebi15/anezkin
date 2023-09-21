import "./auth.css";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';
import { useState } from "react";
import { signInWithGoogle } from "../config/firebase";
import { useNavigate } from 'react-router-dom';



export const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    console.log(auth?.currentUser?.email);



    const signIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/menu');
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async (e) => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/menu');
        } catch (err) {
            console.error(err);
        }

    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }

    };




    return (
        <div className="login-box">
            <h2>Login</h2>
            <input className="user-email"
                placeholder="Email.."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="user-email"
                placeholder="Password.."
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button className="btn-singin" onClick={signIn}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign In
            </button>

            <button className="btn-singin" onClick={signInWithGoogle}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign In With Google
            </button>

            <button className="btn-singin" onClick={logout}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Logout
            </button>
        </div>
    )
};
