import { Avatar, Chip, Grid, Typography } from '@mui/material'
import React from 'react'

export default function () {
    return (
        <div>
            <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} paddingLeft={1} width={'100%'} height={'100%'}>
                <Grid item>
                    <Chip
                        avatar={<Avatar alt="Natacha" src='https://d22y893cekuu8h.cloudfront.net/s_eaf98ae5e893-2018-07-25-13-25-14-000203.jpg' />}
                        label="Create By Samir Goel"
                        variant="outlined"
                        sx={{ marginLeft: 1, color: 'white' }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}