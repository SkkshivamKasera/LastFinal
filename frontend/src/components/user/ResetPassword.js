import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {  clearErrors, resetPassword} from '../../actions/userAction'
import Loader from '../layouts/loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'
import './UpdatePassword.css'
import { Lock, LockOpen } from '@mui/icons-material'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const params = useParams()
    const {error, success, loading} = useSelector((state) => state.forgotPassword)

    const [password, setpassword] = useState("")
    const [confirmPassword, setConfirmPasswoed] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)
        dispatch(resetPassword(params.token, myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
        if(success){
            alert.success("Successfull")
            navigate("/login")
        }
    }, [dispatch, error, alert, navigate, success])
  return (
    <div>
      <Fragment>
        <MetaData title="Update Profile"/>
        {loading?<Loader/>:<div className="updatePasswordContainer">
            <div className="updatePasswordBox">
                <h2 className='updatePasswordHeading'>Reset Password</h2>
            <form className="updatePasswordForm" encType="multipart/form-data" onSubmit={resetPasswordSubmit}>
                    <div className="updatePassword">
                        <LockOpen/>
                        <input type="password" placeholder='New Password' required value={password} onChange={(e) => setpassword(e.target.value)} />
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

export default ResetPassword
