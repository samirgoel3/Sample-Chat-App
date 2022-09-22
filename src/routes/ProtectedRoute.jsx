import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import ROUTESNAMES from '../constants/RoutesName';
import TopBar from '../components/topbar';
import Session from '../storage/Session';



const ProtectedRoute = ({ ...rest}) => {
    if (Session.getUserData() == null) {
      return <Navigate to={ROUTESNAMES.LOGIN} />;
    }
    return  <TopBar><Outlet {...rest}/></TopBar>;
  };
  
  export default ProtectedRoute;
  