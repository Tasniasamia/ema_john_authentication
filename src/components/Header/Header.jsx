import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthProviderdata } from '../AuthProvider/AuthProvider';

const Header = () => {
    const {user,logout}=useContext(AuthProviderdata);
    
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user?<div style={{color:"white"}}><span>{user.email}</span><span style={{marginLeft:"10px",color:"white"}} onClick={logout}>LogOut</span></div>: <Link to="/login">Login</Link>
                }
               
                <Link to="/Resister">Resister</Link>

            </div>
        </nav>
    );
};

export default Header;