import React, { Fragment, useEffect, useState } from 'react'
import './NewProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layouts/MetaData'
import { AccountTree, Storage, Spellcheck, AttachMoney, Description } from '@mui/icons-material'
import SideBar from './SideBar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const params = useParams()

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product)
    const { error, product } = useSelector((state) => state.productDetails)
    const productId = params.id
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        "Laptop",
        "Camera",
        "SmartPhones",
        "Attire",
        "Tops",
        "Bottom",
        "Footwear"
    ]

    useEffect(() => {
        console.log(isUpdated)
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name)
            setDesc(product.desc)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully")
            navigate('/admin/dashboard')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, productId, product, params])

    const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("desc", desc)
        myForm.set("category", category)
        myForm.set("stock", stock)
        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(updateProduct(productId, myForm))
    }

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className='dashboard'>
                <SideBar />
                <div className='newProductContainer'>
                    <form
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type='text'
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type='text'
                                placeholder='Product Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                placeholder='Product desc'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                cols="30"
                                rows="1"
                            />
                        </div>
                        <div>
                            <AccountTree />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input
                                type='number'
                                placeholder='Stock'
                                value={stock}
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id='createProductFormFile'>
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={createProductImageChange}
                                multiple
                            />
                        </div>
                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt='Product Preview' />
                            ))}
                        </div>
                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Preview' />
                            ))}
                        </div>
                        <Button
                            className='createProductBtn'
                            type='submit'
                            disable={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct
