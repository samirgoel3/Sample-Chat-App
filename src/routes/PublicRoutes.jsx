import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import ROUTESNAMES from '../constants/RoutesName';
import Session from '../storage/Session';




const PublicRoutes = () => {
    if (Session.getUserData() != null) {
      return <Navigate to={ROUTESNAMES.LOADING} />;
    }else{
      return <Outlet />;
    }
  
    
  };
  
  export default PublicRoutes;
  