import React, { Fragment, useEffect, useState } from 'react'
import './NewProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layouts/MetaData'
import { Face, MailOutline } from '@mui/icons-material'
import SideBar from './SideBar'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser, clearErrors, getUserDetails } from '../../actions/userAction'

const UpdateUser = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const params = useParams()

    const { error, user } = useSelector((state) => state.userDetails)
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.profile)

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState(user.role)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("User Updated Successfully")
            navigate('/admin/dashboard')
            dispatch({type: UPDATE_USER_RESET})
        }
        dispatch(getUserDetails(params.id))
    },[dispatch, alert, error, navigate, isUpdated, updateError, params.id])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("role", role)
        dispatch(updateUser(params.id, myForm))
    }

  return (
    <Fragment>
        <MetaData title="Create Product"/>
        <div className='dashboard'>
            <SideBar/>
            <div className='newProductContainer'>
                <form 
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={updateUserSubmitHandler}
                >
                    <h1>Update User</h1>
                    <div>
                        <Face/>
                        <input
                            type='text'
                            placeholder='User Name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MailOutline/>
                        <input
                            type='text'
                            placeholder='User Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Face/>
                        <input
                            type='text'
                            placeholder='User Role'
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <Button 
                        className='createProductBtn'
                        type='submit'
                        disable = {loading ? true : false}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateUser
