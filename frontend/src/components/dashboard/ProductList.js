import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getAllProductForAdmin, deleteProduct } from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layouts/MetaData'
import { Edit, Delete } from '@mui/icons-material'
import SideBar from './SideBar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { error, products } = useSelector((state) => state.products)
  const { error: deleteError, isDeleted  } = useSelector((state) => state.product)

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
      alert.success("Product Deleted Successfully")
      navigate('/admin/dashboard')
      dispatch({type: DELETE_PRODUCT_RESET})
    }
    dispatch(getAllProductForAdmin())
  }, [dispatch, alert, error, navigate, deleteError, isDeleted])

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 0.6 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.2 },
    { field: "price", headerName: "Price", type: "number", minWidth: 200, flex: 0.4 },
    {
      field: "actions",
      flex: 0.4, // Adjust the flex value to fit the "Actions" column
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
            <Edit />
          </Link>
          <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
            <Delete />
          </Button>
        </Fragment>
      ),
    },
  ];


  const rows = []

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name
    })
  })
  return (
    <Fragment>
      <MetaData title="All Products - Admin" />
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

export default ProductList
