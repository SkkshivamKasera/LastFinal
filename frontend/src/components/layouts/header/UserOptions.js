import React from 'react'
import { Fragment } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction, makeStyles } from '@mui/material'
import { useState } from 'react'
import { Dashboard, Person, ExitToApp, ListAlt, Home } from '@mui/icons-material'
import {Backdrop} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, clearErrors } from '../../../actions/userAction'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { ShoppingCart } from '@mui/icons-material'

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { isAuthenticated } = useSelector((state) => state.user)

    const {error} = useSelector(state=>state.user)
    const {cartItems} = useSelector(state=>state.cart)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
    },[dispatch, error, alert])

    const options = [
        { icon: <Home/>, name: "Home", func: home},
        { icon: <ListAlt/>, name: "Orders", func: orders },
        { icon: <Person/>, name: "Profile", func: account },
        { icon: <ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, func: cart},
        { icon: <ExitToApp/>, name: "Logout", func: logoutUser },
    ]

    function dashboard(){
        navigate('/admin/dashboard')
    }

    function home(){
        navigate('/')
    }

    function orders(){
        navigate('/orders')
    }

    function account(){
        navigate('/myaccount')
    }

    function cart(){
        navigate('/Cart')
    }

    function logoutUser(e){
        dispatch(logout())
        if(!isAuthenticated){
            navigate('/login')
        }
        alert.success("Logout Successfull")
    }

    if(user.role === "admin"){
        options.unshift({ icon: <Dashboard/>, name: "Dashbord", func: dashboard })
    }

    return (
        <Fragment>
            <Backdrop open={open}/>
            <SpeedDial
                ariaLabel='Navigation speed dial'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speedDial'
                icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : '/profile.png'} alt='Profile' />}
            >
            {options.map((item) => (
                <SpeedDialAction icon={item.icon} tooltipTitle={item.name} tooltipOpen onClick={item.func}/>
            ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions