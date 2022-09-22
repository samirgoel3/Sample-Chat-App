import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function () {
    return (
        <div>
            <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} paddingLeft={1} width={'100%'} height={'100%'}>
                <Grid item >
                    <Typography sx={{ fontSize:15, color:'white', fontWeight:700, textTransform:'uppercase'}}>Chat App Sample</Typography>
                </Grid>

            </Grid>
        </div>
    )
}