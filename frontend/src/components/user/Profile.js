import React, { useEffect } from 'react'
import { Fragment } from 'react'
import MetaData from '../layouts/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/loader/Loader'
import './Profile.css'
import defaltImage from '../../Profile.png'
import { clearErrors } from '../../actions/userAction'

const Profile = () => {
    const { user, loading, isAuthenticated, error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
                if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, navigate, isAuthenticated, error])
    return (
        <Fragment>{loading ? <Loader /> : <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className="profileContainer">
                <div>
                <h1>MyProfile</h1>
                {user.avatar.url?<img src={user.avatar.url} alt={user.name}/>:<img src={defaltImage}  alt={user.name}/>}
                <Link to='/me/update'>Edit Profile</Link>
                </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined on</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
            </div>
            </div>
        </Fragment>}</Fragment>
    )
}

export default Profile