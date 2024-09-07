import React, { useState } from 'react'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    const cartItems = useSelector((store)=>store.cart.items)
  return (
    <div>
    <div className='menu'>
       
        <div className='search-menu'>
            <div className='menu-text'> ---CART ITEMS---</div>
        </div>

        {cartItems.map((item, index)=>(
               
        <CartItem 
        index={index}
        item={item}
        />
    
         ))}


        
    </div>
</div >
  )
}

export default Cart