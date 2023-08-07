import React, { Fragment, useEffect } from 'react'
import './UpdateProfile.css'
import {  Face,  MailOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  clearErrors, loadUser, updateProfile} from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import Loader from '../layouts/loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'

function UpdateProfile() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {error, isUpdated, loading} = useSelector((state) => state.profile)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState()
    const navigate = useNavigate()
    const alert = useAlert()

    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {
            const reader = new FileReader()
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }

    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
            setAvatar(user.avatar.url)
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
        if(isUpdated){
            alert.success("Profile updated successfully")
            dispatch(loadUser())
            navigate("/myaccount")
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [user, dispatch, error, alert, navigate, isUpdated])
  return (
      <Fragment>
        <MetaData title="Update Profile"/>
        {loading?<Loader/>:<div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className='updateProfileHeading'>Update Profile</h2>
            <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                    <Face/>
                    <input 
                        type='text'
                        placeholder='Enter Your Name'
                        required
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="updateProfileEmail">
                    <MailOutline/>
                    <input 
                        type='email'
                        placeholder='Enter Your Email'
                        required
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input 
                        type='file'
                        name='avatar'
                        accept='image/*'
                        onChange={updateProfileDataChange}
                    />
                </div>
                <input 
                    type='submit'
                    value="Update"
                    className='updateProfileBtn'
                    /* disabled = {loading ? true : false} */
                />
                </form>
            </div>
        </div>}
    </Fragment>
  )
}

export default UpdateProfile
