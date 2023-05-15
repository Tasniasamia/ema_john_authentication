import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const options=[5,10,15];
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
   const [curentpage,setCurentpage]=useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
 
const { Collectioncount}=useLoaderData();
console.log(Collectioncount);
let totalPages=Collectioncount/itemsPerPage;
    // useEffect(() => {
    //     fetch('http://localhost:4650/product')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:4650/product?page=${curentpage}&itemsPerPage=${itemsPerPage}`);
            const jsonData = await response.json();
            setProducts(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [curentpage, itemsPerPage]);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])
//pagination start

    const paginationButtons = [];
  
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button key={i} onClick={()=>setCurentpage(i)} className={i==curentpage?'selected':" "}>{i}</button>
      );
    }


    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurentpage(1)
      };
    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>


            <div  style={{textAlign:"center"}}>
                Current page :{curentpage}<br/>
      {paginationButtons}
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        {
            options.map(index=><option value={index} key={index}>{index}</option>)
        }
        {/* <option value="5">5 items per page</option>
        <option value="10">10 items per page</option>
        <option value="15">15 items per page</option> */}
      </select>
    </div>
        </div>
    );
};

export default Shop;