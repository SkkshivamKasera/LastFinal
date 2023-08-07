import React, { Fragment, useEffect } from 'react'
import './MyOrders.css'
import { Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/orderAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loader from '../layouts/loader/Loader'
import MetaData from '../layouts/MetaData'
import { Launch } from '@mui/icons-material'
import { DataGrid } from '@material-ui/data-grid'

const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, orders } = useSelector((state) => state.myOrders)
    const { user } = useSelector((state) => state.user)

    const columns = [
        { field: "id", headerName: "Order Id", minWidth: 300, flex: 1},
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.6
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.9
        },
        {
            field: "actions",
            flex: 0.6,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return(
                    <Link to={`/order/${params.getValue(params.id, "id")}`}><Launch/></Link>
                )
            }
        }
    ]
    const rows = []

    orders && orders.forEach((order, index) => {
        const totalQuantity = order.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0);
        rows.push({
            itemQty: totalQuantity,
            id: order._id,
            status: order.orderStatus,
            amount: order.totalPrice,
        });
    });
    

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        dispatch(myOrders());
      }, [dispatch, error, alert]);
      
  return (
    <Fragment>
        <MetaData title={`${user.name} - Orders`}/>
        { loading ? <Loader/> : (
            <div className='myOrdersPage'>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
        )}
    </Fragment>
  )
}

export default MyOrders
