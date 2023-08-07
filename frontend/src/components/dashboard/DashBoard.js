import React, { Fragment, useEffect } from 'react'
// import Loader from '../layouts/loader/Loader'
import SideBar from './SideBar.js'
import './DashBoard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { allOrders } from '../../actions/orderAction.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAllProductForAdmin } from '../../actions/productAction.js'
import { useAlert } from 'react-alert'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  )

const DashBoard = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, products } = useSelector((state) => state.products)
    const { orders } = useSelector((state) => state.orders)
    const { users } = useSelector((state) => state.allUsers)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getAllProductForAdmin())
        dispatch(allOrders())
    }, [dispatch,error,alert])

    let outOfStock = 0

    products && products.forEach((item) => {
        if(item.stock === 0){
            outOfStock += 1
        }
    })


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 4000]
            }
        ]
    };

    const doughnutState = products && {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014f"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }
  return (
    <Fragment>
    { products &&
        (<div className='dashboard'>
        <SideBar/>
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>
            <div className='dashboardSummary'>
                <div>
                <p>
                    Total Amount <br/> ₹200
                </p>
            </div>
            <div className='dashboardSummaryBox2'>
                <Link to='/admin/products'>
                    <p>Product</p>
                    <p>{products && products.length}</p>
                </Link>
                <Link to='/admin/orders'>
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                </Link>
                <Link to='/admin/users'>
                    <p>Users</p>
                    <p>{users && users.length}</p>
                </Link>
            </div>
        </div>
        <div className='lineChart'>
            <Line 
                data={lineState}
            />
        </div>
        <div className='doughnutChart'>
            <Doughnut 
                data={doughnutState}
            />
        </div>
    </div>
    </div>)
 }
 </Fragment>
  )
}

export default DashBoard
