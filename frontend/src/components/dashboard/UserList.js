import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, allUserDetails, deleteUser } from '../../actions/userAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layouts/MetaData'
import { Edit, Delete } from '@mui/icons-material'
import SideBar from './SideBar'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UserList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { error, users } = useSelector((state) => state.allUsers)
  const { error: deleteError, isDeleted  } = useSelector((state) => state.profile)

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
      alert.success("User Deleted Successfully")
      navigate('/admin/dashboard')
      dispatch({type: DELETE_USER_RESET})
    }
    dispatch(allUserDetails())
  }, [dispatch, alert, error, navigate, deleteError, isDeleted])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 250, flex: 0.6 },
    { field: "email", headerName: "Email", minWidth: 100, flex: 0.2 },
    { field: "role", headerName: "Role", minWidth: 200, flex: 0.4,
    cellClassName: (params) => {
      return params.getValue(params.id, "role") === "admin"
      ? "greenColor" : "redColor"
    } },
    {
      field: "actions",
      flex: 0.4, // Adjust the flex value to fit the "Actions" column
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
            <Edit />
          </Link>
          <Button onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))}>
            <Delete />
          </Button>
        </Fragment>
      ),
    },
  ];


  const rows = []

  users && users.forEach((item) => {
    rows.push({
      id: item._id,
      email: item.email,
      role: item.role,
      name: item.name
    })
  })
  return (
    <Fragment>
      <MetaData title="All Users - Admin" />
      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>ALL USERS</h1>
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

export default UserList
