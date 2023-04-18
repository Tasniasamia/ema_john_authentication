import React, { useContext } from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { AuthProviderdata } from '../AuthProvider/AuthProvider';

const Private_route = ({children}) => {
    const location=useLocation();
    console.log(location);
    const{user,loading}=useContext(AuthProviderdata);
    if(user){
        return children;
    }
    if(loading){
        return <div>Loading....</div>
    }
    return (
        <Navigate to="/login" state={{ from: location }} replace ></Navigate>
    );
};

export default Private_route;