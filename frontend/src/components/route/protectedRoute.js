import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {  Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import  Loader  from '../layouts/loader/Loader'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation()
  const params = useParams()
  
  if (isAuthenticated === false && location.pathname!=='/password/forgot' && !location.pathname.startsWith('/password/reset')) {
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
