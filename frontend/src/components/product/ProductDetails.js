import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard.js'
import Loader from '../layouts/loader/Loader'
import MetaData from '../layouts/MetaData'
import { addItemToCart } from '../../actions/cartAction'
import { useAlert } from 'react-alert'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-material-ui-carousel"

const ProductDetails = () => {

  const useStyles = makeStyles((theme) => ({
    submitDialogButton: {
      backgroundColor: 'transparent',
      color: 'black',
      border: '2px solid #57A0D2',
      borderRadius: '8px',
      padding: '0.4rem 0.6rem',
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',

      /* Hover styles */
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0, 123, 255, 0.2)', /* Add a box shadow */
        backgroundColor: '#57A0D2',
        color: 'white',
        transform: "translate(-2)"
      },

      /* Focus styles */
      '&:focus': {
        outline: 'none',
        boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
      },

      /* Disabled styles */
      '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
      },
    },
  }));

  const classes = useStyles();

  const dispatch = useDispatch()
  const params = useParams()
  const alert = useAlert()
  const { product, loading, error } = useSelector((state) => state.productDetails)
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { success, error: reviewError } = useSelector((state) => state.newReview)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors(error))
    }
    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success("Review Submitted Successfully")
      dispatch({ type: NEW_REVIEW_RESET })
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error, alert, reviewError, success])
  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  }

  const handleIncrement = () => {
    if (product.stock <= quantity) return
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(params.id, quantity))
    alert.success("Item Added To Cart")
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData()
    myForm.set("rating", rating)
    myForm.set("comment", comment)
    myForm.set("productId", params.id)

    dispatch(newReview(myForm))
    setOpen(false)
  }

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <MetaData title={`${product.name} -- Ecommerce`} />
        <div className='ProductDetails'>
          <div>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className='CarouselImage'
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>

          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className='detailsBlock-2-span'>({product.numberOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              {product.stock < 1 ? false : true && <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={handleDecrement}>-</button>
                  <input readOnly value={quantity} type="number" />
                  <button onClick={handleIncrement}>+</button>
                </div>{" "}
                <button onClick={addItemToCartHandler}>Add to cart</button>
              </div>}
              <p>
                Status: {" "}
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{product.desc}</p>
            </div>
            <button onClick={submitReviewToggle} className="submitReviews">Submit Review</button>
          </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby='simple-dialog-title'
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className='submitDialog'>
            <Rating onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="larger"
            />
            <textarea
              className='submitDialogTextArea'
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions className='submitDialogButton'>
            <Button className={classes.submitDialogButton} onClick={submitReviewToggle}>Cancle</Button>
            <Button className={classes.submitDialogButton} onClick={reviewSubmitHandler}>Submit</Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>}
    </Fragment>
  )
}

export default ProductDetails