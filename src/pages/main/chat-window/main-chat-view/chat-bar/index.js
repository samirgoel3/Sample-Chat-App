import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import COLORS from '../../../../../constants/Colors';
import ICONS from '../../../../../constants/Icons';
import ChatUtils from '../../../../../utils/ChatUtils';




export default function ChatBar({chatData}) {

    

    return (
        <Grid
            container
            sx={{ width: '100%', height: 50, backgroundColor: COLORS.PRIMARY_DARK, paddingInline: 2 }}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}>
            <Avatar style={{ width: 42, height: 42, backgroundColor:'#bbb' }} src={ChatUtils.getOtherUserimage(chatData.groupadmin)} />
            <Grid container flexDirection={'column'} flex={1} sx={{ paddingInline: 2 }}>
                <Typography sx={{ color: 'white', fontSize: 15, fontWeight: 700 }}>{chatData.chatname}</Typography>
                <Typography sx={{ color: 'white', fontSize: 10, fontWeight: 400 }}>{chatData.chat_id}</Typography>
            </Grid>
            <ICONS.OPEN_EYE_ICON style={{ width: 20, height: 20, color: 'white' }} />
        </Grid>
    )
}