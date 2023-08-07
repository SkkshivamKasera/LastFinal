import React, { Fragment, useRef, useEffect } from 'react'
import './LoginSignUp.css'
import Loader from '../layouts/loader/Loader'
import {Face, LockOpen, MailOutline } from '@mui/icons-material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register} from '../../actions/userAction'
import Profile from '../../Profile.png'
import { useAlert } from 'react-alert'

const LoginSignUp = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const location = useLocation()
    const {error, loading, isAuthenticated} = useSelector(state => state.user)
    const navigate = useNavigate()


    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTabs = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user
    const [avatar, setAvatar] = useState(Profile)
    const [avatarPreview, setAvatarPreview] = useState(Profile)

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
        alert.success("Login Successfull")
    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.append('avatar', avatar);
        try {
          dispatch(register(myForm));
          alert.success("SignUp Successfull")
        } catch (error) {
          console.log('Registration Error:', error);
        }
      };

      const registerDataChange = (e) => {
        console.log('Event:', e.target.name, e.target.value);
      
        if (e.target.name === 'avatar') {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              console.log('Avatar Data URL:', reader.result);
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
          console.log('Updated User:', user);
        }
      };
    
    const redirect = location.search ? location.search.split("=")[1] : '/myaccount'
    
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors(error))
        }
        if(isAuthenticated){
            navigate(redirect)
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect])
    

    const switchTabs = (e, tab) => {
        if(tab === "login"){
            switcherTabs.current.classList.add("shiftToNeutral")
            switcherTabs.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab === "register"){
            switcherTabs.current.classList.add("shiftToRight")
            switcherTabs.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

  return (
    <Fragment>
        {loading? <Loader/> : <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signup_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                        <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                    </div>
                    <button ref={switcherTabs}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutline/>
                        <input type="email" placeholder='Enter Your Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="loginPassword">
                        <LockOpen/>
                        <input type="password" placeholder='Enter Your Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <Link to="/password/forgot">Forgot Password ?</Link>
                    <input type="submit" value="Login" className='loginBtn'/>
                </form>
                <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                <div className="signUpName">
                    <Face/>
                    <input 
                        type='text'
                        placeholder='Enter Your Name'
                        required
                        name='name'
                        value={name}
                        onChange={registerDataChange}
                    />
                </div>
                <div className="signUpEmail">
                    <MailOutline/>
                    <input 
                        type='email'
                        placeholder='Enter Your Email'
                        required
                        name='email'
                        value={email}
                        onChange={registerDataChange}
                    />
                </div>
                <div className="signUpPassword">
                    <LockOpen/>
                    <input 
                        type='password'
                        placeholder='Enter Your Password'
                        required
                        name='password'
                        value={password}
                        onChange={registerDataChange}
                    />
                </div>
                <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input 
                        type='file'
                        name='avatar'
                        accept='image/*'
                        onChange={registerDataChange}
                    />
                </div>
                <input 
                    type='submit'
                    value="Register"
                    className='signUpBtn'
                />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default LoginSignUp