import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {  Navigate, Route, Routes } from 'react-router-dom';
import  Loader  from '../layouts/loader/Loader'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  
  if (isAuthenticated === false) {
    return <Navigate to='/login'/>
  }

  return (
    <Fragment>
    {loading ? <Loader/> : 
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>}
    </Fragment>
  );
};

export default ProtectedRoute;
