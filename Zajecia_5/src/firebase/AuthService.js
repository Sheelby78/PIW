import { useState } from "react";
import { auth } from "./init";
import { 
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    TwitterAuthProvider 
 } from "firebase/auth";
import { useEffect } from "react";

 const googleProvider = new  GoogleAuthProvider();
 const twitterProvider = new TwitterAuthProvider();

 export const logInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);

    } catch (err){
        console.error({err});
        alert(err.message);
    }
 };

 export const logInWithTwitter = async () => {
    try {
        await signInWithPopup(auth, twitterProvider);

    } catch (err){
        console.error({err});
        alert(err.message);
    }
 };

 export const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        })
    }, []);
    return user;
 }

 export const logOut = async () => {
        await signOut(auth);
 };