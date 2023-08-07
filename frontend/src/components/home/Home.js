import React, { Fragment, useEffect } from 'react'
// import { CgMouse } from "react-icons/all"
import './Home.css'
import Product from './Product'
import MetaData from '../layouts/MetaData'
import {clearErrors, getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layouts/loader/Loader'
import { ArrowDownwardSharp } from '@mui/icons-material'

function Home() {
    const dispatch = useDispatch()
    const {loading,error,products} = useSelector((state)=>state.products)

    useEffect(() => {
        if(error){
            alert(error)
            clearErrors(error)
        }
        dispatch(getProduct())
    },[dispatch, error])

  return (
    <Fragment>
        {loading?<Loader/>:<>
        <MetaData title="Home -- Ecommerce"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button><ArrowDownwardSharp/></button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            {products && products.map(product => (
                <Product product={product}/>
            ))}        
        </div>
    </>}
    </Fragment>
  )
}

export default Home