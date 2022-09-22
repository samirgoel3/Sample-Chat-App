import React, { Component } from 'react'
import { Grid, Avatar, LinearProgress, Typography } from '@mui/material';
import COLORS from '../../../constants/Colors';
import Session from '../../../storage/Session';



export default function CreateChatView({ element }) {
    return (
        <Grid container
            height={'100%'}
            backgroundColor={COLORS.PRIMARY_EXTRA_LIGHT}
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'} padding={1}>
            <Grid container direction={'row'} justifyContent={'center'} position={'relative'} >
                <Grid item>
                    <Avatar style={{ width: 100, height: 100, marginRight: 5, border: '3px solid #fff' }} src={Session.getUserData().image} />
                </Grid>
                <Grid item sx={{ marginLeft: -5 }}>
                    <Avatar style={{ width: 100, height: 100, marginRight: 5, border: '3px solid #fff' }} src={element.image} />
                </Grid>
            </Grid>
            <Grid item ><Typography sx={{ fontWeight: 700, fontSize: 13 }}>{Session.getUserData().username + " | " + element.username}</Typography></Grid>
            <Grid item ><Typography sx={{ fontWeight: 400, fontSize: 13 }}>creating One to One Chat</Typography></Grid>
            <LinearProgress sx={{ width: 100, margin: '10px 0px' }} />



        </Grid>
    )
}