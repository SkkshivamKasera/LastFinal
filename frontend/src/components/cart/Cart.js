import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector} from 'react-redux'
import { addItemToCart, removeItemsFromCart } from '../../actions/cartAction'
import { RemoveShoppingCart} from '@mui/icons-material'
import {Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { cartItems } = useSelector((state) => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1
        if(stock <= quantity){
            return
        }
        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1
        if(quantity <= 1){
            return
        }
        dispatch(addItemToCart(id, newQty))
    }

    const remove = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping")
    }
  return (
    <Fragment>
    {cartItems.length === 0 ? 
    (
        <div className='emptyCart'>
            <RemoveShoppingCart/>
            <Typography>No Product in Your Cart</Typography>
            <Link to ='/products'>View Product</Link>
        </div>
    ) :
    <div className='cartPage'>
        <div className='cartHeader'>
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>

        {cartItems && cartItems.map((item) => (
            <div className='cartContainer' key={item.product}>
            <CartItemCard item={item} remove={remove}/>
            <div className='cartInput'>
                <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                <input type='number' value={item.quantity} readOnly/>
                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
            </div>
            <div>
                <p className='cartSubTotal'>{`₹${item.price*item.quantity}`}</p>
            </div>
        </div>
        ))}
        
        <div className='cartGrossProfit'>
            <div></div>
            <div className='cartGrossProfitBox'>
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                )}`}</p>
            </div>
            <div></div>
            <div className='checkOutBtn'>
                <button onClick={checkoutHandler}>Check Out</button>
            </div>
        </div>
    </div>
}
</Fragment>
  )
}

export default Cart
