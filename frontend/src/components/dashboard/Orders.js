import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, allOrders, deleteOrder } from '../../actions/orderAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layouts/MetaData'
import { Edit, Delete } from '@mui/icons-material'
import SideBar from './SideBar'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const Orders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { error, orders } = useSelector((state) => state.orders)
  const { error:deleteError, isDeleted } = useSelector((state) => state.order)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if(deleteError){
        alert.error(deleteError)
        dispatch(clearErrors())
    }
    if(isDeleted){
        alert.success("Order Deleted Successfully")
        navigate('/admin/dashboard')
        dispatch({type: DELETE_ORDER_RESET})
    }
    dispatch(allOrders())
  }, [dispatch, alert, error, navigate, isDeleted])

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

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
      flex: 0.4, // Adjust the flex value to fit the "Actions" column
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/orders/${params.getValue(params.id, "id")}`}>
            <Edit />
          </Link>
          <Button onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))}>
            <Delete />
          </Button>
        </Fragment>
      ),
    },
  ];


  const rows = []

  orders && orders.forEach((item) => {
    rows.push({
      id: item._id,
      itemQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus
    })
  })
  return (
    <Fragment>
      <MetaData title="All Orders - Admin" />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Orders
