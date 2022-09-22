import { Box, Grid } from '@mui/material';
import React from 'react';
import ICONS from '../../constants/Icons';
import HoverDescriptionIcon from './HoverDescriptionIcon';
import './tech-description.css';

const tech_icons = [
    { icon: ICONS.APPLE, description: 'IOS App build on React native' },
    { icon: ICONS.NODE, description: 'Node for Back end' },
    { icon: ICONS.MONGO_DB, description: 'Mongo Db for storage' },
    { icon: ICONS.SOCKETIO, description: 'Socket.io for realtime chat (including group chat)' },
    { icon: ICONS.POSTMAN, description: 'Postman for documentin api used in project' },
    { icon: ICONS.MATERIAL_UI, description: 'Material UI for providing advance feature in web site' },
    { icon: ICONS.ANDROID, description: 'Android App build on React native' },
    { icon: ICONS.APPLE, description: 'IOS App build on React native' },
];


export default function TechDescriptionView() {


    return (
        <div className='box'>
            <p className='heading'>CHAT APP SAMPLE</p>
            <p className='sub-heading' >Author : Samir Goel</p>
            <Box display={'block'} sx={{ textAlign: 'end' }}>
                <ICONS.GMAIL size={20} color={'white'} />
                <ICONS.LINKED_IN size={20} color={'white'} style={{ marginInline: 10 }} />
                <ICONS.GITHUB size={20} color={'white'} />
            </Box>
            <hr />
            <p className='description'>A Full MERN stack Sample Chating Application with open source code include react native app.</p>
            <Grid container justifyContent='space-between' marginTop={1}>
                {tech_icons.map((e, i) => <HoverDescriptionIcon data={tech_icons[i]} />)}
            </Grid>
        </div>
    )
}