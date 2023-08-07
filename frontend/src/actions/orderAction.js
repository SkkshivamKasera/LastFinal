import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDERS_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL
} from '../constants/orderConstants'
import axios from 'axios'


export const createOrder = (order) => async (dispatch) => {
    try{
        dispatch({type: CREATE_ORDER_REQUEST})

        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        }
        const { data } = await axios.post('https://e-commerce-d4u4.onrender.com/api/v1/orders/new', order, config)
        if(data && data.order){
            dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
        }else{
            dispatch({type: CREATE_ORDER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try{
        dispatch({type: MY_ORDERS_REQUEST})
        const { data } = await axios.get('https://e-commerce-d4u4.onrender.com/api/v1/orders/me', {withCredentials: true})
        if(data && data.order){
            dispatch({type: MY_ORDERS_SUCCESS, payload: data.order})
        }else{
            dispatch({type: MY_ORDERS_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try{
        dispatch({type: ALL_ORDER_REQUEST})
        const { data } = await axios.get('https://e-commerce-d4u4.onrender.com/api/v1/admin/orders', {withCredentials: true})
        if(data && data.order){
            dispatch({type: ALL_ORDER_SUCCESS, payload: data.order})
        }else{
            dispatch({type: ALL_ORDER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: ORDERS_DETAILS_REQUEST})
        const { data } = await axios.get(`https://e-commerce-d4u4.onrender.com/api/v1/orders/${id}`, {withCredentials: true})
        console.log(data)
        if(data && data.success){
            dispatch({type: ORDERS_DETAILS_SUCCESS, payload: data.order})
        }else{
            dispatch({type: ORDERS_DETAILS_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: ORDERS_DETAILS_FAIL,
            payload: error.message
        })
    }
}

export const updateOrder = (id, order) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_ORDER_REQUEST})

        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
            withCredentials: true
        }
        const { data } = await axios.put(`https://e-commerce-d4u4.onrender.com/api/v1/admin/orders/${id}`, order, config)
        if(data && data.success){
            dispatch({type: UPDATE_ORDER_SUCCESS, payload: data.success})
        }else{
            dispatch({type: UPDATE_ORDER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try{
        dispatch({type: DELETE_ORDER_REQUEST})

        const config = {
            withCredentials: true
        }
        const { data } = await axios.delete(`https://e-commerce-d4u4.onrender.com/api/v1/admin/orders/${id}`, config)
        if(data && data.success){
            dispatch({type: DELETE_ORDER_SUCCESS, payload: data.success})
        }else{
            dispatch({type: DELETE_ORDER_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}