import React, {  createContext, useEffect, useState } from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import app from '../../Firebase/firebase_config';

export const AuthProviderdata=createContext(null);
const AuthProvider = ({children}) => {
    const[user,setUser]=useState('');
    const[loading,setLoading]=useState(true);
    const auth = getAuth(app);
    //signup
const signup=(email,password)=>{
    setLoading(true);
return createUserWithEmailAndPassword(auth, email, password);
}
//signin
const signin=(email,password)=>{
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
    }
    //OnAuthChanged
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user) => {
           setUser(user);
           setLoading(false);
          });
          return ()=>{
            return unsubscribe();
          }
          
    },[])
    const logout=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          setUser("");
        }).catch((error) => {
          // An error happened.
        });
    }
    const data="first fight";
    
    const authdata={
        data,signup,signin,user,logout,loading
    }
    return (
       <AuthProviderdata.Provider value={authdata}>
        {children}
       </AuthProviderdata.Provider>
    );
};

export default AuthProvider;