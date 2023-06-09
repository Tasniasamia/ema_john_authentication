import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthProviderdata } from '../AuthProvider/AuthProvider';
import './Login.css'
const Login = () => {
    
    const location=useLocation();
    const navigate=useNavigate('');

    console.log(location);
    let from=location.state?.from?.pathname || "/";
    const receivedata=useContext(AuthProviderdata);
    const{signin}=receivedata;
    const[error,setError]=useState('');
    const[success,setSuccess]=useState('');
    function submit(event){
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
       
        signin(email,password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setSuccess('User has successfully submited');
            setError('');
            event.target.reset();
            navigate(from);
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
        
            <div className='signin_section'>
                <div className='signin'>
            <h2 style={{textAlign:"center"}}>Login</h2>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
              
                <div style={{marginTop:"20px"}}>
                    <input type="submit" value="Login" /> </div>
                    <p style={{color:"red",textAlign:"center"}}>{error}</p>
                    <p style={{color:"green",textAlign:"center"}}>{success}</p>
                    <p style={{textAlign:"center",marginBottom:"20px"}}>New to Ema_John?<Link to="/Resister">Create a New Account</Link></p>
               
                <hr />
                <div  style={{textAlign:"center",border:"1px solid #95A0A7",padding:"10px",marginTop:"20px"}}>

                <i className="fa-brands fa-google"></i>    Continue with Google
                </div>
            </form>
            </div>
        </div>
    );
};

export default Login;