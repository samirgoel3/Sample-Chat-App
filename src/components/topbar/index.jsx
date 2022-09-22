import { Button, Grid } from '@mui/material';
import React from 'react';
import MobileRightSideDrawer from '../../pages/main/chat-window/main-chat-view/chat-box/MobileRightSideDrawer';
import AppLogo from './AppLogo';
import ConceptsUsedInSite from './ConceptsUsedInSite';
import MobileSideDrawerLeft from './MobileLeftSideDrawer';
import MyInfo from './MyInfo';
import './topbar.css';
import UserInfo from './UserInfo';
import { dispatch as busDispatch } from 'use-bus'
import ICONS from '../../constants/Icons';
import { useSelector } from 'react-redux';


const TopBar = ({ children }) => {

  const stateData = useSelector(state => state)

  const getConnectionColor = ()=>{
    return stateData.connectiondata.socket_connection ? "green":"red";
  }


  return (

    <Grid container direction={'column'} >

      {/* Top Bar */}
      <Grid container className='root-top-bar'>
        <Grid item display={{ xl: 'none', lg: 'none', md: 'none', sm: 'block', xs: 'block' }}>
          <MobileSideDrawerLeft />
        </Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'block', xs: 'block' }}><AppLogo /></Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}><MyInfo /></Grid>
        <Grid item display={{ xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none' }}> <ConceptsUsedInSite /></Grid>

        <div style={{ display: 'flex', flex: 1 }} />

         <ICONS.SOCKETIO size={20} color={getConnectionColor()} style={{margin:'0px 10px', backgroundColor:'white', borderRadius:'50%', padding:1}} /> 

        <div style={{ paddingRight: 12 }}> <UserInfo /> </div>
        <Grid display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }} sx={{ marginInline: 1 }}>
          {window.innerHeight < 900 ? <MobileRightSideDrawer /> : null}
        </Grid>

      </Grid>


      {/* Main Content Area */}
      <Grid flex={1} >
        {children}
      </Grid>



    </Grid>

  );
};

export default TopBar;