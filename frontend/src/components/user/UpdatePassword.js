import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  clearErrors, updatePassword} from '../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from '../layouts/loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'
import './UpdatePassword.css'
import { Lock, LockOpen, VpnKey } from '@mui/icons-material'

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const {error, isUpdated, loading} = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPasswoed] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)
        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
        if(isUpdated){
            alert.success("Password updated successfully")
            navigate("/")
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated])
  return (
    <div>
      <Fragment>
        <MetaData title="Update Profile"/>
        {loading?<Loader/>:<div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                <h2 className='updatePasswordHeading'>Change Password</h2>
            <form className="updatePasswordForm" encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                    <div className="updatePassword">
                        <VpnKey/>
                        <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="updatePassword">
                        <LockOpen/>
                        <input type="password" placeholder='New Password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="updatePassword">
                        <Lock/>
                        <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPasswoed(e.target.value)} />
                    </div>
                <input 
                    type='submit'
                    value="Change"
                    className='updatePasswordBtn'
                />
                </form>
            </div>
        </div>}
    </Fragment>
    </div>
  )
}

export default UpdatePassword
