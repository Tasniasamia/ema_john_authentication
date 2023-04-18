import React, { useContext } from 'react';
import { AuthProviderdata } from '../AuthProvider/AuthProvider';

const Checkout = () => {
    const receivedata=useContext(AuthProviderdata);
    // const {data}=receivedata
    return (
        <div>
            <h2>Checkout your order!!! page {receivedata.data}</h2>
        </div>
    );
};

export default Checkout;