import React, { useEffect, useState } from 'react'
import './Products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layouts/loader/Loader'
import Product from '../home/Product'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Slider, Typography } from '@mui/material'
import MetaData from '../layouts/MetaData'
import { NavigateBefore, NavigateNext } from '@mui/icons-material'

const categories = [
    "Laptop",
    "Camera",
    "SmartPhones",
    "Attire",
    "Tops",
    "Bottom",
    "Footwear"
]

const Products = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 5000000000000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const params = useParams()
    const keyword = params.keyword

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const {products, loading, productsCount, resultPerPage, error, filteredProductsCount} = useSelector(state=>state.products)

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if(error){
            alert(error)
            dispatch(clearErrors(error))
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    },[dispatch, keyword, currentPage, price, category, ratings, error])

    return (
        <Fragment>
            <MetaData title="Products -- Ecommerce"/>
            {loading?<Loader/>:
            <Fragment>
                <h2 className="productHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => (
                        <Product key={product._id} product={product}/>
                    ))}
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                    />
                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li 
                                className='category-link'
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                            {category}
                            </li>
                        ))}
                    </ul>
                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                         value={ratings}
                         valueLabelDisplay='auto'
                         onChange={(e, newRating) => {
                            setRatings(newRating)
                         }}
                         aria-labelledby='continuous-slider'
                         min={0}
                         max={5}
                        />
                    </fieldset>
                </div>
                {resultPerPage < productsCount && <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText = {<NavigateNext/>}
                        prevPageText = {<NavigateBefore/>}
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Products