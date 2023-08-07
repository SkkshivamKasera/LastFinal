import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import { Link, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import SideBar from './SideBar'
import Loader from '../layouts/loader/Loader'
import { AccountTree } from '@mui/icons-material'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import './UpdateOrder.css'

const UpdateOrder = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()

    const { order, error, loading } = useSelector((state) => state.orderDetails)
    const { error: processError, isUpdated } = useSelector((state) => state.order) 
    const updateOrderSubmitHandler = (e) => { 
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("status", status)
        dispatch(updateOrder(params.id, myForm))
    }

    const [status, setStatus] = useState("")

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(processError){
            alert.error(processError)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Processed Completed")
            dispatch({type: UPDATE_ORDER_RESET})
        }
        dispatch(getOrderDetails(params.id))
    }, [dispatch, alert, error, params.id, processError, isUpdated])
    return (
        <Fragment>
            <MetaData title="Process Order" />
            {loading ? <Loader/> : <div className='dashboard'>
                <SideBar />
                <div className='newProductContainer'>
                    <div className='confirmOrderPage' style={{display: order.orderStatus==="Delivered"?"block":"grid"}}>
                        <div>
                            <div className='confirmShippingArea'>
                                <Typography>Shipping Info</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{order.shippingInfo &&
                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                    </div>
                                </div>
                                <Typography>Payment</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p
                                            className={
                                                order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "greenColor" : "redColor"
                                            }
                                        >
                                            {order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                ? "PAID" : "NOT PAID"}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Amount:</p>
                                        <span>{order.totalPrice && `₹${order.totalPrice}`}</span>
                                    </div>
                                </div>
                                <Typography>Order Status</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p
                                            className={order.orderStatus && order.orderStatus === 'Delivered'
                                                ? "greenColor" : "redColor"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='confirmCartItems'>
                                <Typography>Your Cart Items:</Typography>
                                <div className='confirmCartItemsContainer'>
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt='Product' />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} = {" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/* */}
                        <div style={{display: order.orderStatus==="Delivered"?"none":"block"}}>
                        <form
                        className='updateOrderForm'
                        encType='multipart/form-data'
                        onSubmit={updateOrderSubmitHandler}
                        >
                        <h1>Process Order</h1>
    
                        <div>
                            <AccountTree />
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Choose Status</option>
                                { order.orderStatus === "Processing" && (
                                    <option value="Shipped">Shipped</option>
                                ) }
                                {order.orderStatus === "Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                )}
                            </select>
                        </div>
                    
                        <Button
                            className='createProductBtn'
                            type='submit'
                            disable={loading ? true : false || status===""?true:false}
                        >
                            Process
                        </Button>
                    </form>
                        </div>
                    </div>
                </div>
            </div>}
        </Fragment>
    )
}

export default UpdateOrder
