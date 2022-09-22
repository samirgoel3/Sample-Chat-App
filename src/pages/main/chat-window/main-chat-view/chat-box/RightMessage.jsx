import { Avatar, Grid, IconButton, Popover, Typography } from '@mui/material';
import React from 'react';
import COLORS from '../../../../../constants/Colors';
import ICONS from '../../../../../constants/Icons';






export default function RightChatBox({ data }) {

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
        <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignSelf:'flex-end' }}>

            <div style={{ marginRight: 10 }}>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333', textAlign: 'end' }}>{data.sender.username}</Typography>
                <Typography sx={{ backgroundColor: COLORS.TEAL_200, padding: 1, fontSize: 12, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 3 }}>
                    {data.content.message}


                    <Grid container alignItems={'center'} sx={{ marginTop: 1 }} justifyContent={'center'}>
                        <Grid item flex={1}>
                            <IconButton aria-describedby={id} onClick={handleClick} >
                                <ICONS.OPEN_EYE_ICON style={{ width: 13, height: 13 }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: 8, fontWeight: 700, color: COLORS.PRIMARY_DARK, paddingLeft: 1 }} textAlign={'right'}>{data.createdAt}</Typography>
                        </Grid>
                    </Grid>

                </Typography>
            </div>
            <Avatar style={{ width: 30, height: 30 }} src={data.sender.image} />


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
                <div style={{ padding: 4 }}>
                    <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#333', marginBottom: 1 }}>Read By</Typography>
                    {
                        data.readby.map((e, i) => {
                            return <Grid container direction={'row'} sx={{ marginBottom: 1 }}>
                                <Grid item> <Avatar src={e.image} sx={{ width: 15, height: 15, marginRight: 1 }} /> </Grid>
                                <Grid item> <Typography sx={{ fontSize: 9 }}>{e.username}</Typography> </Grid>
                            </Grid>
                        })
                    }
                </div>
            </Popover>

        </div>
    )
}