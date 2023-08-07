import React from 'react'
import './CartItemCard.css'
import {Link} from 'react-router-dom'

const CartItemCard = ({item, remove}) => {
  return (
    <div className='cartItemCard'>
      <img src={item.image} alt='ssa'/>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price ₹${item.price}`}</span>
        <p onClick={() => remove(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
