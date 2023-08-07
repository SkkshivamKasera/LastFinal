import './App.css';
import {React, useCallback, useEffect, useState} from 'react'
import Header from './components/layouts/header/Header'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import WebFont from 'webfontloader';
import Footer from './components/layouts/footer/Footer';
import Home from './components/home/Home'
import ProductDetails from './components/product/ProductDetails'
import Products from './components/product/Products.js'
import Search from './components/product/Search.js';
import LoginSignUp from './components/user/LoginSignUp';
import { loadUser } from './actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import UserOptions from './components/layouts/header/UserOptions.js'
import Profile from './components/user/Profile.js'
import UpdateProfile from './components/user/UpdateProfile.js'
import UpdatePassword from './components/user/UpdatePassword.js'
import ForgotPassword from './components/user/ForgotPassword.js'
import ResetPassword from './components/user/ResetPassword.js'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping.js'
import ConfirmOrder from './components/cart/ConfirmOrder.js'
import Payment from './components/cart/Payment.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess.js'
import MyOrders from './components/orders/MyOrders.js'
import OrderDetails from './components/orders/OrderDetails.js'
import { useAlert } from 'react-alert';
import DashBoard from './components/dashboard/DashBoard.js'
import ProtectedRoute from './components/route/protectedRoute';
import ProductList from './components/dashboard/ProductList.js'
import NewProduct from './components/dashboard/NewProduct';
import UpdateProduct from './components/dashboard/UpdateProduct.js'
import Orders from './components/dashboard/Orders.js'
import UpdateOrder from './components/dashboard/UpdateOrder.js'
import UserList from './components/dashboard/UserList.js'
import UpdateUser from './components/dashboard/UpdateUser.js'

function App() {

  const { isAuthenticated, user } = useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")
  const dispatch = useDispatch()
  const alert = useAlert()

  const getStripeApiKey = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      alert.error("Internal Server is Down Please Come Back Later.");
    }
  }, [alert]);
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    dispatch(loadUser())
    getStripeApiKey()
  },[dispatch, getStripeApiKey])

  return (
    <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes><Route path='/' element={<Home/>}/></Routes>
    <Routes><Route exact path='/product/:id' Component={ProductDetails}/></Routes>
    <Routes><Route exact path='/products' Component={Products}/></Routes>
    <Routes><Route path='/products/:keyword' Component={Products}/></Routes>
    <Routes><Route exact path='/Search' Component={Search}/></Routes>
    <Routes><Route exact path='/login' Component={LoginSignUp}/></Routes>
    <Routes><Route exact path='/password/forgot' Component={ForgotPassword}/></Routes>
    <Routes><Route exact path='/password/reset/:token' Component={ResetPassword}></Route></Routes>
    <Routes><Route exact path='/Cart' Component={Cart}></Route></Routes>
    <ProtectedRoute exact path='/myaccount' component={Profile}/>
    <ProtectedRoute exact path='/me/update' component={UpdateProfile}/>
    <ProtectedRoute exact path='/password/update' component={UpdatePassword}/>
    <ProtectedRoute exact path='/login/shipping' component={Shipping}/>
    {stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute exact path='/process/payment' component={Payment}/>
    </Elements>)}
    <ProtectedRoute exact path='/success' component={OrderSuccess}/>
    <ProtectedRoute exact path='/orders' component={MyOrders}/>
    
    <ProtectedRoute exact path='/orders/confirm' component={ConfirmOrder}/>
    <ProtectedRoute exact path='/order/:id' component={OrderDetails}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/dashboard' component={DashBoard}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/product' component={NewProduct}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={Orders}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/orders/:id' component={UpdateOrder}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/users' component={UserList}/>
    <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component={UpdateUser}/>
    <Footer/>
    </Router>
  );
}

export default App;
