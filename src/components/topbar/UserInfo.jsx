import { Avatar, Grid, Typography, Popover, Button } from '@mui/material'
import React from 'react'
import COLORS from '../../constants/Colors'
import Session from '../../storage/Session';
import IndexedDB from '../../databse';

export default function UserInfo() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div >

            <Grid container sx={{ backgroundColor: COLORS.PRIMARY_DARK, borderRadius: 2, padding: '5px 10px' }} justifyContent={'center'} alignItems={'center'}>
                <Typography sx={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{Session.getUserData().username}</Typography>
                <Avatar
                    aria-describedby={id}
                    sx={{ width: 25, height: 25, marginLeft: 1 }}
                    src={Session.getUserData().image}
                    onClick={handleClick} />

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div style={{ padding: 10 }}>
                        <Grid container alignItems={'center'} direction={'column'}>
                            <Grid item direction={'column'}>
                                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}>

                                    <Grid item>
                                        <div style={{ padding: 10 }}>
                                            <Avatar sx={{ width: 90, height: 90 }} src={Session.getUserData().image} />
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <Grid container direction={'column'} alignItems={'flex-start'} >
                                            <Typography variant='h6' sx={{ textTransform: 'uppercase', color: '#333333', fontWeight: 700 }}>{Session.getUserData().username}</Typography>
                                            <Typography variant='subtitle2' color={'#333'}>{Session.getUserData().email}</Typography>
                                            <Typography sx={{ color: '#bbb', fontSize: 10 }}>User ID: {Session.getUserData()._id}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item sx={{ width: '100%' }}>
                                <Button variant='contained' sx={{ width: '100%' }} onClick={() => {
                                    Session.logout()
                                }}>LOGOUT</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Popover>

            </Grid>
        </div>
    )
}