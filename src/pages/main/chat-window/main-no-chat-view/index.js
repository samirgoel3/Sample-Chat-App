import { Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../../../constants/Colors'
import ICONS from '../../../../constants/Icons'
import NoChatIcon from '../../../../images/no_chat.png';


export default function MainNoChatView (){
    return (
        <Grid
            container
            direction={'column'}
            width={'100%'}
            height={'100%'}
            sx={{ backgroundColor: COLORS.TEAL_600 }} justifyContent={'center'} alignItems={'center'}>
            <img src={NoChatIcon} style={{ width: 220, marginBottom: 5 }} />
            <Typography style={{ fontSize: 23, color: 'white', fontWeight: 700 }}>SAMPLE CHAT APP</Typography>
            <Typography style={{ fontSize: 11, maxWidth: 350, color: 'white', fontWeight: 400, textAlign: 'center', margin: '5px 19px' }}>An open source chat application created using MERN stack for website and REACT NATIVE for android and ios application.</Typography>
            <Typography style={{ fontSize: 12, color: 'white', fontWeight: 600 }}>Author: Samir Goel | samirgoel3@gmail.com</Typography>
            <hr style={{ width: 300 }} />
            <div style={{ display: 'flex', width: 300, justifyContent: 'space-around', alignItems: 'center' }}>
                <ICONS.NODE size={15} color={'white'} />
                <ICONS.GITHUB size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.MONGO_DB size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.REACT size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.SOCKETIO size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.POSTMAN size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.ANDROID size={15} color={'white'} style={{ marginLeft: 5 }} />
                <ICONS.APPLE size={15} color={'white'} style={{ marginLeft: 5 }} />
            </div>
        </Grid>
    )
}