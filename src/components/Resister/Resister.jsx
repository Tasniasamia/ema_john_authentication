import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthProviderdata } from '../AuthProvider/AuthProvider';
import './Resister.css'
const Resister = () => {
    const receivedata=useContext(AuthProviderdata);
    const{signup}=receivedata;
    const[error,setError]=useState('');
    const[success,setSuccess]=useState('');
    function submit(event){
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        const confrim_pass=event.target.confrim_password.value;
        if(password!=confrim_pass){
            setError("Your password haven't matched");
        }
        signup(email,password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setSuccess('User has successfully submited');
            setError('');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(errorMessage);
            setSuccess('');
            // ..
          });
    }
    return (
        
            <div className='signup_section'>
                <div className='signup'>
            <h2 style={{textAlign:"center"}}>Sign Up</h2>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confrim_password">Confrim Password</label>
                    <input type="password" name="confrim_password" id="confrim_password" />
                </div>
                <div style={{marginTop:"20px"}}>
                    <input type="submit" value="Sign Up" /> </div>
                    <p style={{color:"red",textAlign:"center"}}>{error}</p>
                    <p style={{color:"green",textAlign:"center"}}>{success}</p>
                    <p style={{textAlign:"center",marginBottom:"20px"}}>Already have an account? <Link to="/login">Login</Link></p>
               
                <hr />
                <div  style={{textAlign:"center",border:"1px solid #95A0A7",padding:"10px",marginTop:"20px"}}>

                <i className="fa-brands fa-google"></i>    Continue with Google
                </div>
            </form>
            </div>
        </div>
    );
};

export default Resister;