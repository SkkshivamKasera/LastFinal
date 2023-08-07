import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS, 
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS, 
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from '../constants/productConstants'


export const getProduct = (keyword="", currentPage=1, price=[0, 10000000], category, ratings=0) => async (dispatch) => {
    let link1 = `http://localhost:10000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
  if (category) {
    link1 = `http://localhost:10000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
  }
    try{
    dispatch({type: ALL_PRODUCT_REQUEST})
        const {data} = await axios.get(link1, {withCredentials: true})

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.message
        })
    }
}

export const getAllProductForAdmin = () => async(dispatch) => {
    try{
        dispatch({type: ADMIN_PRODUCT_REQUEST})
        const { data } = await axios.get("http://localhost:10000/api/v1/admin/products", {withCredentials: true})
        if(data && data.products){
            dispatch({type: ADMIN_PRODUCT_SUCCESS, payload: data.products})
        }else{
            dispatch({type: ADMIN_PRODUCT_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: ADMIN_PRODUCT_FAIL, payload: error.message})
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try{
        let link2 = `http://localhost:10000/api/v1/product/${id}`
    dispatch({type: PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get(link2, {withCredentials : true})
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try{
        dispatch({type: NEW_REVIEW_REQUEST})
        const config = {
            headers: {"Content-Type" : "application/json"}, withCredentials: true
        }
        const { data } = await axios.put('http://localhost:10000/api/v1/review', reviewData, config)

        if(data && data.success){
            dispatch({type: NEW_REVIEW_SUCCESS, payload: data.success})
        }
        else{
            dispatch({type: NEW_REVIEW_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: NEW_REVIEW_FAIL, payload: error.message})
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try{
        dispatch({type: NEW_PRODUCT_REQUEST})
        const config = {
            headers: {"Content-Type" : "multipart/form-data"}, withCredentials: true
        }
        const { data } = await axios.post('http://localhost:10000/api/v1/admin/products/new', productData, config)

        if(data && data.product){
            dispatch({type: NEW_PRODUCT_SUCCESS, payload: data})
        }
        else{
            dispatch({type: NEW_PRODUCT_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: NEW_PRODUCT_FAIL, payload: error.message})
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try{
        dispatch({type: DELETE_PRODUCT_REQUEST})
        const config = {
            withCredentials: true
        }
        const { data } = await axios.delete(`http://localhost:10000/api/v1/admin/products/${id}`, config)

        if(data && data.success){
            dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data.success})
        }
        else{
            dispatch({type: DELETE_PRODUCT_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: DELETE_PRODUCT_FAIL, payload: error.message})
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_PRODUCT_REQUEST})
        const config = {
            headers: {"Content-Type" : "multipart/form-data"}, withCredentials: true
        }
        const { data } = await axios.put(`http://localhost:10000/api/v1/admin/products/${id}`, productData, config)

        if(data && data.success){
            dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data.success})
        }
        else{
            dispatch({type: UPDATE_PRODUCT_FAIL, payload: data.message})
        }
    }catch(error){
        dispatch({type: UPDATE_PRODUCT_FAIL, payload: error.message})
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}