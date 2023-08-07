import React, { Fragment, useEffect } from 'react'
import './ForgotPassword.css'
import { MailOutline } from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword} from '../../actions/userAction'
import Loader from '../layouts/loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {error, message, loading} = useSelector((state) => state.forgotPassword)
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
        if(message){
            alert.success(message)
        }
    }, [dispatch, error, alert, message])
  return (
      <Fragment>
        <MetaData title="Forgot Password"/>
        {loading?<Loader/>:<div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
            <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                <div className="forgotPasswordEmail">
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
                <input 
                    type='submit'
                    value="Send"
                    className='forgotPasswordBtn'
                />
                </form>
            </div>
        </div>}
    </Fragment>
  )
}

export default ForgotPassword
