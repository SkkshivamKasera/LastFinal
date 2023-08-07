import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST})
        const config = {headers: {"Content-Type":"application/json"}, withCredentials: true}
        const {data} = await axios.post(
            'https://e-commerce-d4u4.onrender.com/api/v1/login',
            {email, password},
            config
        )
        localStorage.setItem("token", data.token)
        if(data && data.user){
          dispatch({type: LOGIN_SUCCESS, payload: data.user})
       }else{
          dispatch({type: LOGIN_FAIL, payload: data.message})
       }
    }catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.message})
    }
} 

export const register = (myForm) => async (dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})
        const config = {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true}
        const { data } = await axios.post('https://e-commerce-d4u4.onrender.com/api/v1/signup', myForm, config)
        if(data && data.user)
        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user})
        else
        dispatch({type: REGISTER_USER_FAIL, payload: data.message})
    }catch(error){
        dispatch({type: REGISTER_USER_FAIL, payload: error.message})
    }
} 

export const loadUser = () => async (dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})
        const {data} = await axios.get('https://e-commerce-d4u4.onrender.com/api/v1/me', {withCredentials: true})
        if(data && data.user){
           dispatch({type: LOAD_USER_SUCCESS, payload: data.user})
        }else{
            dispatch({type: LOAD_USER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: LOAD_USER_FAIL, payload: error.message})
    }
}

export const allUserDetails = () => async (dispatch) => {
    try{
        dispatch({type: ALL_USER_REQUEST})
        const {data} = await axios.get('https://e-commerce-d4u4.onrender.com/api/v1/admin/users', {withCredentials: true})
        if(data && data.users){
           dispatch({type: ALL_USER_SUCCESS, payload: data.users})
        }else{
            dispatch({type: ALL_USER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: ALL_USER_FAIL, payload: error.message})
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: USER_DETAILS_REQUEST})
        const {data} = await axios.get(`https://e-commerce-d4u4.onrender.com/api/v1/admin/user/${id}`, {withCredentials: true})
        if(data && data.user){
           dispatch({type: USER_DETAILS_SUCCESS, payload: data.user})
        }else{
            dispatch({type: USER_DETAILS_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: USER_DETAILS_FAIL, payload: error.message})
    }
}

export const logout = () => async (dispatch) => {
    try{
        await axios.get("https://e-commerce-d4u4.onrender.com/api/v1/logout", { withCredentials: true})
        dispatch({type: LOGOUT_SUCCESS})
    }catch(error){
        dispatch({type: LOGOUT_FAIL, payload: error.message})
    }
}

export const updateProfile = (userData) => async (dispatch) => {
  try {
    console.log(userData)
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
    const { data } = await axios.put('https://e-commerce-d4u4.onrender.com/api/v1/me/update', userData, config);
    if(data.success)
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    else
    dispatch({type: UPDATE_PROFILE_FAIL, payload: data.message})
  } catch (error) {
        dispatch({
          type: UPDATE_PROFILE_FAIL,
          payload: error.message,
        });
      }
    }

  
export const updatePassword = (passwords) => async (dispatch) => {
  try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const { data } = await axios.put('https://e-commerce-d4u4.onrender.com/api/v1/password/update', passwords, config);
      if(data.success)
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
      else
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: data.message });
}catch (error) {
  dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.message,
    });
  }
}

export const forgotPassword = (email) => async (dispatch) => {
    try{
        dispatch({type: FORGOT_PASSWORD_REQUEST})
        const config = {headers: {"Content-Type":"application/json"}, withCredentials: true}
        const {data} = await axios.post(
            'https://e-commerce-d4u4.onrender.com/api/v1/password/forgot',
            email,
            config
        )
        if(data && data.message){
          dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message})
       }else{
          dispatch({type: FORGOT_PASSWORD_FAIL, payload: data.message})
       }
    }catch(error){
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.message})
    }
} 

export const resetPassword = (token, passwords) => async (dispatch) => {
    try{
        console.log(token)
        dispatch({type: RESET_PASSWORD_REQUEST})
        const config = {headers: {"Content-Type":"application/json"}, withCredentials: true}
        const {data} = await axios.put(
            `https://e-commerce-d4u4.onrender.com/api/v1/password/reset/${token}`,
            passwords,
            config
        )
        if(data.success){
          dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success})
       }else{
          dispatch({type: RESET_PASSWORD_FAIL, payload: data.message})
       }
    }catch(error){
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.message})
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(`https://e-commerce-d4u4.onrender.com/api/v1/admin/user/${id}`, userData, config);
        if(data.success)
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        else
        dispatch({ type: UPDATE_USER_FAIL, payload: data.message });
  }catch (error) {
    dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.message,
      });
    }
  }

  export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const config = { withCredentials: true };
        const { data } = await axios.delete(`https://e-commerce-d4u4.onrender.com/api/v1/admin/user/${id}`, config);
        if(data.success)
        dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
        else
        dispatch({ type: DELETE_USER_FAIL, payload: data.message });
  }catch (error) {
    dispatch({
        type: DELETE_USER_FAIL,
        payload: error.message,
      });
    }
  }

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}