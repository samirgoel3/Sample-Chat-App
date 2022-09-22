import { Avatar, Grid, Typography } from '@mui/material'
import React, { Component } from 'react'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../states/actions';
import DateAndTimeUtil from '../../utils/DateAndTimeUtil';
import Storage from '../../storage';
import _ from 'lodash'






export default function AllUserItem({element, position, onUserSelected = ()=>{}}){
    
    const stateData = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <Grid item sx={{ display: 'flex', padding:1, justifyContent: 'flex-start', alignItems: 'center', width: '100%', backgroundColor: position== stateData.recentChatData.selected_position?COLORS.PRIMARY_DARK:COLORS.PRIMARY_LIGHT }}
        direction={'row'} 
        onClick={()=>{onUserSelected(element)}}>
        <Avatar sx={{ width: 60, height: 60 }}  src={element.image}/>
        <Grid container direction={'column'} sx={{ marginLeft: 1 }} >
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{element.username}</Typography>
            <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 11 }}>{element.email}</Typography>
            <Typography sx={{ color: 'white', fontWeight: 400, fontSize: 9 }}>Joined on : {DateAndTimeUtil.convertMongoDbTimestampToDate(element.createdAt, 'D MMM, dddd')}</Typography>
        </Grid>
    </Grid>
    )
}