import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import Home from './components/Layout/Home';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './loaders/cartProductsLoader';
import Checkout from './components/Checkout/Checkout';
import Resister from './components/Resister/Resister';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Private_route from './components/Private_route/Private_route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:4650/collectionCount'),
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element:<Private_route><Inventory></Inventory></Private_route> 
      },
      {
        path:'checkout',
        element:<Private_route> <Checkout></Checkout></Private_route>
      },
      {
        path: 'login',
        element: <Login></Login>
      },{
        path:'Resister',
        element:<Resister></Resister>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
